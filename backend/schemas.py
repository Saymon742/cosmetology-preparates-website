from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: str
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name_uk: str
    name_ru: str
    description_uk: str
    description_ru: str
    price: float
    category: str
    volume: str
    concentration: str
    image_url: Optional[str] = None

class ProductCreate(BaseModel):
    name_uk: str
    name_ru: str
    description_uk: str
    description_ru: str
    price: float
    category: str
    volume: str
    concentration: str
    image_url: Optional[str] = None

class Product(ProductBase):
    id: int
    in_stock: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    total_amount: float
    shipping_address: Optional[str] = None
    notes: Optional[str] = None

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    user_id: int
    status: str
    payment_status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemResponse(BaseModel):
    id: int
    product_id: int
    product_name_uk: str
    product_name_ru: str
    price: float
    volume: str
    quantity: int
    added_at: datetime
    
    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    items: List[CartItemResponse]
    total_amount: float
    
    class Config:
        from_attributes = True

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: int
    created_at: datetime
    is_processed: bool
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User