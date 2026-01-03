import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import BlogPage from './pages/BlogPage'
import BlogPost from './pages/BlogPost'
import ResumePage from './pages/ResumePage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

