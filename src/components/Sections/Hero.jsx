import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'
import Button from '../UI/Button'
import { usePortfolioData } from '../../hooks/usePortfolioData'

const Hero = () => {
  const { data: heroData } = usePortfolioData('hero')
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!heroData) {
    return null
  }

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 py-20">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <span className="text-gradient">{heroData.name}</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroData.subtitle}
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {heroData.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const projectsSection = document.getElementById('projects')
                if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <button
            onClick={scrollToAbout}
            className="text-gray-500 hover:text-primary-600 transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <FaArrowDown size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

