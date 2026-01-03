# Portfolio API Documentation

Complete guide to all API endpoints and how they work.

## Table of Contents
1. [API Architecture](#api-architecture)
2. [Base URL & Authentication](#base-url--authentication)
3. [Projects API](#projects-api)
4. [Skills API](#skills-api)
5. [About API](#about-api)
6. [Hero API](#hero-api)
7. [Contact API](#contact-api)
8. [Blog API](#blog-api)
9. [Health Check](#health-check)
10. [How It Works Internally](#how-it-works-internally)

---

## API Architecture

The API is built with **FastAPI** (Python) and uses:
- **SQLite** database for data storage
- **SQLAlchemy** ORM for database operations
- **Pydantic** for request/response validation
- **CORS** enabled for frontend communication

### Request Flow

```
Client Request → FastAPI Router → Pydantic Validation → Database Query → Response
```

---

## Base URL & Authentication

- **Base URL**: `http://localhost:8000` (development)
- **API Docs**: `http://localhost:8000/docs` (interactive Swagger UI)
- **Authentication**: None (public API for portfolio)

---

## Projects API

Manage portfolio projects (iOS apps, frameworks, features, etc.)

### 1. Get All Projects
```http
GET /api/projects
```

**Query Parameters:**
- `skip` (optional, default: 0) - Number of records to skip (pagination)
- `limit` (optional, default: 100) - Maximum number of records to return

**Response:**
```json
[
  {
    "id": 1,
    "title": "Paytm Home",
    "category": "iOS Application",
    "description": "Handling Paytm homepage...",
    "technologies": ["Swift", "UIKit", "REST APIs", "MVVM"],
    "github_url": "",
    "live_url": "https://apps.apple.com/..."
  }
]
```

**How it works:**
1. Opens database session
2. Queries all projects from `projects` table
3. Applies pagination (skip/limit)
4. Returns list of projects

---

### 2. Get Single Project
```http
GET /api/projects/{project_id}
```

**Path Parameters:**
- `project_id` (required) - Integer ID of the project

**Response:**
```json
{
  "id": 1,
  "title": "Paytm Home",
  "category": "iOS Application",
  "description": "...",
  "technologies": ["Swift", "UIKit"],
  "github_url": "",
  "live_url": "https://..."
}
```

**Error:** Returns 404 if project not found

**How it works:**
1. Queries database for project with matching ID
2. If found, returns project data
3. If not found, raises HTTPException with 404 status

---

### 3. Create Project
```http
POST /api/projects
```

**Request Body:**
```json
{
  "title": "New Project",
  "category": "iOS Application",
  "description": "Project description here",
  "technologies": ["Swift", "UIKit"],
  "github_url": "https://github.com/...",
  "live_url": "https://apps.apple.com/..."
}
```

**Response:** Returns created project with generated `id`

**How it works:**
1. Validates request body using `ProjectCreate` schema
2. Creates new `Project` database model instance
3. Adds to database session
4. Commits transaction
5. Refreshes to get generated ID
6. Returns created project

---

### 4. Update Project
```http
PUT /api/projects/{project_id}
```

**Path Parameters:**
- `project_id` (required) - Integer ID of the project

**Request Body:** (all fields optional - only send fields to update)
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response:** Returns updated project

**How it works:**
1. Finds project by ID
2. If not found, returns 404
3. Extracts only provided fields from request (`exclude_unset=True`)
4. Updates project fields using `setattr()`
5. Commits changes
6. Returns updated project

---

### 5. Delete Project
```http
DELETE /api/projects/{project_id}
```

**Path Parameters:**
- `project_id` (required) - Integer ID of the project

**Response:**
```json
{
  "message": "Project deleted successfully"
}
```

**How it works:**
1. Finds project by ID
2. If not found, returns 404
3. Deletes from database
4. Commits transaction
5. Returns success message

---

## Skills API

Manage skills and expertise categories

### 1. Get All Skills
```http
GET /api/skills
```

**Response:**
```json
[
  {
    "id": 1,
    "category": "iOS Development",
    "icon": "📱",
    "skill_name": "Swift",
    "level": 95
  }
]
```

**Note:** Skills are stored individually. Frontend groups them by category.

---

### 2. Get Single Skill
```http
GET /api/skills/{skill_id}
```

**Path Parameters:**
- `skill_id` (required) - Integer ID of the skill

---

### 3. Create Skill
```http
POST /api/skills
```

**Request Body:**
```json
{
  "category": "iOS Development",
  "icon": "📱",
  "skill_name": "SwiftUI",
  "level": 90
}
```

---

### 4. Update Skill
```http
PUT /api/skills/{skill_id}
```

**Request Body:** (all fields optional)
```json
{
  "level": 95
}
```

---

### 5. Delete Skill
```http
DELETE /api/skills/{skill_id}
```

---

## About API

Manage the "About Me" section content (single record)

### 1. Get About
```http
GET /api/about
```

**Response:**
```json
{
  "id": 1,
  "name": "Mayank Rawat",
  "title": "Senior iOS Developer",
  "description": "I'm a Senior iOS Developer...",
  "highlights": [
    {"number": "7+", "label": "Years Experience"},
    {"number": "2", "label": "Major Companies"}
  ]
}
```

**Note:** Only one "About" record exists. Returns 404 if not found.

---

### 2. Create About
```http
POST /api/about
```

**Request Body:**
```json
{
  "name": "Mayank Rawat",
  "title": "Senior iOS Developer",
  "description": "...",
  "highlights": [...]
}
```

**Special Behavior:** Deletes existing about record before creating new one (ensures only one record)

---

### 3. Update About
```http
PUT /api/about
```

**Request Body:** (all fields optional)
```json
{
  "description": "Updated description"
}
```

---

## Hero API

Manage the hero section (landing page header) - single record

### 1. Get Hero
```http
GET /api/hero
```

**Response:**
```json
{
  "id": 1,
  "name": "Mayank Rawat",
  "subtitle": "iOS Developer by Profession, Explorer by Passion",
  "description": "Experienced iOS Developer..."
}
```

---

### 2. Create Hero
```http
POST /api/hero
```

**Special Behavior:** Deletes existing hero before creating (single record)

---

### 3. Update Hero
```http
PUT /api/hero
```

---

## Contact API

Manage contact information - single record

### 1. Get Contact
```http
GET /api/contact
```

**Response:**
```json
{
  "id": 1,
  "email": "rawat.mayank1234@gmail.com",
  "linkedin": "linkedin.com/in/...",
  "github": "github.com/mayankrawat",
  "twitter": "@mayankrawat",
  "linkedin_url": "https://www.linkedin.com/...",
  "github_url": "https://github.com/...",
  "twitter_url": "https://twitter.com/..."
}
```

---

### 2. Create Contact
```http
POST /api/contact
```

**Special Behavior:** Deletes existing contact before creating (single record)

---

### 3. Update Contact
```http
PUT /api/contact
```

---

## Blog API

Manage blog posts

### 1. Get All Blog Posts
```http
GET /api/blog
```

**Query Parameters:**
- `skip` (optional, default: 0) - Pagination offset
- `limit` (optional, default: 100) - Maximum records

---

### 2. Get Single Blog Post
```http
GET /api/blog/{post_id}
```

**Path Parameters:**
- `post_id` (required) - Integer ID of the blog post

---

### 3. Create Blog Post
```http
POST /api/blog
```

**Request Body:**
```json
{
  "title": "My First Blog Post",
  "slug": "my-first-blog-post",
  "excerpt": "Short description",
  "content": "Full blog post content...",
  "published_at": "2024-01-15T10:00:00Z"
}
```

**Note:** `slug` must be unique

---

### 4. Update Blog Post
```http
PUT /api/blog/{post_id}
```

---

### 5. Delete Blog Post
```http
DELETE /api/blog/{post_id}
```

---

## Health Check

### Root Endpoint
```http
GET /
```

**Response:**
```json
{
  "message": "Portfolio API is running"
}
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy"
}
```

---

## How It Works Internally

### 1. Database Session Management

Every endpoint uses a `get_db()` dependency that:
- Creates a database session
- Yields it to the endpoint function
- Automatically closes the session after the request (even if error occurs)

```python
def get_db():
    db = SessionLocal()
    try:
        yield db  # Give session to endpoint
    finally:
        db.close()  # Always close, even on error
```

### 2. Request Validation

FastAPI automatically validates requests using Pydantic schemas:
- **Create schemas** (`ProjectCreate`, etc.) - All fields required
- **Update schemas** (`ProjectUpdate`, etc.) - All fields optional
- Invalid data returns 422 validation error with details

### 3. Response Models

All endpoints use `response_model` to:
- Validate response data
- Generate OpenAPI/Swagger documentation
- Ensure consistent response format

### 4. Error Handling

- **404 Not Found**: When resource doesn't exist
- **422 Validation Error**: When request body is invalid
- **500 Internal Server Error**: Database or server errors

### 5. CORS (Cross-Origin Resource Sharing)

Configured to allow requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (Alternative port)
- Any origins specified in `CORS_ORIGINS` environment variable

### 6. Database Models → API Response

Flow:
1. **Database Model** (SQLAlchemy) - `Project` class
2. **ORM Query** - `db.query(Project).all()`
3. **Pydantic Schema** - `ProjectResponse` validates and formats
4. **JSON Response** - FastAPI serializes to JSON

### 7. Update Logic

Update endpoints use partial updates:
```python
update_data = project.dict(exclude_unset=True)  # Only provided fields
for field, value in update_data.items():
    setattr(db_project, field, value)  # Update only those fields
```

This allows updating just one field without sending all fields.

---

## Example Usage

### Using curl

```bash
# Get all projects
curl http://localhost:8000/api/projects

# Create a project
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New App",
    "category": "iOS Application",
    "description": "My new app",
    "technologies": ["Swift", "SwiftUI"],
    "live_url": "https://apps.apple.com/..."
  }'

# Update a project
curl -X PUT http://localhost:8000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete a project
curl -X DELETE http://localhost:8000/api/projects/1
```

### Using JavaScript/Fetch

```javascript
// Get projects
const response = await fetch('http://localhost:8000/api/projects');
const projects = await response.json();

// Create project
const newProject = await fetch('http://localhost:8000/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New App',
    category: 'iOS Application',
    description: 'My new app',
    technologies: ['Swift', 'SwiftUI'],
    live_url: 'https://apps.apple.com/...'
  })
});
```

### Using the Interactive Docs

1. Visit `http://localhost:8000/docs`
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters/body
5. Click "Execute"
6. See response

---

## Summary

- **6 Resource Types**: Projects, Skills, About, Hero, Contact, Blog
- **CRUD Operations**: Create, Read, Update, Delete (where applicable)
- **Single Record Resources**: About, Hero, Contact (only one record each)
- **Multiple Record Resources**: Projects, Skills, Blog (can have many)
- **Validation**: Automatic via Pydantic schemas
- **Error Handling**: Proper HTTP status codes
- **No Authentication**: Public API for portfolio

All endpoints follow RESTful conventions and return JSON responses.

