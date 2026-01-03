# Dynamic Portfolio Setup Guide

This guide explains how to set up the dynamic portfolio with API backend.

## Architecture

The portfolio uses a progressive enhancement pattern:
1. Frontend loads with static data (instant display)
2. Background fetch attempts to get fresh data from API
3. If API succeeds, UI updates with fresh data
4. If API fails, continues using static data (graceful degradation)

## Backend Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=sqlite:///./portfolio.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Seed the Database

```bash
python seed.py
```

This will populate the database with your existing static data.

### 4. Run the Backend Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## Frontend Setup

### 1. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=5000
```

For production, set `VITE_API_URL` to your deployed backend URL.

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Run the Frontend

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` (or the port configured in vite.config.js)

## How It Works

### Data Flow

1. **Initial Load**: Components render immediately with static data from `src/data/`
2. **API Check**: Background fetch to API endpoint (non-blocking)
3. **Success**: Update state with API data, cache response
4. **Failure**: Continue using static data, log warning (non-blocking)

### API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills
- `GET /api/about` - Get about section content
- `GET /api/hero` - Get hero section content
- `GET /api/contact` - Get contact information
- `GET /api/blog` - Get blog posts

All endpoints support CRUD operations (POST, PUT, DELETE) for managing content.

### Updating Content

You can update content in two ways:

1. **Via API** (Recommended for production):
   - Use the API endpoints directly (POST/PUT requests)
   - Use tools like Postman, curl, or your own admin interface
   - Changes reflect immediately on the website

2. **Via Static Files** (Fallback):
   - Edit files in `src/data/`
   - Rebuild and redeploy frontend
   - Used when API is unavailable

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `cd backend && pip install -r requirements.txt`
4. Set start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `DATABASE_URL`: SQLite file path (or use PostgreSQL for production)
   - `CORS_ORIGINS`: Your frontend URL(s), comma-separated

### Frontend

1. Set `VITE_API_URL` environment variable to your backend URL
2. Build: `npm run build`
3. Deploy the `dist/` folder to your hosting service

## Testing

### Test API Availability

The frontend will automatically fall back to static data if the API is unavailable. To test:

1. Start backend: `cd backend && uvicorn main:app`
2. Start frontend: `npm run dev`
3. Check browser console - should see API data loading
4. Stop backend - frontend should continue working with static data

### Verify Data Updates

1. Update data via API (e.g., using `/docs` interface)
2. Refresh frontend - should see updated data
3. Clear cache or wait 5 minutes for cache to expire

## Troubleshooting

### API Not Connecting

- Check `VITE_API_URL` is set correctly
- Verify backend is running
- Check CORS settings in backend `.env`
- Check browser console for errors

### Data Not Updating

- API responses are cached for 5 minutes
- Clear browser cache or wait for cache to expire
- Check API is returning updated data

### Database Issues

- Ensure `portfolio.db` file exists in `backend/` directory
- Run `python seed.py` to recreate database
- Check file permissions

