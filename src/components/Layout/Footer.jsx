import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { usePortfolioData } from '../../hooks/usePortfolioData'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { data: contactData } = usePortfolioData('contact')

  const socialLinks = [
    { 
      icon: FaEnvelope, 
      url: contactData?.email ? `mailto:${contactData.email}` : 'mailto:rawat.mayank1234@gmail.com', 
      label: 'Email' 
    },
    { 
      icon: FaWhatsapp, 
      url: contactData?.whatsapp_url || 'https://wa.me/919643764341', 
      label: 'WhatsApp' 
    },
    { 
      icon: FaLinkedin, 
      url: contactData?.linkedin_url || 'https://www.linkedin.com/in/mayank-rawat-0585a010b/', 
      label: 'LinkedIn' 
    },
    { 
      icon: FaGithub, 
      url: contactData?.github_url || 'https://github.com/legen12345dairy', 
      label: 'GitHub' 
    },
    { 
      icon: FaInstagram, 
      url: contactData?.instagram_url || 'https://www.instagram.com/_mayank_rawat', 
      label: 'Instagram' 
    },
  ].filter(link => link.url) // Filter out any empty URLs

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Mayank Rawat</h3>
            <p className="text-gray-400">
              Building innovative solutions and sharing knowledge through code.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="hover:text-primary-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-primary-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/resume" className="hover:text-primary-400 transition-colors">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Mayank Rawat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

