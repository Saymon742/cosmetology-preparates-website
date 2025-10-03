from fastapi import HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
import schemas
from datetime import datetime

cart_store = {}

def add_to_cart(cart_item: schemas.CartItemCreate):
    email = "guest@example.com"
    
    # Всегда инициализируем пустую корзину если не существует
    if email not in cart_store:
        cart_store[email] = []
    
    # Если количество 0 - удаляем товар
    if cart_item.quantity <= 0:
        cart_store[email] = [item for item in cart_store[email] if item["product_id"] != cart_item.product_id]
        return {"status": "success", "message": "Товар удален из корзины"}
    
    # Проверяем, есть ли уже такой товар в корзине
    for item in cart_store[email]:
        if item["product_id"] == cart_item.product_id:
            item["quantity"] = cart_item.quantity  # Обновляем количество
            item["updated_at"] = datetime.now()
            break
    else:
        # Добавляем новый товар
        cart_store[email].append({
            "product_id": cart_item.product_id,
            "quantity": cart_item.quantity,
            "added_at": datetime.now()
        })
    
    return {"status": "success", "message": "Корзина обновлена"}

def get_cart():
    email = "guest@example.com"
    # Всегда возвращаем пустой массив
    return cart_store.get(email, [])

def get_cart():
    email = "guest@example.com"
    return cart_store.get(email, [])  # Всегда возвращаем пустой массив если корзины нет
    
    return {"status": "success", "message": "Корзина обновлена"}
def get_cart(email: str = "guest@example.com"):
    return cart_store.get(email, [])

def create_order(order: schemas.OrderCreate, user_email: str):
    db = SessionLocal()
    try:
        user = db.query(models.User).filter(models.User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Create order
        db_order = models.Order(
            user_id=user.id,
            total_amount=order.total_amount,
            shipping_address=order.shipping_address,
            notes=order.notes,
            status="pending",
            payment_status="pending"
        )
        db.add(db_order)
        db.flush()  # Get the order ID without committing
        
        # Add order items
        for item in order.items:
            product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
            if not product:
                continue
            
            order_item = models.OrderItem(
                order_id=db_order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price
            )
            db.add(order_item)
        
        db.commit()
        db.refresh(db_order)
        
        return db_order
        
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def get_user_orders(db: Session, user_email: str):
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db.query(models.Order).filter(models.Order.user_id == user.id).all()