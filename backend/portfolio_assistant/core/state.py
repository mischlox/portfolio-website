# state.py
from typing import Annotated, TypedDict, List, Any, Literal
from pydantic import BaseModel, Field
from langgraph.graph.message import add_messages

class State(TypedDict):
    messages: Annotated[List[Any], add_messages]
    router_decision: dict
    search_context: str
    grade: Literal["good", "bad"]
    next_action: str = "none"

class RouteQuery(BaseModel):
    step: Literal["search", "email", "chat"] = Field(
        description="The next step to take: 'search' for retrieving information about Michael, 'email' to contact Michael, or 'chat' for general conversation."
    )
    search_query: str = Field(default="", description="The search query if step is 'search'.")

class Grade(BaseModel):
    score: Literal["good", "bad"] = Field(
        description="Must be 'good' if the context contains enough factual information to answer the question, or 'bad' otherwise."
    )
    reason: str = Field(description="Reason why the context was graded as 'good' or 'bad'")