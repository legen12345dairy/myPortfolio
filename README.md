# Portfolio Website

A modern, full-stack portfolio website with dynamic content management built with React, Vite, FastAPI, and PostgreSQL.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 Fast loading with Vite
- 📝 Blog system with Markdown support
- 💼 Projects showcase
- 🎯 Skills section
- 📄 Resume section with PDF download
- 📧 Contact information
- 🔌 REST API for dynamic content management
- 💾 PostgreSQL database for production
- 🔄 SQLite for local development

## Tech Stack

### Frontend
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Blog**: Markdown files with react-markdown
- **Icons**: React Icons
- **Animations**: Framer Motion

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (production) / SQLite (development)
- **ORM**: SQLAlchemy
- **Server**: Uvicorn

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- pip (Python package manager)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

4. Set up backend database
```bash
cd backend
python migrate.py
python seed.py  # Optional: Add sample data
cd ..
```

5. Start the backend server (in one terminal)
```bash
cd backend
uvicorn main:app --reload
```

6. Start the frontend development server (in another terminal)
```bash
npm run dev
```

7. Open your browser and visit `http://localhost:3000`

## Project Structure

```
portfolio/
├── backend/            # FastAPI backend
│   ├── main.py        # API server and endpoints
│   ├── models.py      # Database models
│   ├── schemas.py     # Pydantic schemas
│   ├── database.py    # Database configuration
│   ├── migrate.py     # Database migrations
│   ├── seed.py        # Sample data seeding
│   └── requirements.txt
├── public/            # Static files
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── data/          # Static data files
│   ├── services/      # API service layer
│   ├── hooks/         # Custom React hooks
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── render.yaml        # Render deployment config
├── package.json
└── vite.config.js
```

## Customization

### Update Personal Information

You can manage your portfolio content in two ways:

#### Option 1: Using the API
Use the REST API endpoints to dynamically update content:
- Visit `http://localhost:8000/docs` for API documentation
- Use POST/PUT endpoints to update projects, skills, about, hero, contact, blog posts, and resume

#### Option 2: Using Static Data (Fallback)
Edit the data files directly:
1. Edit skills in `src/data/skills.js`
2. Add projects in `src/data/projects.js`
3. Create blog posts in `src/data/blog/` as Markdown files
4. Add your resume PDF to `public/resume.pdf`

### Customize Styling

- Colors: Edit `tailwind.config.js`
- Global styles: Edit `src/styles/index.css`
- Component styles: Use Tailwind classes in component files

## Build for Production

### Frontend
```bash
npm run build
```
The build output will be in the `dist/` directory.

### Backend
The backend is production-ready and will run with:
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## Deployment

### Recommended: Render (Full-Stack)

Deploy both frontend and backend to Render with PostgreSQL:

1. **Quick Start**: See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
2. **Full Guide**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

The `render.yaml` file is already configured for easy deployment:
- PostgreSQL database
- FastAPI backend
- React frontend

### Alternative Options

#### Frontend Only (Static)
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

#### Backend Hosting
- Railway
- Fly.io
- Heroku
- AWS/GCP/Azure

#### Database
- Render PostgreSQL
- Supabase
- Railway PostgreSQL
- AWS RDS

## API Documentation

The backend provides a REST API for managing portfolio content:

- **API Base URL**: `http://localhost:8000` (local) or `https://your-api.onrender.com` (production)
- **Interactive Docs**: Visit `/docs` for Swagger UI documentation
- **OpenAPI Spec**: Visit `/openapi.json` for the OpenAPI specification

### Available Endpoints

- `/api/projects` - Manage projects
- `/api/skills` - Manage skills
- `/api/about` - Manage about section
- `/api/hero` - Manage hero section
- `/api/contact` - Manage contact information
- `/api/blog` - Manage blog posts
- `/api/resume` - Manage resume data
- `/api/health` - Health check endpoint

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed API documentation.

## Environment Variables

### Frontend
Create `.env.local` file in the root directory:
```
VITE_API_URL=http://localhost:8000
```

### Backend
Create `.env` file in the `backend/` directory:
```
DATABASE_URL=sqlite:///./portfolio.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

For production, use PostgreSQL connection string for `DATABASE_URL`.

## License

MIT License - feel free to use this for your own portfolio!

