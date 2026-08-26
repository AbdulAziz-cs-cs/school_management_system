import os
import certifi
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://bfs8fJyKGvC8ftk.root:zo4HXAaz0Ew29arw@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/school_db?ssl_verify_cert=true&ssl_verify_identity=true"
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