import os
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
import models
import schemas
import bcrypt
import jwt

from typing import Optional

SECRET_KEY = "cosmeticlab-secret-key-2024-super-secure"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = db.query(models.User).filter(models.User.email == user.email).first()
        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        hashed_password = hash_password(user.password)
        db_user = models.User(
            email=user.email,
            hashed_password=hashed_password,
            full_name=user.full_name,
            phone=user.phone
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        # Create access token
        access_token = create_access_token(
            data={"sub": user.email, "user_id": db_user.id}
        )
        
        user_response = schemas.User(
            id=db_user.id,
            email=db_user.email,
            full_name=db_user.full_name,
            phone=db_user.phone,
            is_active=db_user.is_active,
            created_at=db_user.created_at
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_response
        }
        
    except Exception as e:
        db.rollback()
        raise e

def authenticate_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    try:
        db_user = db.query(models.User).filter(models.User.email == user.email).first()
        if not db_user or not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
            )
        
        if not db_user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )
        
        access_token = create_access_token(
            data={"sub": user.email, "user_id": db_user.id}
        )
        
        user_response = schemas.User(
            id=db_user.id,
            email=db_user.email,
            full_name=db_user.full_name,
            phone=db_user.phone,
            is_active=db_user.is_active,
            created_at=db_user.created_at
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_response
        }
        
    except Exception as e:
        raise e

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

def get_current_user(token: str = Depends(verify_token), db: Session = Depends(get_db)):
    user_email = token
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def check_admin(user_email: str):
    admin_email = os.getenv('ADMIN_EMAIL')
    return user_email == admin_email