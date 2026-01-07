# assistant.py
import os
import datetime
from typing import Annotated, TypedDict, List, Any, Literal
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

from utils import load_prompt
from tools import send_email, retrieve_portfolio_info, log_unanswered_question

load_dotenv()

class State(TypedDict):
    messages: Annotated[List[Any], add_messages]
    router_decision: dict
    search_context: str
    grade: Literal["good", "bad"]

class RouteQuery(BaseModel):
    step: Literal["search", "email", "chat"] = Field(
        description="The next step to take: 'search' for retrieving information about Michael, 'email' to contact Michael, or 'chat' for general conversation."
    )
    search_query: str = Field(default="", description="The search query if step is 'search'.")
    email_address: str = Field(default="", description="The user's email if step is 'email'.")
    email_body: str = Field(default="", description="The message content if step is 'email'.")
    
class Grade(BaseModel):
    score: Literal["good", "bad"] = Field(
        description="Must be 'good' if the context contains enough factual information to answer the question, or 'bad' otherwise."
    )
class PortfolioAssistant:
    def __init__(self, dev_mode: bool = False):
        self.dev_mode = dev_mode
        self.router_llm = self._create_model(temperature=0).with_structured_output(RouteQuery)
        self.grader_llm = self._create_model(temperature=0).with_structured_output(Grade)
        self.generator_llm = self._create_model(temperature=0.7)
        self.system_instruction = load_prompt("system_prompt.md")
        self.workflow = self._build_graph()
        
    def _create_model(self, temperature=0.7):
        if self.dev_mode:
            return ChatOllama(model=os.getenv("OLLAMA_MODEL"), temperature=temperature) 
        else:
            return ChatOpenAI(
                base_url="https://openrouter.ai/api/v1",
                api_key=os.getenv("OPENROUTER_API_KEY"),
                temperature=temperature
            )

    def _router_node(self, state: State) -> State:
        messages = state["messages"]
        last_msg_content = messages[-1].content
        router_system_msg = SystemMessage(content=(
            f"You are a router. Your task is to classify the user's intent based ONLY on their LATEST message.\n"
            f"Ignore previous topics unless the user specifically references them (e.g., 'tell me more about that').\n"
            f"- If the user asks a question about Michael's background, skills, or career -> 'search'.\n"
            f"- If the user wants to send an email or contact Michael -> 'email'.\n"
            f"- If the user is just saying hello, asking 'how are you', or chatting -> 'chat'."
            f"CRITICAL:"
            f"- If 'step' is 'search', extract the search_query from this message."
            f"- If 'step' is 'email', extract the email_address and email_body from this message.\n"
            f"The user just said: '{last_msg_content}"
        ))
        messages = [router_system_msg] + state["messages"]
        decision = self.router_llm.invoke(messages)
        print(decision)
        return {"router_decision": decision.dict()}

    def _retrieve_node(self, state: State) -> State:
        query = state["router_decision"].get("search_query")
        
        print(f"--- RETRIEVE: Executing Search for '{query}' ---")
        context = retrieve_portfolio_info.invoke(query)
        print(f"--- RETRIEVE: CONTEXT retrieved: {context} ---")

        return {"search_context": context}

    def _grade_node(self, state: State) -> State:
        query = state["router_decision"].get("search_query")
        context = state["search_context"]
        
        print("--- GRADER: Grading Retrieved Context ---")

        grader_prompt = (
            "You are a strict context grader. Your goal is to determine if the provided 'Context' "
            "is sufficient to answer the 'Question'.\n"
            "Score 'good' if the Context contains the specific, factual answer to the Question. "
            "Score 'bad' if the Context is empty, irrelevant, or lacks the necessary detail to fully answer the Question.\n"
            f"Question: {query}\n"
            f"Context: {context}"
        )
        
        grade_result = self.grader_llm.invoke([HumanMessage(content=grader_prompt)])
        grade = grade_result.score
        
        print(f"--- GRADER: Score is '{grade}' ---")
        return {"grade": grade}

    def _generate_answer_good_node(self, state: State) -> State:
        """Generates the final answer when context is 'good'."""
        query = state["router_decision"].get("search_query")
        context = state["search_context"]
        current_date = datetime.date.today().strftime("%Y-%m-%d")
        prompt = (
            f"SYSTEM: {self.system_instruction}\n\n"
            f"**Today's Date is: {current_date}**\n\n"
            f"Answer the user question based strictly on the context provided below. "
            f"**Synthesize a comprehensive summary** from all relevant sections in the context."
            f"**DO NOT reference the context or the database in your final answer.** "
            f"Keep the final answer concise.\n"
            f"Question: {query}\n"
            f"Context: {context}"
        )
        response = self.generator_llm.invoke([HumanMessage(content=prompt)])
        return {"messages": [response]}
        
    def _generate_answer_bad_node(self, state: State) -> State:
        query = state["router_decision"].get("search_query")
        
        print("--- NO INFO: Logging and Offering Email ---")
        
        log_unanswered_question.invoke({"question": query})
        
        refusal_content = (
            f"I couldn't find specific details about '{query}' in Michael Schlosser's database. "
            f"I have logged this as an unanswered question for review. "
            f"Would you like me to send Michael an email with your question directly?"
        )
        
        response = AIMessage(content=refusal_content)        
        return {"messages": [response]}

    def _email_node(self, state: State) -> State:
        # TODO: Improve and actually implement send_email execution path
        data = state["router_decision"]
        user_email = data.get("email_address", "missing@example.com")
        body = data.get("email_body", "No content provided by router.")
        
        print(f"--- ROUTER: Executing Email to {user_email} ---")
        result = send_email.invoke({"user_email": user_email, "message_body": body})
        response = AIMessage(content=f"I have successfully sent your request: {result}")
        return {"messages": [response]}

    def _chat_node(self, state: State) -> State:
        print(f"--- ROUTER: Direct Chat ---")
        
        messages = [SystemMessage(content=self.system_instruction)] + state["messages"]
        
        response = self.generator_llm.invoke(messages)
        return {"messages": [response]}

    def _build_graph(self):
        graph_builder = StateGraph(State)
        
        graph_builder.add_node("router", self._router_node)
        graph_builder.add_node("email", self._email_node)
        graph_builder.add_node("chat", self._chat_node)
        
        graph_builder.add_node("retrieve", self._retrieve_node)
        graph_builder.add_node("grade", self._grade_node)
        graph_builder.add_node("generate_answer_good", self._generate_answer_good_node)
        graph_builder.add_node("generate_answer_bad", self._generate_answer_bad_node)

        graph_builder.add_edge(START, "router")
        
        def route_decision(state: State):
            return state["router_decision"]["step"]
        
        graph_builder.add_conditional_edges(
            "router",
            route_decision,
            {
                "search": "retrieve",
                "email": "email",
                "chat": "chat"
            }
        )
        
        graph_builder.add_edge("retrieve", "grade")

        def grade_decision(state: State):
            return state["grade"]

        graph_builder.add_conditional_edges(
            "grade",
            grade_decision,
            {
                "good": "generate_answer_good",
                "bad": "generate_answer_bad"
            }
        )
        
        graph_builder.add_edge("generate_answer_good", END)
        graph_builder.add_edge("generate_answer_bad", END)
        graph_builder.add_edge("email", END)
        graph_builder.add_edge("chat", END) 
        
        graph = graph_builder.compile()
        if self.dev_mode:
            graph.get_graph().draw_mermaid_png(output_file_path="assistant_graph.png")
        return graph

    async def chat(self, user_input: str, history: List[dict]) -> str:
        messages: List[BaseMessage] = []
        for msg in history:
            if msg['role'] == 'user':
                messages.append(HumanMessage(content=msg['text']))
            elif msg['role'] == 'ai':
                messages.append(AIMessage(content=msg['text']))
        messages.append(HumanMessage(content=user_input))
        result = await self.workflow.ainvoke({"messages": messages, "router_decision": {}})
        return result["messages"][-1].content