import React, { useState } from 'react'
import { motion } from 'framer-motion'
import BlogCard from '../components/UI/BlogCard'
import { getBlogPosts } from '../utils/blogLoader'

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState('All')
  const blogPosts = getBlogPosts()

  // Get all unique tags
  const allTags = ['All', ...new Set(blogPosts.flatMap(post => post.tags))]

  // Filter posts by selected tag
  const filteredPosts = selectedTag === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.tags.includes(selectedTag))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="section container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="heading text-gradient mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development and technology
          </p>
        </motion.div>

        {/* Tag Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 shadow-sm'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        {/* No Posts Message */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No blog posts found for this tag.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BlogPage

