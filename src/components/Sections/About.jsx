import React from 'react'
import { motion } from 'framer-motion'
import Card from '../UI/Card'
import { usePortfolioData } from '../../hooks/usePortfolioData'

const About = () => {
  const { data: aboutData } = usePortfolioData('about')
  
  if (!aboutData) {
    return null
  }

  const highlights = aboutData.highlights || [
    {
      number: '7+',
      label: 'Years Experience',
    },
    {
      number: '2',
      label: 'Major Companies',
    }
  ]

  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading text-gradient">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="subheading mb-4">Hello!</h3>
            <div className="space-y-4 text-gray-600">
              {aboutData.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>
          </motion.div>

          {/* Image/Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            {aboutData.photo_url ? (
              <img 
                src={aboutData.photo_url} 
                alt={aboutData.name}
                className="w-full max-w-md aspect-square object-cover rounded-2xl shadow-xl"
              />
            ) : (
              <div className="w-full max-w-md aspect-square bg-gradient-to-br from-primary-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-6xl font-bold shadow-xl">
                <span className="opacity-50">Your Photo</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {item.number}
                </div>
                <div className="text-gray-600">{item.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

