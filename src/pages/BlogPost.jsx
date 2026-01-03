import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { FaArrowLeft, FaCalendar, FaClock } from 'react-icons/fa'
import { getBlogPostBySlug } from '../utils/blogLoader'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getBlogPostBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="section container-custom max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </button>
        </motion.div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <span className="flex items-center">
              <FaCalendar className="mr-2" />
              {post.date}
            </span>
            <span className="flex items-center">
              <FaClock className="mr-2" />
              {post.readTime} min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-8 md:p-12"
        >
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">{children}</ol>
                ),
                code: ({ inline, children }) =>
                  inline ? (
                    <code className="bg-gray-100 text-primary-600 px-2 py-1 rounded font-mono text-sm">
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4">
                      {children}
                    </code>
                  ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-700 my-4">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Navigation to other posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center justify-center btn-primary"
          >
            View All Posts
          </Link>
        </motion.div>
      </article>
    </div>
  )
}

export default BlogPost

