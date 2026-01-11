from pydantic import BaseModel
from typing import List, Optional, Dict, Any


# Project schemas
class ProjectBase(BaseModel):
    title: str
    category: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: int

    class Config:
        from_attributes = True


# Skill schemas
class SkillBase(BaseModel):
    category: str
    icon: str
    skill_name: str
    level: int


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    category: Optional[str] = None
    icon: Optional[str] = None
    skill_name: Optional[str] = None
    level: Optional[int] = None


class SkillResponse(SkillBase):
    id: int

    class Config:
        from_attributes = True


# About schemas
class AboutBase(BaseModel):
    name: str
    title: str
    description: str
    highlights: Optional[List[Dict[str, Any]]] = None
    photo_url: Optional[str] = None


class AboutCreate(AboutBase):
    pass


class AboutUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[List[Dict[str, Any]]] = None
    photo_url: Optional[str] = None


class AboutResponse(AboutBase):
    id: int

    class Config:
        from_attributes = True


# Hero schemas
class HeroBase(BaseModel):
    name: str
    subtitle: str
    description: str


class HeroCreate(HeroBase):
    pass


class HeroUpdate(BaseModel):
    name: Optional[str] = None
    subtitle: Optional[str] = None
    description: Optional[str] = None


class HeroResponse(HeroBase):
    id: int

    class Config:
        from_attributes = True


# Contact schemas
class ContactBase(BaseModel):
    email: str
    linkedin: Optional[str] = None
    github: Optional[str] = None
    instagram: Optional[str] = None
    whatsapp: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    instagram_url: Optional[str] = None
    whatsapp_url: Optional[str] = None


class ContactCreate(ContactBase):
    pass


class ContactUpdate(BaseModel):
    email: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    instagram: Optional[str] = None
    whatsapp: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    instagram_url: Optional[str] = None
    whatsapp_url: Optional[str] = None


class ContactResponse(ContactBase):
    id: int

    class Config:
        from_attributes = True


# Blog schemas
class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    published_at: Optional[str] = None


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    published_at: Optional[str] = None


class BlogPostResponse(BlogPostBase):
    id: int

    class Config:
        from_attributes = True


# Resume schemas
class ResumeBase(BaseModel):
    experience: List[Dict[str, Any]]  # List of {title, company, period, description} objects
    education: List[Dict[str, Any]]  # List of {degree, school, period, description} objects
    certifications: Optional[List[str]] = None
    technical_skills: Optional[Dict[str, List[str]]] = None  # Object with categories as keys and skill arrays as values


class ResumeCreate(ResumeBase):
    pass


class ResumeUpdate(BaseModel):
    experience: Optional[List[Dict[str, Any]]] = None
    education: Optional[List[Dict[str, Any]]] = None
    certifications: Optional[List[str]] = None
    technical_skills: Optional[Dict[str, List[str]]] = None


class ResumeResponse(ResumeBase):
    id: int

    class Config:
        from_attributes = True

