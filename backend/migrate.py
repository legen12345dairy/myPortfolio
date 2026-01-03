"""
Database migration script - Creates all tables.
Works with both SQLite (local) and PostgreSQL (production).
"""
from database import Base, engine
from models import Project, Skill, About, Hero, Contact, BlogPost, Resume
import sys


def create_tables():
    """Create all database tables"""
    print("=" * 60)
    print("Database Migration - Creating Tables")
    print("=" * 60)
    print()
    
    try:
        # Create all tables defined in models
        Base.metadata.create_all(bind=engine)
        
        print("✓ Successfully created/verified all tables:")
        print("  - projects")
        print("  - skills")
        print("  - about")
        print("  - hero")
        print("  - contact")
        print("  - blog_posts")
        print("  - resume")
        print()
        print("=" * 60)
        print("✓ Migration completed successfully!")
        print("=" * 60)
        print()
        print("Next steps:")
        print("  1. Run 'python seed.py' to populate the database with initial data")
        print("  2. Start the API server with 'uvicorn main:app --reload'")
        return 0
        
    except Exception as e:
        print(f"✗ Error creating tables: {e}")
        print()
        print("=" * 60)
        print("✗ Migration failed!")
        print("=" * 60)
        return 1


# Legacy functions for backward compatibility
def check_column_exists(table_name, column_name):
    """Check if a column exists in a table (SQLite only)"""
    from sqlalchemy import text
    try:
        with engine.connect() as conn:
            result = conn.execute(text(f"PRAGMA table_info({table_name})"))
            columns = [row[1] for row in result]
            return column_name in columns
    except:
        # Likely not SQLite, skip check
        return True


def check_table_exists(table_name):
    """Check if a table exists in the database (SQLite only)"""
    from sqlalchemy import text
    try:
        with engine.connect() as conn:
            result = conn.execute(text(
                "SELECT name FROM sqlite_master WHERE type='table' AND name=:table_name"
            ), {"table_name": table_name})
            return result.fetchone() is not None
    except:
        # Likely not SQLite, skip check
        return True


if __name__ == "__main__":
    exit_code = create_tables()
    sys.exit(exit_code)

