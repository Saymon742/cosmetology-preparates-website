from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database import SessionLocal, engine, get_db
from products_db import products_engine, get_products_db
import models
import schemas
import auth
from products import get_products, get_product, create_product, get_products_by_category
from orders import add_to_cart, get_cart, create_order, get_user_orders
from contacts import create_contact

@asynccontextmanager
async def lifespan(app: FastAPI):
    models.Base.metadata.create_all(bind=engine)
    models.ProductsBase.metadata.create_all(bind=products_engine)
    print("✅ Базы данных инициализированы!")
    yield

app = FastAPI(
    title="CosmeticLab API", 
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/products/", response_model=list[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_products_db)):
    products = get_products(db, skip=skip, limit=limit)
    return products

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_products_db)):
    product = get_product(db, product_id=product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/products/category/{category}", response_model=list[schemas.Product])
def read_products_by_category(category: str, db: Session = Depends(get_products_db)):
    products = get_products_by_category(db, category=category)
    return products

@app.post("/register/", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return auth.register_user(user, db)

@app.post("/login/", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    return auth.authenticate_user(user, db)

@app.get("/cart/")
def read_cart():
    return get_cart()

@app.post("/cart/add/")
def add_item_to_cart(cart_item: schemas.CartItemCreate):
    return add_to_cart(cart_item)


@app.post("/orders/create/", response_model=schemas.Order)
def create_new_order(
    order: schemas.OrderCreate, 
):
    return create_order(order, "guest@example.com")  # Временное решение

@app.get("/orders/", response_model=list[schemas.Order])
def read_user_orders(
    db: Session = Depends(get_db)
):
    return get_user_orders(db, "guest@example.com")  # Временное решение

@app.post("/contacts/")
def submit_contact_form(contact: schemas.ContactCreate):
    return create_contact(contact)

@app.post("/admin/products/")
def create_product_endpoint(
    product: schemas.ProductCreate,
    db: Session = Depends(get_products_db)
):
    return create_product(db, product)

@app.get("/")
def read_root():
    return {"message": "CosmeticLab API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)