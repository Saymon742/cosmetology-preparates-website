from fastapi import HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
import schemas

def add_to_cart(cart_item: schemas.CartItemCreate, user_email: str):
    db = SessionLocal()
    try:
        user = db.query(models.User).filter(models.User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Check if product exists
        product = db.query(models.Product).filter(models.Product.id == cart_item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Check if item already in cart
        existing_item = db.query(models.CartItem).filter(
            models.CartItem.user_id == user.id,
            models.CartItem.product_id == cart_item.product_id
        ).first()
        
        if existing_item:
            existing_item.quantity += cart_item.quantity
        else:
            new_cart_item = models.CartItem(
                user_id=user.id,
                product_id=cart_item.product_id,
                quantity=cart_item.quantity
            )
            db.add(new_cart_item)
        
        db.commit()
        return {"message": "Product added to cart"}
        
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def get_cart(user_email: str):
    db = SessionLocal()
    try:
        user = db.query(models.User).filter(models.User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        cart_items = db.query(models.CartItem).filter(models.CartItem.user_id == user.id).all()
        
        total_amount = 0
        items_with_details = []
        for item in cart_items:
            product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
            if product:
                item_total = product.price * item.quantity
                total_amount += item_total
                items_with_details.append({
                    "id": item.id,
                    "product_id": item.product_id,
                    "quantity": item.quantity,
                    "added_at": item.added_at,
                    "product": product
                })
        
        return {
            "items": items_with_details,
            "total_amount": total_amount
        }
        
    finally:
        db.close()

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