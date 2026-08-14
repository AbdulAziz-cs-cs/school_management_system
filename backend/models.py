from sqlalchemy import Column, Integer, String

from .database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    dob = Column(String(50), nullable=False)