import React from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaBriefcase, FaGraduationCap, FaAward, FaCode } from 'react-icons/fa'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'

const ResumePage = () => {
  const experience = [
    {
      title: 'Senior Software Engineer',
      company: 'Paytm, Noida',
      period: 'January 2020 - Present',
      description: [
        'Working as iOS Developer in Paytm Home Team',
        'Delivered various features in Paytm Homepage and Search',
        'Maintains Storefront module which acts as a client for other pages',
        'Worked in Paytm Cashback module in the past',
        'Worked in phoenix, alipay sdk which handles all the react pages inside app',
        'Handled Paytm Home UI revamps including Bottom Bar and Dark Mode support',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Samsung Research Institute, Noida',
      period: 'July 2017 - January 2020',
      description: [
        'Worked in Smart Things App which involves app maintenance and Bug fixing, Code Optimization',
        'Built Universal Guide Module in App: this feature shows us the content according to the type of content particular user has previously watched in TV',
        'We can also switch to that Particular content in TV, directly from our mobile phone',
      ],
    },
    {
      title: 'Internship',
      company: 'Coding Blocks, Delhi',
      period: 'July 2016 - September 2016',
      description: [
        'Web Development with HTML 5, CSS and Javascript',
      ],
    },
  ]

  const education = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      school: 'NIT Kurukshetra, Haryana',
      period: 'July 2013 - July 2017',
      description: '',
    },
    {
      degree: 'Intermediate',
      school: 'SVM Kotdwara',
      period: 'July 2012',
      description: '',
    },
  ]

  const certifications = [
    'iOS Development',
    'Swift Programming',
    'Data Structures and Algorithms',
    'App Development Best Practices',
  ]

  const technicalSkills = {
    'iOS Development': ['Swift', 'UIKit', 'SwiftUI', 'iOS Frameworks', 'Xcode'],
    'Frameworks & Architecture': ['Combine', 'Foundation', 'Core Data', 'MVVM', 'REST APIs'],
    'Development Tools': ['Git', 'Version Control', 'Code Optimization', 'Debugging', 'CI/CD'],
    'Other Skills': ['Data Structures', 'Algorithms', 'Problem Solving', 'Agile Development'],
  }

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
          <h1 className="heading text-gradient mb-4">Resume</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            iOS Developer with 7+ years of experience in building high-performance mobile applications
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <FaDownload className="mr-2" />
            Download PDF
          </Button>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <FaBriefcase className="text-3xl text-primary-600 dark:text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold dark:text-gray-100">Work Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <Card key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.title}</h3>
                      <p className="text-primary-600 dark:text-cyan-400 font-medium">{job.company}</p>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 mt-1 md:mt-0">{job.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {job.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <FaGraduationCap className="text-3xl text-primary-600 dark:text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold dark:text-gray-100">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{edu.degree}</h3>
                      <p className="text-primary-600 dark:text-cyan-400 font-medium">{edu.school}</p>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 mt-1 md:mt-0">{edu.period}</span>
                  </div>
                  {edu.description && <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>}
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Technical Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <FaCode className="text-3xl text-primary-600 dark:text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold dark:text-gray-100">Technical Skills</h2>
            </div>
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(technicalSkills).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* Certifications Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <FaAward className="text-3xl text-primary-600 dark:text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold dark:text-gray-100">Certifications</h2>
            </div>
            <Card>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-primary-600 dark:bg-cyan-400 rounded-full mr-3"></span>
                    {cert}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default ResumePage

