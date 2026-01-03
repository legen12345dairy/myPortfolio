import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', hoverable = true, ...props }) => {
  const baseClasses = 'bg-white rounded-lg shadow-md p-6 transition-shadow duration-300'
  const hoverClasses = hoverable ? 'hover:shadow-xl' : ''
  
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

