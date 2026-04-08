from fastapi import APIRouter
from chatbot.schemas import ChatRequest, ChatResponse
from chatbot.parser import parse_query
from chatbot.memory import get_session_filters, update_session_filters
from chatbot.search import filter_products, rank_products

router = APIRouter()


@router.post("/query", response_model=ChatResponse)
def chatbot_query(request: ChatRequest):
    # Step 1: Load previous session filters
    previous_filters = get_session_filters(request.session_id)

    # Step 2: Parse current message
    filters = parse_query(request.message, previous_filters)

    # Step 3: Save updated filters
    final_filters = update_session_filters(request.session_id, filters)

    # Step 4: Search products
    matched_products = filter_products(final_filters)

    # Step 5: Rank products
    sort_by = final_filters.get("sort_by")
    best_match, ranked_products = rank_products(matched_products, sort_by)

    # Step 6: Build response message
    if best_match:
        response_message = f"Found {len(ranked_products)} matching products. Best match: {best_match['name']}"
    else:
        response_message = "No exact products found for your query."

    return ChatResponse(
        user_query=request.message,
        interpreted_filters=final_filters,
        best_match=best_match,
        results=ranked_products,
        message=response_message
    )