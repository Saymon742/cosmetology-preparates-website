from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

PRODUCTS_DATABASE_URL = "sqlite:///db/products.db"

products_engine = create_engine(
    PRODUCTS_DATABASE_URL, connect_args={"check_same_thread": False}
)
ProductsSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=products_engine)

ProductsBase = declarative_base()

def get_products_db():
    db = ProductsSessionLocal()
    try:
        yield db
    finally:
        db.close()