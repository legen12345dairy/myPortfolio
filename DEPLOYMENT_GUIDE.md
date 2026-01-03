# Portfolio Deployment Guide - Render

This guide walks you through deploying both the backend API and frontend React app to Render.

## Overview

Your portfolio will be deployed as three services on Render:
1. **PostgreSQL Database** - Stores all portfolio data
2. **Backend API** - FastAPI service serving the REST API
3. **Frontend** - React/Vite static site

## Architecture

```
User Browser
    ↓
Frontend (portfolio-frontend.onrender.com)
    ↓ API Calls
Backend API (portfolio-api.onrender.com)
    ↓
PostgreSQL Database
```

## Prerequisites

1. GitHub account with your code pushed to a repository
2. Render account (free tier works fine)
3. Your code must be committed and pushed to GitHub

## Step 1: Push Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial deployment setup"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Connect Repository to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub account if not already connected
4. Select your portfolio repository
5. Render will auto-detect the `render.yaml` file

## Step 3: Configure Environment Variables

After Render creates the services, you need to configure environment variables:

### Backend API Service (portfolio-api)

The `DATABASE_URL` will be automatically connected from the database service.

You need to manually set:

1. Go to `portfolio-api` service in Render dashboard
2. Navigate to **Environment** tab
3. Add the following environment variable:

**CORS_ORIGINS**
- Key: `CORS_ORIGINS`
- Value: `https://portfolio-frontend.onrender.com` (or your actual frontend URL)
- Note: After the frontend deploys, you'll get the actual URL. Update this value.

### Frontend Service (portfolio-frontend)

1. Go to `portfolio-frontend` service in Render dashboard
2. Navigate to **Environment** tab
3. Add the following environment variable:

**VITE_API_URL**
- Key: `VITE_API_URL`
- Value: `https://portfolio-api.onrender.com` (or your actual backend URL)
- Note: Update this with your actual backend API URL after deployment

## Step 4: Update CORS After First Deploy

After both services deploy for the first time:

1. Note your frontend URL (e.g., `https://portfolio-frontend.onrender.com`)
2. Go to backend API service → Environment tab
3. Update `CORS_ORIGINS` with your actual frontend URL
4. Save and trigger a redeploy

Similarly, verify the frontend has the correct backend URL:

1. Note your backend URL (e.g., `https://portfolio-api.onrender.com`)
2. Go to frontend service → Environment tab
3. Update `VITE_API_URL` with your actual backend URL
4. Save and trigger a redeploy

## Step 5: Initialize Database

After the backend deploys successfully, you need to seed the database with initial data:

### Option 1: Using Render Shell
1. Go to backend API service in Render dashboard
2. Click **"Shell"** tab
3. Run the seed script:
```bash
cd backend
python seed.py
```

### Option 2: Using API Endpoints
You can also use the API endpoints directly to create data via POST requests using tools like Postman or curl.

## Service URLs

After deployment, you'll have:
- **Frontend**: `https://portfolio-frontend.onrender.com`
- **Backend API**: `https://portfolio-api.onrender.com`
- **API Docs**: `https://portfolio-api.onrender.com/docs`

## Environment Variables Summary

### Backend (portfolio-api)
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string (auto-configured) | `postgresql://...` |
| `CORS_ORIGINS` | Allowed frontend URLs | `https://portfolio-frontend.onrender.com` |

### Frontend (portfolio-frontend)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `https://portfolio-api.onrender.com` |

## Local Development

For local development, you can use SQLite and local servers:

### Backend
```bash
cd backend

# Create .env file with:
# DATABASE_URL=sqlite:///./portfolio.db
# CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Install dependencies
pip install -r requirements.txt

# Run migrations
python migrate.py

# Seed data
python seed.py

# Start server
uvicorn main:app --reload
```

### Frontend
```bash
# Create .env.local file with:
# VITE_API_URL=http://localhost:8000

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Troubleshooting

### Frontend can't reach backend
- **Issue**: CORS errors or connection refused
- **Solution**: 
  - Verify `VITE_API_URL` is set correctly in frontend environment
  - Verify `CORS_ORIGINS` includes your frontend URL in backend environment
  - Check both services are running

### Database connection errors
- **Issue**: Backend can't connect to PostgreSQL
- **Solution**:
  - Verify `DATABASE_URL` is configured in backend service
  - Check that database service is running
  - Review backend logs for specific error messages

### Blank page or 404 errors on frontend
- **Issue**: Routes not working
- **Solution**:
  - The `render.yaml` includes rewrite rules for SPA routing
  - Verify the build completed successfully
  - Check browser console for errors

### Cold starts (Free Tier)
- **Issue**: First request takes 30-60 seconds
- **Solution**: 
  - This is expected on free tier after 15 minutes of inactivity
  - Consider upgrading to paid tier for always-on services
  - Or use a service like UptimeRobot to ping your site periodically

### Changes not showing up
- **Issue**: Deployed but old version showing
- **Solution**:
  - Trigger manual deploy from Render dashboard
  - Clear browser cache
  - Check if build succeeded in Render logs

## Updating Your Portfolio

To update your portfolio after making changes:

1. Commit your changes locally:
```bash
git add .
git commit -m "Update portfolio content"
git push
```

2. Render will automatically detect the push and redeploy (if auto-deploy is enabled)
3. Or manually trigger a deploy from the Render dashboard

## Custom Domain (Optional)

To use a custom domain:

1. Go to your frontend service in Render
2. Navigate to **Settings** → **Custom Domain**
3. Add your domain (e.g., `www.yourname.com`)
4. Update your DNS records as instructed by Render
5. Update backend `CORS_ORIGINS` to include your custom domain

## Costs

- **Free Tier**: All three services can run on free tier
  - Database: 90 days free, then $7/month
  - Backend: Free (with cold starts)
  - Frontend: Free (with cold starts)

- **Paid Tier**: $7/month per service for always-on, no cold starts

## Support

- [Render Documentation](https://render.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## Security Best Practices

1. Never commit `.env` files to git
2. Use environment variables for all sensitive data
3. Rotate database credentials periodically
4. Keep dependencies updated
5. Enable HTTPS (Render provides this automatically)
6. Review Render access logs periodically

## Next Steps

After successful deployment:
- [ ] Verify all pages load correctly
- [ ] Test API endpoints via `/docs`
- [ ] Update portfolio content via API
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring/alerts (optional)
- [ ] Add analytics (optional)

