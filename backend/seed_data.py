from database import SessionLocal, engine
from products_db import ProductsSessionLocal, products_engine
import models

def seed_products():
    # Создаем таблицы для основной базы
    models.Base.metadata.create_all(bind=engine)
    
    # Создаем таблицы для базы продуктов
    models.ProductsBase.metadata.create_all(bind=products_engine)
    
    print("✅ Все базы данных инициализированы!")

if __name__ == "__main__":
    seed_products()