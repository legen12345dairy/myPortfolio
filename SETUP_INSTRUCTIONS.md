# Portfolio Website - Setup Instructions

## 🎉 Your portfolio website is ready!

All the files have been created and the project structure is complete. Follow these steps to get started:

## 📋 Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The website will open automatically at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## 🎨 Customization Guide

### Update Personal Information

#### 1. Hero Section
- Edit `src/components/Sections/Hero.jsx`
- Change "Your Name" to your actual name
- Update the title and description

#### 2. About Section
- Edit `src/components/Sections/About.jsx`
- Update the about text with your story
- Replace the placeholder photo with your actual image
- Update the statistics (years of experience, projects, etc.)

#### 3. Skills
- Edit `src/data/skills.js`
- Add, remove, or modify your skills
- Adjust skill levels (0-100%)

#### 4. Projects
- Edit `src/data/projects.js`
- Add your actual projects
- Update GitHub and live demo URLs
- Add project images in the Projects component

#### 5. Contact Information
- Update social links in `src/components/Layout/Footer.jsx`
- Update contact info in `src/components/Sections/Contact.jsx`

#### 6. Resume
- Replace `public/resume.pdf` with your actual resume
- Update resume details in `src/pages/ResumePage.jsx`

#### 7. Blog Posts
- Edit `src/utils/blogLoader.js` to add/modify blog posts
- Or create individual markdown files in `src/data/blog/` (requires additional setup)

### Styling Customization

#### Colors
Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: {
    // Your custom colors here
  }
}
```

#### Fonts
Edit `tailwind.config.js` to change fonts:

```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
}
```

Don't forget to add the font link in `index.html`

## 📁 Project Structure

```
portfolio/
├── public/              # Static files
│   ├── resume.pdf       # Your resume (replace this!)
│   └── favicon.ico      # Site icon
├── src/
│   ├── components/      # React components
│   │   ├── Layout/      # Header, Footer, Layout
│   │   ├── Sections/    # Hero, About, Skills, etc.
│   │   └── UI/          # Reusable UI components
│   ├── pages/           # Page components
│   ├── data/            # Data files (skills, projects)
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy
5. Done! Your site is live

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/portfolio/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## 🎯 Features Included

✅ Responsive design (mobile, tablet, desktop)
✅ Smooth scrolling navigation
✅ Animated sections with Framer Motion
✅ Blog system with 3 sample posts
✅ Skills showcase with progress bars
✅ Projects portfolio with filtering
✅ Contact form
✅ Resume page with PDF download
✅ SEO-friendly structure
✅ Fast loading with Vite
✅ Modern UI with Tailwind CSS

## 📝 Next Steps

1. **Customize Content**: Update all placeholder text with your information
2. **Add Images**: Replace placeholder images with your photos and project screenshots
3. **Update Resume**: Add your actual resume PDF
4. **Write Blog Posts**: Add your own blog content
5. **Test Responsiveness**: Check the site on different devices
6. **Deploy**: Choose a hosting platform and deploy your site
7. **Add Analytics**: Consider adding Google Analytics or similar
8. **SEO**: Update meta tags in `index.html`

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will use the next available port.

### Module Not Found Errors
Make sure you've run `npm install` to install all dependencies.

### Build Errors
Check that all imports are correct and files are in the right locations.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)

## 💡 Tips

- Keep your content up to date
- Add new blog posts regularly
- Update your projects as you complete them
- Test your contact form integration
- Consider adding a dark mode toggle
- Optimize images before adding them
- Use proper alt text for accessibility

## 🎨 Design Tips

- Use consistent colors throughout
- Maintain good contrast for readability
- Keep fonts limited (2-3 max)
- Use whitespace effectively
- Make CTAs (Call to Actions) prominent
- Ensure fast loading times
- Test on real devices

## 📧 Support

If you need help:
- Check the documentation of each library
- Search for solutions on Stack Overflow
- Review the code comments
- Test in different browsers

Good luck with your portfolio! 🚀

