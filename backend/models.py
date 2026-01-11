from sqlalchemy import Column, Integer, String, Text, JSON
from database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    technologies = Column(JSON, nullable=False)  # List of strings stored as JSON
    github_url = Column(String, nullable=True)
    live_url = Column(String, nullable=True)


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    skill_name = Column(String, nullable=False)
    level = Column(Integer, nullable=False)  # 0-100


class About(Base):
    __tablename__ = "about"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    highlights = Column(JSON, nullable=True)  # List of {number, label} objects
    photo_url = Column(String, nullable=True)


class Hero(Base):
    __tablename__ = "hero"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    subtitle = Column(String, nullable=False)
    description = Column(Text, nullable=False)


class Contact(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    linkedin = Column(String, nullable=True)
    github = Column(String, nullable=True)
    instagram = Column(String, nullable=True)
    whatsapp = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    instagram_url = Column(String, nullable=True)
    whatsapp_url = Column(String, nullable=True)


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False, index=True)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    published_at = Column(String, nullable=True)  # ISO date string


class Resume(Base):
    __tablename__ = "resume"

    id = Column(Integer, primary_key=True, index=True)
    experience = Column(JSON, nullable=False)  # List of {title, company, period, description} objects
    education = Column(JSON, nullable=False)  # List of {degree, school, period, description} objects
    certifications = Column(JSON, nullable=True)  # List of strings
    technical_skills = Column(JSON, nullable=True)  # Object with categories as keys and skill arrays as values

