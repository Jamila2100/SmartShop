from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ LOAD REAL DATA
with open("products.json", "r") as f:
    products = json.load(f)

@app.get("/")
def home():
    return {"message": "Backend is running"}

@app.post("/search")
def search_products(request: dict):
    name = request.get("name", "").lower()
    min_price = request.get("min_price", 0)
    max_price = request.get("max_price", 1000000)
    rating = request.get("rating", 0)

    results = []

    for product in products:
        product_name = product["name"].lower()

        # ✅ SMART NAME FILTER
        if name:
            words = name.split()
            if not any(word in product_name for word in words):
                continue

        # ✅ PRICE FILTER
        if not (min_price <= product["price"] <= max_price):
            continue

        # ✅ RATING FILTER
        if product.get("rating") and product["rating"] < rating:
            continue

        results.append(product)

    if not results:
        return {
            "data": [],
            "message": "No exact match found. Please update your requirements."
        }

    results.sort(key=lambda x: x["price"])

    return {
        "best_product": results[0],
        "all_products": results
    }