from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from database import SessionLocal, engine, get_db
from products_db import products_engine, get_products_db
import models
import schemas
import auth
from products import get_products, get_product, create_product, get_products_by_category
from orders import add_to_cart, get_cart, create_order, get_user_orders
from contacts import create_contact

load_dotenv('../.env')

ADMIN_EMAIL = os.getenv('ADMIN_EMAIL')

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    if token != "admin-token":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    return type('User', (), {'email': 'authenticated_user'})()

def check_admin(user_email: str):
    """Проверяет, является ли пользователь админом - БЕЗ раскрытия email"""
    return user_email == ADMIN_EMAIL

@asynccontextmanager
async def lifespan(app: FastAPI):
    models.Base.metadata.create_all(bind=engine)
    models.ProductsBase.metadata.create_all(bind=products_engine)
    print("✅ Базы данных инициализированы!")
    print("🛡️  Admin system activated")
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

# ==================== PUBLIC ROUTES ====================

@app.get("/")
def read_root():
    return {"message": "CosmeticLab API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

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

# ==================== CART ROUTES ====================

@app.get("/cart/")
def read_cart(current_user = Depends(get_current_user)):
    return get_cart(current_user.email)

@app.post("/cart/add/")
def add_item_to_cart(cart_item: schemas.CartItemCreate, current_user = Depends(get_current_user)):
    return add_to_cart(cart_item, current_user.email)

# ==================== ORDER ROUTES ====================

@app.post("/orders/create/", response_model=schemas.Order)
def create_new_order(order: schemas.OrderCreate):
    return create_order(order, "guest@example.com")

@app.get("/orders/", response_model=list[schemas.Order])
def read_user_orders(db: Session = Depends(get_db)):
    return get_user_orders(db, "guest@example.com")

# ==================== CONTACT ROUTES ====================

@app.post("/contacts/")
def submit_contact_form(contact: schemas.ContactCreate):
    return create_contact(contact)

# ==================== ADMIN ROUTES ====================

@app.get("/admin/dashboard")
async def admin_dashboard(current_user = Depends(get_current_user)):
    """Админ панель - статистика"""
    if not check_admin(current_user.email):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    return {
        "message": "Admin Dashboard", 
        "stats": {
            "total_products": 150,
            "total_orders": 45,
            "total_users": 89,
            "revenue": 125000
        }
    }

@app.get("/admin/products")
async def admin_get_products(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_products_db)
):
    """Получить все продукты для админ-панели"""
    if not check_admin(current_user.email):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    products = get_products(db, skip=0, limit=1000)
    return {
        "products": products,
        "total": len(products)
    }

@app.post("/admin/products/", response_model=schemas.Product)
async def admin_create_product(
    product: schemas.ProductCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_products_db)
):
    """Создать новый продукт (только для админа)"""
    if not check_admin(current_user.email):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    return create_product(db, product)

@app.get("/admin/check-access")
async def check_admin_access(current_user = Depends(get_current_user)):
    """Проверить доступ к админ-панели - БЕЗ раскрытия email"""
    is_admin = check_admin(current_user.email)
    return {
        "is_admin": is_admin,
        "access_granted": is_admin
    }

@app.put("/admin/products/{product_id}")
async def admin_update_product(
    product_id: int,
    product: schemas.ProductCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_products_db)
):
    if not check_admin(current_user.email):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    existing_product = get_product(db, product_id)
    if existing_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for field, value in product.dict().items():
        setattr(existing_product, field, value)
    
    db.commit()
    db.refresh(existing_product)
    return existing_product

@app.delete("/admin/products/{product_id}")
async def admin_delete_product(
    product_id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_products_db)
):
    if not check_admin(current_user.email):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    product = get_product(db, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)