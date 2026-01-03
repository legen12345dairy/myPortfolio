# Deployment Checklist

Quick checklist for deploying your portfolio to Render.

## Pre-Deployment

- [ ] Code is committed to git
- [ ] Code is pushed to GitHub
- [ ] All local tests pass
- [ ] `render.yaml` is in repository root
- [ ] PostgreSQL support added to `backend/requirements.txt`
- [ ] Database connection code supports PostgreSQL

## Render Setup

- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Deploy via Blueprint (auto-detects `render.yaml`)
- [ ] Wait for all 3 services to deploy

## Environment Variables

### Backend API (portfolio-api)
- [ ] `DATABASE_URL` - Auto-configured from database
- [ ] `CORS_ORIGINS` - Set to frontend URL (e.g., `https://portfolio-frontend.onrender.com`)

### Frontend (portfolio-frontend)
- [ ] `VITE_API_URL` - Set to backend URL (e.g., `https://portfolio-api.onrender.com`)

## Post-Deployment

- [ ] All services show "Live" status
- [ ] Open frontend URL - verify it loads
- [ ] Open backend URL - should show `{"message": "Portfolio API is running"}`
- [ ] Open backend `/docs` - verify API documentation loads
- [ ] Update CORS_ORIGINS in backend with actual frontend URL
- [ ] Redeploy backend after CORS update
- [ ] Seed database with initial data (via Shell or API)
- [ ] Test frontend → backend API communication
- [ ] Verify all pages load correctly
- [ ] Test all features (projects, skills, about, contact, blog, resume)

## URLs to Save

After deployment, save these URLs:

```
Frontend: https://portfolio-frontend.onrender.com
Backend API: https://portfolio-api.onrender.com
API Docs: https://portfolio-api.onrender.com/docs
Database: Internal (not publicly accessible)
```

## Database Seeding

Run this in backend Shell on Render:

```bash
cd backend
python seed.py
```

Or use the API endpoints to manually create content.

## Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| CORS errors | Update `CORS_ORIGINS` in backend with correct frontend URL |
| Frontend can't reach API | Verify `VITE_API_URL` is set in frontend environment |
| Database errors | Check `DATABASE_URL` is configured and database is running |
| Blank frontend page | Check browser console, verify build succeeded |
| 404 on frontend routes | Rewrite rules in `render.yaml` handle this - check deployment logs |
| Slow first load | Expected on free tier (cold starts after 15 min inactivity) |

## Free Tier Notes

✅ **What's Free:**
- Backend and frontend services (with cold starts)
- 90 days of PostgreSQL database
- SSL certificates
- Custom domains

⚠️ **Limitations:**
- Services spin down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds
- Database free for 90 days, then $7/month

💡 **Tips:**
- Use UptimeRobot or similar to ping your site every 5-10 minutes to reduce cold starts
- Consider upgrading to paid tier ($7/month per service) for production use

## Ready to Deploy?

Follow the full guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

