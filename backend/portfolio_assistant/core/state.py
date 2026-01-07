# state.py
from typing import Annotated, TypedDict, List, Any, Literal
from pydantic import BaseModel, Field
from langgraph.graph.message import add_messages

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