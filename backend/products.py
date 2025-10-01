from sqlalchemy.orm import Session
from products_db import get_products_db
import models
import schemas

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).filter(models.Product.in_stock == True).offset(skip).limit(limit).all()

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(
        name_uk=product.name_uk,
        name_ru=product.name_ru,
        description_uk=product.description_uk,
        description_ru=product.description_ru,
        price=product.price,
        category=product.category,
        volume=product.volume,
        concentration=product.concentration,
        image_url=product.image_url
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_products_by_category(db: Session, category: str):
    return db.query(models.Product).filter(
        models.Product.category == category,
        models.Product.in_stock == True
    ).all()

def update_product_stock(db: Session, product_id: int, quantity: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product:
        product.stock_quantity = quantity
        if quantity <= 0:
            product.in_stock = False
        db.commit()
    return product