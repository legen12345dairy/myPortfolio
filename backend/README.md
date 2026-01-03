# Portfolio Backend API

FastAPI backend for the portfolio website.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Seed the database with initial data:
```bash
python seed.py
```

4. Run the development server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## Deployment on Render

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `DATABASE_URL`: SQLite file path (or use PostgreSQL for production)
   - `CORS_ORIGINS`: Your frontend URL(s)

## API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

Similar endpoints for:
- `/api/skills`
- `/api/about`
- `/api/hero`
- `/api/contact`
- `/api/blog`
- `/api/resume`

## Database Migrations

If you need to update the database schema without losing data, use the migration script:

```bash
python migrate.py
```

This will:
- Add new columns to existing tables
- Create new tables if they don't exist
- Preserve all existing data

After running migrations, run `python seed.py` to populate any new tables with initial data.

