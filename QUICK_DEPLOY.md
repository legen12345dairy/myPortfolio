# Quick Deploy to Render

Follow these steps to deploy your portfolio to Render in under 10 minutes.

## Prerequisites Checklist
- [ ] GitHub account
- [ ] Render account (sign up at [render.com](https://render.com))
- [ ] Code committed to a GitHub repository

## Step 1: Push to GitHub (2 minutes)

If you haven't already:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Render (3 minutes)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Blueprint**
3. Connect your GitHub repository
4. Render detects `render.yaml` automatically
5. Click **Apply** to create all services

Render will now create:
- ✅ PostgreSQL database
- ✅ Backend API service
- ✅ Frontend service

Wait 3-5 minutes for initial deployment.

## Step 3: Configure Environment Variables (2 minutes)

### Backend Service (portfolio-api)

1. Click on `portfolio-api` service
2. Go to **Environment** tab
3. Find `CORS_ORIGINS` variable
4. Wait for frontend to deploy, then update with your frontend URL
5. Click **Save Changes**

Example:
```
CORS_ORIGINS=https://portfolio-frontend.onrender.com
```

### Frontend Service (portfolio-frontend)

1. Click on `portfolio-frontend` service
2. Go to **Environment** tab
3. Find `VITE_API_URL` variable
4. Update with your backend API URL
5. Click **Save Changes**

Example:
```
VITE_API_URL=https://portfolio-api.onrender.com
```

**Note:** Both services need to redeploy after environment variable changes.

## Step 4: Seed Database (2 minutes)

1. Go to `portfolio-api` service in Render dashboard
2. Click **Shell** tab (top right)
3. Run these commands:

```bash
cd backend
python migrate.py
python seed.py
```

You should see confirmation messages.

## Step 5: Verify Deployment (1 minute)

Test your deployment:

1. **Frontend:** Visit `https://portfolio-frontend.onrender.com`
   - Should show your portfolio homepage
   
2. **Backend:** Visit `https://portfolio-api.onrender.com`
   - Should show: `{"message": "Portfolio API is running"}`
   
3. **API Docs:** Visit `https://portfolio-api.onrender.com/docs`
   - Should show interactive API documentation

## Done! 🎉

Your portfolio is now live on:
- **Frontend:** `https://portfolio-frontend.onrender.com`
- **Backend API:** `https://portfolio-api.onrender.com`

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Database is free for 90 days

### Keep Services Active (Optional)
Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your site every 5-10 minutes.

### Custom Domain (Optional)
1. Go to frontend service in Render
2. Settings → Custom Domain
3. Add your domain
4. Update DNS records as instructed
5. Update `CORS_ORIGINS` in backend to include your domain

## Troubleshooting

### "CORS error" in browser console
**Fix:** Update `CORS_ORIGINS` in backend with correct frontend URL

### Frontend shows blank page
**Fix:** Check browser console for errors, verify API URL is correct

### Database connection error
**Fix:** Verify database service is running, check logs in Render dashboard

### Changes not showing
**Fix:** Trigger manual deploy or wait for auto-deploy to complete

## Update Your Portfolio

After making changes:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Render will automatically redeploy (if auto-deploy is enabled).

## Need More Help?

- Full guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Checklist: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- Changes made: [DEPLOYMENT_CHANGES.md](DEPLOYMENT_CHANGES.md)
- Render docs: [render.com/docs](https://render.com/docs)

## Upgrade to Always-On (Optional)

For production use without cold starts:
- Upgrade each service to paid tier ($7/month per service)
- Go to service → Settings → Instance Type
- Select "Starter" or higher

Total cost for always-on: ~$21/month (database + backend + frontend)

