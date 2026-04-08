from data.products_data import products


def filter_products(filters: dict):
    matched = []

    for product in products:
        name_lower = product["name"].lower()

        # Product keyword
        if "product_keyword" in filters:
            keyword = filters["product_keyword"]
            if keyword not in name_lower:
                continue

        # Brand
        if "brand" in filters:
            if filters["brand"] not in name_lower:
                continue

        # Color
        if "color" in filters:
            if filters["color"] not in name_lower:
                continue

        # Platform
        if "platform" in filters:
            if product.get("platform", "").lower() != filters["platform"].lower():
                continue

        # Price
        if "min_price" in filters:
            if product["price"] < filters["min_price"]:
                continue

        if "max_price" in filters:
            if product["price"] > filters["max_price"]:
                continue

        # Rating
        if "min_rating" in filters:
            if product["rating"] < filters["min_rating"]:
                continue

        matched.append(product)

    return matched


def rank_products(products_list: list, sort_by: str = None):
    if not products_list:
        return None, []

    if sort_by == "price":
        ranked = sorted(products_list, key=lambda x: x["price"])
    elif sort_by == "rating":
        ranked = sorted(products_list, key=lambda x: -x["rating"])
    elif sort_by == "delivery":
        ranked = sorted(products_list, key=lambda x: x["delivery"])
    else:
        # Default smart ranking
        ranked = sorted(products_list, key=lambda x: (-x["rating"], x["price"], x["delivery"]))

    best_match = ranked[0]
    return best_match, ranked