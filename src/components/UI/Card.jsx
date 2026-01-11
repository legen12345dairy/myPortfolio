import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', hoverable = true, ...props }) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-6 transition-shadow duration-300'
  const hoverClasses = hoverable ? 'hover:shadow-xl dark:hover:shadow-gray-900/70' : ''
  
  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card

