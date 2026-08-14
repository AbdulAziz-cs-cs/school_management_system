from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .database import SessionLocal, engine, Base
from .models import Student

from pathlib import Path


# --------------------------------------------------
# PATHS
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES_DIR = BASE_DIR / "frontend" / "templates"
STATIC_DIR = BASE_DIR / "frontend" / "static"


# --------------------------------------------------
# FASTAPI APP
# --------------------------------------------------

app = FastAPI()


# --------------------------------------------------
# DATABASE
# --------------------------------------------------

Base.metadata.create_all(bind=engine)


# --------------------------------------------------
# STATIC FILES
# --------------------------------------------------

app.mount(
    "/static",
    StaticFiles(directory=STATIC_DIR),
    name="static"
)


# --------------------------------------------------
# TEMPLATES
# --------------------------------------------------

templates = Jinja2Templates(
    directory=TEMPLATES_DIR
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# HOME PAGE
# --------------------------------------------------

@app.get("/")
def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="home.html",
        context={}
    )


# --------------------------------------------------
# STUDENT RECORDS PAGE
# --------------------------------------------------

@app.get("/students-page")
def student_records(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="studentrecords.html",
        context={}
    )


# --------------------------------------------------
# CERTIFICATE PAGE
# --------------------------------------------------

@app.get("/certificate")
def certificate(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="create_certificate.html",
        context={}
    )


# --------------------------------------------------
# CERTIFICATE HISTORY PAGE
# --------------------------------------------------

@app.get("/certificate-history")
def certificate_history(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="certificate_history.html",
        context={}
    )


# --------------------------------------------------
# LOGIN PAGE
# --------------------------------------------------

@app.get("/login")
def login(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={}
    )


# --------------------------------------------------
# PYDANTIC MODEL
# --------------------------------------------------

class StudentData(BaseModel):

    name: str
    father_name: str
    dob: str
    doj: str


# --------------------------------------------------
# ADD STUDENT API
# --------------------------------------------------

@app.post("/students")
def add_student(student: StudentData):

    db = SessionLocal()

    new_student = Student(
        name=student.name,
        father_name=student.father_name,
        dob=student.dob,
        doj=student.doj
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    db.close()

    return {
        "message": "Student added successfully",
        "id": new_student.id
    }


# --------------------------------------------------
# GET STUDENTS API
# --------------------------------------------------

@app.get("/students")
def get_students():

    db = SessionLocal()

    students = db.query(Student).all()

    result = []

    for student in students:

        result.append({
            "id": student.id,
            "name": student.name,
            "father_name": student.father_name,
            "dob": student.dob,
            "doj": student.doj,
        })

    db.close()

    return result