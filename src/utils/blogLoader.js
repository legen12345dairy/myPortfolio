// Blog post loader utility
// This will dynamically import markdown files and parse them

export const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-react',
    title: 'Getting Started with React: A Beginner\'s Guide',
    date: 'December 15, 2023',
    readTime: 5,
    excerpt: 'Learn the fundamentals of React and start building your first application. This guide covers components, props, state, and more.',
    tags: ['React', 'JavaScript', 'Web Development'],
    content: `# Getting Started with React: A Beginner's Guide

React has become one of the most popular JavaScript libraries for building user interfaces. In this guide, we'll explore the fundamentals and help you get started with your first React application.

## What is React?

React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications. It allows developers to create reusable UI components and manage the state of their applications efficiently.

## Key Concepts

### Components

Components are the building blocks of any React application. They are reusable pieces of code that return HTML elements.

\`\`\`jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

### Props

Props (short for properties) are how you pass data from parent components to child components.

\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

### State

State is a way to manage data that changes over time in your component.

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

## Getting Started

1. Install Node.js and npm
2. Create a new React app with \`create-react-app\`
3. Start building your components
4. Learn hooks like useState and useEffect

## Conclusion

React is a powerful library that makes building interactive UIs easier. Start with the basics, practice regularly, and you'll be building amazing applications in no time!`
  },
  {
    id: 2,
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques for 2024',
    date: 'January 2, 2024',
    readTime: 8,
    excerpt: 'Explore the latest CSS features and techniques that will make your web designs more efficient and beautiful.',
    tags: ['CSS', 'Web Design', 'Frontend'],
    content: `# Modern CSS Techniques for 2024

CSS has evolved significantly over the years. Let's explore some modern techniques that will improve your workflow and create better user experiences.

## Container Queries

Container queries allow you to apply styles based on the size of a container rather than the viewport.

\`\`\`css
@container (min-width: 700px) {
  .card {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
\`\`\`

## CSS Grid and Flexbox

Master these layout systems for creating responsive designs without media queries.

### Grid Example

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

## Custom Properties (CSS Variables)

Use CSS custom properties for maintainable theming.

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
}
\`\`\`

## Conclusion

These modern CSS techniques will help you write cleaner, more maintainable code. Experiment with them in your next project!`
  },
  {
    id: 3,
    slug: 'building-scalable-applications',
    title: 'Building Scalable Web Applications',
    date: 'January 10, 2024',
    readTime: 10,
    excerpt: 'Best practices and architectural patterns for building web applications that scale.',
    tags: ['Architecture', 'Best Practices', 'Scalability'],
    content: `# Building Scalable Web Applications

Scalability is crucial for modern web applications. Let's explore key principles and patterns for building applications that grow with your user base.

## Architectural Patterns

### Microservices

Break your application into smaller, independent services that can be deployed and scaled independently.

### Event-Driven Architecture

Use events to communicate between different parts of your system asynchronously.

## Database Considerations

### Indexing

Proper database indexing can dramatically improve query performance.

### Caching Strategies

Implement caching at multiple levels:
- Browser caching
- CDN caching
- Application-level caching
- Database query caching

## Code Organization

### Modular Design

Keep your code modular and follow the Single Responsibility Principle.

\`\`\`javascript
// Good: Each module has a single responsibility
import { userService } from './services/userService';
import { authService } from './services/authService';
\`\`\`

## Performance Optimization

1. Lazy loading components
2. Code splitting
3. Image optimization
4. Minimize bundle size

## Conclusion

Building scalable applications requires careful planning and following best practices. Start with these principles and adapt them to your specific needs.`
  }
];

export const getBlogPosts = () => {
  return blogPosts;
};

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

