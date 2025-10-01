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
        
        product = db.query(models.Product).filter(models.Product.id == cart_item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
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
                product_name_uk=product.name_uk,
                product_name_ru=product.name_ru,
                product_price=product.price,
                product_volume=product.volume,
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
        items = []
        for item in cart_items:
            item_total = item.product_price * item.quantity
            total_amount += item_total
            items.append({
                "id": item.id,
                "product_id": item.product_id,
                "product_name_uk": item.product_name_uk,
                "product_name_ru": item.product_name_ru,
                "price": item.product_price,
                "volume": item.product_volume,
                "quantity": item.quantity,
                "added_at": item.added_at
            })
        
        return {
            "items": items,
            "total_amount": total_amount
        }
        
    finally:
        db.close()