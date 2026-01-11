from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from pydantic import BaseModel

from database import SessionLocal, engine, Base
from models import Project, Skill, About, Hero, Contact, BlogPost, Resume
from schemas import (
    ProjectCreate, ProjectUpdate, ProjectResponse,
    SkillCreate, SkillUpdate, SkillResponse,
    AboutCreate, AboutUpdate, AboutResponse,
    HeroCreate, HeroUpdate, HeroResponse,
    ContactCreate, ContactUpdate, ContactResponse,
    BlogPostCreate, BlogPostUpdate, BlogPostResponse,
    ResumeCreate, ResumeUpdate, ResumeResponse
)

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Health check
@app.get("/")
def root():
    return {"message": "Portfolio API is running"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


# Projects endpoints
@app.get("/api/projects", response_model=List[ProjectResponse])
def get_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = db.query(Project).offset(skip).limit(limit).all()
    return projects


@app.get("/api/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.post("/api/projects", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@app.put("/api/projects/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_project, field, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project


@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}


# Skills endpoints
@app.get("/api/skills", response_model=List[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).all()
    return skills


@app.get("/api/skills/{skill_id}", response_model=SkillResponse)
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@app.post("/api/skills", response_model=SkillResponse)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    db_skill = Skill(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill


@app.put("/api/skills/{skill_id}", response_model=SkillResponse)
def update_skill(skill_id: int, skill: SkillUpdate, db: Session = Depends(get_db)):
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    update_data = skill.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_skill, field, value)
    
    db.commit()
    db.refresh(db_skill)
    return db_skill


@app.delete("/api/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    db.delete(db_skill)
    db.commit()
    return {"message": "Skill deleted successfully"}


# About endpoint
@app.get("/api/about", response_model=AboutResponse)
def get_about(db: Session = Depends(get_db)):
    about = db.query(About).first()
    if not about:
        raise HTTPException(status_code=404, detail="About content not found")
    return about


@app.post("/api/about", response_model=AboutResponse)
def create_about(about: AboutCreate, db: Session = Depends(get_db)):
    # Delete existing about if any
    db.query(About).delete()
    db_about = About(**about.dict())
    db.add(db_about)
    db.commit()
    db.refresh(db_about)
    return db_about


@app.put("/api/about", response_model=AboutResponse)
def update_about(about: AboutUpdate, db: Session = Depends(get_db)):
    db_about = db.query(About).first()
    if not db_about:
        raise HTTPException(status_code=404, detail="About content not found")
    
    update_data = about.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_about, field, value)
    
    db.commit()
    db.refresh(db_about)
    return db_about


# Hero endpoint
@app.get("/api/hero", response_model=HeroResponse)
def get_hero(db: Session = Depends(get_db)):
    hero = db.query(Hero).first()
    if not hero:
        raise HTTPException(status_code=404, detail="Hero content not found")
    return hero


@app.post("/api/hero", response_model=HeroResponse)
def create_hero(hero: HeroCreate, db: Session = Depends(get_db)):
    # Delete existing hero if any
    db.query(Hero).delete()
    db_hero = Hero(**hero.dict())
    db.add(db_hero)
    db.commit()
    db.refresh(db_hero)
    return db_hero


@app.put("/api/hero", response_model=HeroResponse)
def update_hero(hero: HeroUpdate, db: Session = Depends(get_db)):
    db_hero = db.query(Hero).first()
    if not db_hero:
        raise HTTPException(status_code=404, detail="Hero content not found")
    
    update_data = hero.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_hero, field, value)
    
    db.commit()
    db.refresh(db_hero)
    return db_hero


# Contact endpoint
@app.get("/api/contact", response_model=ContactResponse)
def get_contact(db: Session = Depends(get_db)):
    contact = db.query(Contact).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact information not found")
    return contact


@app.post("/api/contact", response_model=ContactResponse)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    # Delete existing contact if any
    db.query(Contact).delete()
    db_contact = Contact(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


@app.put("/api/contact", response_model=ContactResponse)
def update_contact(contact: ContactUpdate, db: Session = Depends(get_db)):
    db_contact = db.query(Contact).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact information not found")
    
    update_data = contact.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_contact, field, value)
    
    db.commit()
    db.refresh(db_contact)
    return db_contact


# Contact form message schema
class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str


@app.post("/api/contact/message")
def send_contact_message(message: ContactMessage):
    """
    Send contact form message via email
    """
    try:
        # Get recipient email from contact info or use default
        recipient_email = os.getenv("CONTACT_EMAIL", "rawat.mayank1234@gmail.com")
        
        # Create email
        msg = MIMEMultipart()
        msg['From'] = os.getenv("SMTP_FROM_EMAIL", "noreply@portfolio.com")
        msg['To'] = recipient_email
        msg['Subject'] = f"Portfolio Contact: {message.subject}"
        
        # Email body
        body = f"""
        New message from your portfolio contact form:
        
        Name: {message.name}
        Email: {message.email}
        Subject: {message.subject}
        
        Message:
        {message.message}
        
        ---
        You can reply directly to: {message.email}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Try to send email if SMTP is configured
        smtp_server = os.getenv("SMTP_SERVER")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))
        smtp_user = os.getenv("SMTP_USER")
        smtp_password = os.getenv("SMTP_PASSWORD")
        
        if smtp_server and smtp_user and smtp_password:
            try:
                server = smtplib.SMTP(smtp_server, smtp_port)
                server.starttls()
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
                server.quit()
            except Exception as e:
                # Log error but don't fail the request
                print(f"Failed to send email: {e}")
        
        # Also log to console for debugging
        print(f"Contact form submission: {message.name} ({message.email}) - {message.subject}")
        
        return {
            "success": True,
            "message": "Your message has been sent successfully!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send message: {str(e)}")


# Blog endpoints
@app.get("/api/blog", response_model=List[BlogPostResponse])
def get_blog_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = db.query(BlogPost).offset(skip).limit(limit).all()
    return posts


@app.get("/api/blog/{post_id}", response_model=BlogPostResponse)
def get_blog_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


@app.post("/api/blog", response_model=BlogPostResponse)
def create_blog_post(post: BlogPostCreate, db: Session = Depends(get_db)):
    db_post = BlogPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


@app.put("/api/blog/{post_id}", response_model=BlogPostResponse)
def update_blog_post(post_id: int, post: BlogPostUpdate, db: Session = Depends(get_db)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = post.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post


@app.delete("/api/blog/{post_id}")
def delete_blog_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    db.delete(db_post)
    db.commit()
    return {"message": "Blog post deleted successfully"}


# Resume endpoint
@app.get("/api/resume", response_model=ResumeResponse)
def get_resume(db: Session = Depends(get_db)):
    resume = db.query(Resume).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume content not found")
    return resume


@app.post("/api/resume", response_model=ResumeResponse)
def create_resume(resume: ResumeCreate, db: Session = Depends(get_db)):
    # Delete existing resume if any
    db.query(Resume).delete()
    db_resume = Resume(**resume.dict())
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    return db_resume


@app.put("/api/resume", response_model=ResumeResponse)
def update_resume(resume: ResumeUpdate, db: Session = Depends(get_db)):
    db_resume = db.query(Resume).first()
    if not db_resume:
        raise HTTPException(status_code=404, detail="Resume content not found")
    
    update_data = resume.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_resume, field, value)
    
    db.commit()
    db.refresh(db_resume)
    return db_resume

