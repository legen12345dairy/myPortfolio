import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaClock } from 'react-icons/fa'

const BlogCard = ({ post }) => {
  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-900/70 transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="p-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center">
              <FaCalendar className="mr-2" />
              {post.date}
            </span>
            <span className="flex items-center">
              <FaClock className="mr-2" />
              {post.readTime} min read
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags && post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default BlogCard

