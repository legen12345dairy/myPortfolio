"""
Script to seed the database with initial data from static files.
Run this after setting up the database to populate it with existing data.
"""
from database import SessionLocal, engine, Base
from models import Project, Skill, About, Hero, Contact, Resume
import json

# Import static data (we'll need to parse the JS files or convert them)
# For now, we'll define the data directly based on the existing files

# Projects data (from projects.js)
projects_data = [
    {
        "title": "Paytm Home",
        "category": "iOS Application",
        "description": "Handling Paytm homepage, left menu and global search and deliver various features along with these pages.",
        "technologies": ["Swift", "UIKit", "REST APIs", "MVVM"],
        "github_url": "",
        "live_url": "https://apps.apple.com/in/app/paytm-secure-payments-wallet/id473941634",
    },
    {
        "title": "Paytm Storefront Module",
        "category": "iOS Application",
        "description": "Maintained and enhanced Storefront module which acts as a client for other pages, handling navigation and content rendering.",
        "technologies": ["Swift", "UIKit", "Combine", "Modular Architecture"],
        "github_url": "",
        "live_url": "https://apps.apple.com/in/app/paytm-secure-payments-wallet/id473941634",
    },
    {
        "title": "Paytm Common UI",
        "category": "iOS Framework",
        "description": "Used for having smaller UI components which is used across Paytm other verticals.",
        "technologies": ["Swift", "UIKit", "SwiftUI", "Component Library"],
        "github_url": "",
        "live_url": "https://apps.apple.com/in/app/paytm-secure-payments-wallet/id473941634",
    },
    {
        "title": "Phoenix & Alipay SDK",
        "category": "iOS Framework",
        "description": "Worked on phoenix and alipay SDK which handles all the React pages inside the app, enabling hybrid app functionality.",
        "technologies": ["Swift", "React Native", "JavaScript Bridge", "SDK Development"],
        "github_url": "",
        "live_url": "https://apps.apple.com/in/app/paytm-secure-payments-wallet/id473941634",
    },
    {
        "title": "Universal Guide Module",
        "category": "iOS Feature",
        "description": "Built Universal Guide Module in Smart Things App that shows content based on user's TV viewing history and enables content switching between mobile and TV.",
        "technologies": ["Swift", "UIKit", "Content APIs", "Smart TV Integration"],
        "github_url": "",
        "live_url": "https://apps.apple.com/in/app/smartthings/id1222822904",
    },
]

# Skills data (from skills.js)
skills_data = [
    {"category": "iOS Development", "icon": "📱", "skill_name": "Swift", "level": 95},
    {"category": "iOS Development", "icon": "📱", "skill_name": "UIKit", "level": 92},
    {"category": "iOS Development", "icon": "📱", "skill_name": "SwiftUI", "level": 88},
    {"category": "iOS Development", "icon": "📱", "skill_name": "iOS Frameworks", "level": 90},
    {"category": "iOS Development", "icon": "📱", "skill_name": "Xcode", "level": 90},
    {"category": "Frameworks & Architecture", "icon": "🏗️", "skill_name": "Combine", "level": 85},
    {"category": "Frameworks & Architecture", "icon": "🏗️", "skill_name": "Foundation", "level": 92},
    {"category": "Frameworks & Architecture", "icon": "🏗️", "skill_name": "Core Data", "level": 80},
    {"category": "Frameworks & Architecture", "icon": "🏗️", "skill_name": "MVC/MVVM/VIPER", "level": 88},
    {"category": "Frameworks & Architecture", "icon": "🏗️", "skill_name": "REST APIs", "level": 90},
    {"category": "Development Tools", "icon": "🛠️", "skill_name": "Git & Version Control", "level": 90},
    {"category": "Development Tools", "icon": "🛠️", "skill_name": "Code Optimization", "level": 87},
    {"category": "Development Tools", "icon": "🛠️", "skill_name": "App Performance", "level": 85},
    {"category": "Development Tools", "icon": "🛠️", "skill_name": "Debugging & Testing", "level": 88},
    {"category": "Development Tools", "icon": "🛠️", "skill_name": "CI/CD", "level": 80},
    {"category": "Other Skills", "icon": "💡", "skill_name": "Data Structures & Algorithms", "level": 85},
    {"category": "Other Skills", "icon": "💡", "skill_name": "Problem Solving", "level": 90},
    {"category": "Other Skills", "icon": "💡", "skill_name": "App Maintenance", "level": 88},
    {"category": "Other Skills", "icon": "💡", "skill_name": "Code Review", "level": 85},
    {"category": "Other Skills", "icon": "💡", "skill_name": "Agile Development", "level": 82},
]

# About data
about_data = {
    "name": "Mayank Rawat",
    "title": "Senior iOS Developer",
    "description": """I'm a Senior iOS Developer with over 7 years of experience crafting high-performance 
mobile applications. I specialize in building scalable, user-centric iOS solutions 
that serve millions of users, with expertise in Swift, UIKit, SwiftUI, and modern iOS architectures.

Currently at Paytm since January 2020, I've developed key features for Homepage, Search, 
and Storefront modules. Prior to that, I worked at Samsung Research Institute (2017-2020), 
building the Universal Guide Module for the Smart Things App.

I'm passionate about writing clean, maintainable code and following iOS best practices. 
When I'm not coding, you can find me exploring new places and traveling.""",
    "highlights": [
        {"number": "7+", "label": "Years Experience"},
        {"number": "2", "label": "Major Companies"},
    ],
    "photo_url": "/photo.jpg",
}

# Hero data
hero_data = {
    "name": "Mayank Rawat",
    "subtitle": "iOS Developer by Profession, Explorer by Passion",
    "description": """Experienced iOS Developer with a track record of delivering polished, high-performance apps. 
Skilled in Swift and experienced with iOS frameworks such as UIKit, SwiftUI, and Foundation. 
I love to travel and explore new places.""",
}

# Contact data
contact_data = {
    "email": "rawat.mayank1234@gmail.com",
    "linkedin": "linkedin.com/in/mayank-rawat-0585a010b",
    "github": "github.com/legen12345dairy",
    "instagram": "_mayank_rawat",
    "whatsapp": "9643764341",
    "phone": "+91-9643764341",
    "linkedin_url": "https://www.linkedin.com/in/mayank-rawat-0585a010b/",
    "github_url": "https://github.com/legen12345dairy",
    "instagram_url": "https://www.instagram.com/_mayank_rawat",
    "whatsapp_url": "https://wa.me/919643764341",
}

# Resume data
resume_data = {
    "experience": [
        {
            "title": "Senior Software Engineer",
            "company": "Paytm, Noida",
            "period": "January 2020 - Present",
            "description": [
                "Working as iOS Developer in Paytm Home Team",
                "Delivered various features in Paytm Homepage and Search",
                "Maintains Storefront module which acts as a client for other pages",
                "Worked in Paytm Cashback module in the past",
                "Worked in phoenix, alipay sdk which handles all the react pages inside app",
                "Handled Paytm Home UI revamps including Bottom Bar and Dark Mode support",
            ],
        },
        {
            "title": "Software Engineer",
            "company": "Samsung Research Institute, Noida",
            "period": "July 2017 - January 2020",
            "description": [
                "Worked in Smart Things App which involves app maintenance and Bug fixing, Code Optimization",
                "Built Universal Guide Module in App: this feature shows us the content according to the type of content particular user has previously watched in TV",
                "We can also switch to that Particular content in TV, directly from our mobile phone",
            ],
        },
        {
            "title": "Internship",
            "company": "Coding Blocks, Delhi",
            "period": "July 2016 - September 2016",
            "description": [
                "Web Development with HTML 5, CSS and Javascript",
            ],
        },
    ],
    "education": [
        {
            "degree": "Bachelor of Engineering in Computer Science",
            "school": "NIT Kurukshetra, Haryana",
            "period": "July 2013 - July 2017",
            "description": "",
        },
        {
            "degree": "Intermediate",
            "school": "SVM Kotdwara",
            "period": "July 2012",
            "description": "",
        },
    ],
    "certifications": [
        "iOS Development",
        "Swift Programming",
        "Data Structures and Algorithms",
        "App Development Best Practices",
    ],
    "technical_skills": {
        "iOS Development": ["Swift", "UIKit", "SwiftUI", "iOS Frameworks", "Xcode"],
        "Frameworks & Architecture": ["Combine", "Foundation", "Core Data", "MVVM", "REST APIs"],
        "Development Tools": ["Git", "Version Control", "Code Optimization", "Debugging", "CI/CD"],
        "Other Skills": ["Data Structures", "Algorithms", "Problem Solving", "Agile Development"],
    },
}


def seed_database():
    """Seed the database with initial data"""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Clear existing data (optional - comment out if you want to keep existing data)
        db.query(Project).delete()
        db.query(Skill).delete()
        db.query(About).delete()
        db.query(Hero).delete()
        db.query(Contact).delete()
        db.query(Resume).delete()

        # Seed Projects
        for project in projects_data:
            db_project = Project(**project)
            db.add(db_project)

        # Seed Skills
        for skill in skills_data:
            db_skill = Skill(**skill)
            db.add(db_skill)

        # Seed About
        db_about = About(**about_data)
        db.add(db_about)

        # Seed Hero
        db_hero = Hero(**hero_data)
        db.add(db_hero)

        # Seed Contact
        db_contact = Contact(**contact_data)
        db.add(db_contact)

        # Seed Resume
        db_resume = Resume(**resume_data)
        db.add(db_resume)

        db.commit()
        print("Database seeded successfully!")
        print(f"  - {len(projects_data)} projects")
        print(f"  - {len(skills_data)} skills")
        print("  - 1 about entry")
        print("  - 1 hero entry")
        print("  - 1 contact entry")
        print("  - 1 resume entry")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

