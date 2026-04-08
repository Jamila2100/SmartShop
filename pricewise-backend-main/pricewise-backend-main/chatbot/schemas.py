from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    user_query: str
    interpreted_filters: Dict[str, Any]
    best_match: Optional[Dict[str, Any]]
    results: List[Dict[str, Any]]
    message: str