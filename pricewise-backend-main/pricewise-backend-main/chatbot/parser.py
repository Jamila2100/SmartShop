import re


KNOWN_BRANDS = ["nike", "adidas", "puma", "reebok", "milton", "borosil"]
KNOWN_COLORS = ["blue", "black", "white", "red", "green", "silver"]
KNOWN_PLATFORMS = ["amazon", "flipkart"]


def parse_query(message: str, previous_filters: dict = None):
    if previous_filters is None:
        previous_filters = {}

    text = message.lower()
    filters = previous_filters.copy()

    # Product keyword detection
    if "shoe" in text or "shoes" in text:
        filters["product_keyword"] = "shoes"
    elif "bottle" in text or "bottles" in text:
        filters["product_keyword"] = "bottle"

    # Price range: "1000 to 2000" or "1000-2000"
    price_range = re.search(r'(\d+)\s*(to|-)\s*(\d+)', text)
    if price_range:
        filters["min_price"] = int(price_range.group(1))
        filters["max_price"] = int(price_range.group(3))

    # Under X
    under_match = re.search(r'under\s+(\d+)', text)
    if under_match:
        filters["min_price"] = 0
        filters["max_price"] = int(under_match.group(1))

    # Above X
    above_match = re.search(r'above\s+(\d+)', text)
    if above_match and "min_rating" not in filters:
        filters["min_price"] = int(above_match.group(1))

    # Rating patterns
    rating_match = re.search(r'(rating above|rated above|rating|rated)\s+(\d+(\.\d+)?)', text)
    if rating_match:
        filters["min_rating"] = float(rating_match.group(2))

    # Handles "4 above", "4 and above", "rated 4 above"
    rating_alt = re.search(r'(\d+(\.\d+)?)\s*(and above|above)', text)
    if rating_alt and ("rated" in text or "rating" in text):
        filters["min_rating"] = float(rating_alt.group(1))

    # Platform
    for platform in KNOWN_PLATFORMS:
        if platform in text:
            filters["platform"] = platform.capitalize()

    # Brand
    for brand in KNOWN_BRANDS:
        if brand in text:
            filters["brand"] = brand

    # Color
    for color in KNOWN_COLORS:
        if color in text:
            filters["color"] = color

    # Sorting preference
    if "fastest" in text or "faster" in text or "quickest" in text:
        filters["sort_by"] = "delivery"

    if "cheapest" in text or "lowest price" in text or "cheaper" in text:
        filters["sort_by"] = "price"

    if "best rated" in text or "highest rated" in text:
        filters["sort_by"] = "rating"

    return filters