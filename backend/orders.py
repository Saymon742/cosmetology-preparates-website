from datetime import datetime

cart_store = {}

def add_to_cart(cart_item, user_email: str = "guest@example.com"):
    if user_email not in cart_store:
        cart_store[user_email] = []
    
    if cart_item.quantity <= 0:
        cart_store[user_email] = [item for item in cart_store[user_email] if item["product_id"] != cart_item.product_id]
        return {"status": "success", "message": "Товар удален из корзины"}
    
    for item in cart_store[user_email]:
        if item["product_id"] == cart_item.product_id:
            item["quantity"] = cart_item.quantity
            item["updated_at"] = datetime.now()
            break
    else:
        cart_store[user_email].append({
            "product_id": cart_item.product_id,
            "quantity": cart_item.quantity,
            "added_at": datetime.now()
        })
    
    return {"status": "success", "message": "Корзина обновлена"}

def get_cart(user_email: str = "guest@example.com"):
    return cart_store.get(user_email, [])

def create_order(order, user_email: str = "guest@example.com"):
    cart_items = cart_store.get(user_email, [])
    
    if not cart_items:
        return {"status": "error", "message": "Cart is empty"}
    
    order_data = {
        "id": len(cart_store) + 1,
        "user_email": user_email,
        "items": cart_items,
        "total_amount": sum(item.get('quantity', 1) * 1000 for item in cart_items),
        "status": "created",
        "created_at": datetime.now().isoformat(),
        "shipping_address": order.shipping_address,
        "payment_method": order.payment_method
    }
    
    cart_store[user_email] = []
    
    return order_data

def get_user_orders(db, user_email: str = "guest@example.com"):
    orders = []
    for email, cart_items in cart_store.items():
        if email == user_email and cart_items:
            orders.append({
                "id": 1,
                "user_email": email,
                "items": cart_items,
                "total_amount": sum(item.get('quantity', 1) * 1000 for item in cart_items),
                "status": "completed",
                "created_at": datetime.now().isoformat()
            })
    return orders