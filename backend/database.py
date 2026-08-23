import os
import ssl
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")

connect_args = {}
if DATABASE_URL and "tidbcloud.com" in DATABASE_URL:
    # Build standard SSL context for TiDB Serverless TLS
    ctx = ssl.create_default_context()
    ctx.check_hostname = True
    ctx.verify_mode = ssl.CERT_REQUIRED
    connect_args = {"ssl": ctx}

engine = create_engine(
    DATABASE_URL or "sqlite:///:memory:",
    connect_args=connect_args,
    pool_pre_ping=True,
    pool_recycle=300
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()