import os
import certifi
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:@localhost:3306/gps_shingrai"
)

connect_args = {}

# Use certifi CA bundle when connecting to TiDB Cloud
if DATABASE_URL and "tidbcloud.com" in DATABASE_URL:
    connect_args = {
        "ssl": {
            "ca": certifi.where()
        }
    }

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
    pool_recycle=300
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()