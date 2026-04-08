import requests
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware 

from chatbot.parser import parse_query


app = FastAPI(
    title="Shopping Chatbot API",
    description="A session-aware shopping chatbot backend using FastAPI",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory session storage
session_memory = {}


# Request model
class ChatRequest(BaseModel):
    session_id: str
    message: str


# Response model
class ChatResponse(BaseModel):
    user_query: str
    interpreted_filters: Dict[str, Any]
    best_match: Optional[Dict[str, Any]]
    results: List[Dict[str, Any]]
    message: str


@app.get("/")
def home():
    return {"message": "Shopping Chatbot API is running"}
@app.post("/chatbot/query", response_model=ChatResponse)
def chatbot_query(request: ChatRequest):
    # Get previous filters for this session
    previous_filters = session_memory.get(request.session_id, {})

    # Parse current message and merge with previous filters
    filters = parse_query(request.message, previous_filters)

    # Save updated filters in session memory
    session_memory[request.session_id] = filters

    # Call your backend API
    response = requests.post(
        "http://127.0.0.1:8000/search",
        json={
            "name": filters.get("name", ""),
            "min_price": filters.get("min_price", 0),
            "max_price": filters.get("max_price", 1000000),
            "rating": filters.get("rating", 0),
            "max_delivery": filters.get("max_delivery", 10)
        }
    )

    # Get response data
    data = response.json()

    # Process backend response
    if "best_product" in data:
        best_match = data["best_product"]
        ranked_results = data["all_products"]
    else:
        best_match = None
        ranked_results = data.get("data", [])

    # Create response message
    if ranked_results:
        response_message = f"Found {len(ranked_results)} matching products."
    else:
        response_message = data.get("message", "No matching products found.")

    # Return final response
    return {
        "user_query": request.message,
        "interpreted_filters": filters,
        "best_match": best_match,
        "results": ranked_results,
        "message": response_message
    }
