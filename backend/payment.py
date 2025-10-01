from fastapi import HTTPException
from database import SessionLocal
import models
import schemas

def create_order(order: schemas.OrderCreate, user_email: str):
    db = SessionLocal()
    
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_order = models.Order(
        user_id=user.id,
        total_amount=order.total_amount,
        status="pending"
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    for item in order.items:
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not product:
            continue
        order_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=product.price
        )
        db.add(order_item)
    
    db.commit()
    db.close()
    
    return {"order_id": db_order.id, "status": "created"}