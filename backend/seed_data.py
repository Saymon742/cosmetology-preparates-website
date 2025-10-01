from products_db import ProductsSessionLocal
import models

def seed_products():
    db = ProductsSessionLocal()
    
    try:
        models.ProductsBase.metadata.create_all(bind=db.bind)
        print("✅ Products database tables created successfully!")
        
    except Exception as e:
        print(f"Error creating products tables: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_products()