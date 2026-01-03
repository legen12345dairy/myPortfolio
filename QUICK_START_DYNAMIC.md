# Quick Start - Dynamic Portfolio

## Quick Setup (5 minutes)

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Edit .env with your settings
python seed.py
uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`
API docs: `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
# In root directory
# Create .env file with:
# VITE_API_URL=http://localhost:8000
# VITE_API_TIMEOUT=5000

npm install
npm run dev
```

Frontend runs on: `http://localhost:3000` (or port in vite.config.js)

## How It Works

- **Static First**: Site loads instantly with data from `src/data/`
- **API Update**: Background fetch updates with fresh data from API
- **Graceful Fallback**: If API fails, continues using static data

## Update Content

### Via API (Recommended)

1. Go to `http://localhost:8000/docs`
2. Use the interactive API to update:
   - Projects: `POST /api/projects`
   - Skills: `POST /api/skills`
   - About: `PUT /api/about`
   - Hero: `PUT /api/hero`
   - Contact: `PUT /api/contact`

### Via Static Files (Fallback)

Edit files in `src/data/` and rebuild frontend.

## Deployment

See `DYNAMIC_SETUP.md` for detailed deployment instructions.

## Key Files

- Backend API: `backend/main.py`
- Database models: `backend/models.py`
- Frontend API service: `src/services/api.js`
- Data hook: `src/hooks/usePortfolioData.js`
- Components: `src/components/Sections/`

