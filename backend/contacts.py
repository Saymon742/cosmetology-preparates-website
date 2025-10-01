from sqlalchemy.orm import Session
from database import SessionLocal 
import models
import schemas

def create_contact(contact: schemas.ContactCreate):
    db = SessionLocal()
    try:
        db_contact = models.Contact(
            name=contact.name,
            email=contact.email,
            phone=contact.phone,
            message=contact.message
        )
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        return {"message": "Contact form submitted successfully", "id": db_contact.id}
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()