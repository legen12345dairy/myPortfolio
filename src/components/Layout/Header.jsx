import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: 'Home', sectionId: 'home' },
    { name: 'About', sectionId: 'about' },
    { name: 'Skills', sectionId: 'skills' },
    { name: 'Projects', sectionId: 'projects' },
    { name: 'Contact', sectionId: 'contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
            <Link
              to="/blog"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              to="/resume"
              className="btn-primary"
            >
              Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
            <div className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-left text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                Blog
              </Link>
              <Link
                to="/resume"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary inline-block text-center"
              >
                Resume
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

