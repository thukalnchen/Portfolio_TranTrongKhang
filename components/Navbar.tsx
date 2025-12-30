'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/70 backdrop-blur-xl shadow-lg shadow-emerald-500/5 py-2' 
            : 'bg-transparent py-4'
        }`}
        style={{ zIndex: 100 }}
      >
        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500"
          style={{ width: progressWidth }}
        />

        <div className="container-custom">
          <div className="flex justify-between items-center gap-4">
            {/* Logo */}
            <motion.a
              href="#home"
              className="relative group flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl md:text-2xl font-bold gradient-text relative z-10">
                ThuKaLn
              </span>
              {/* Logo Glow */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`relative px-4 lg:px-5 py-2 text-xs lg:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                        isActive ? 'text-black' : 'text-gray-400 hover:text-white'
                      }`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: isActive ? 1 : 1.05 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Social Links & CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {/* Social Links */}
              <div className="flex items-center gap-1">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-all"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>

              {/* Resume Button */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm text-black"
                style={{ background: 'linear-gradient(135deg, #00FF87, #60EFFF)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 135, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload size={16} />
                Resume
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-all"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl lg:hidden"
            style={{ zIndex: 99 }}
          >
            {/* Aurora Background in Mobile Menu */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col justify-center items-center h-full">
              <nav className="space-y-4 text-center">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`block text-3xl font-bold py-3 transition-colors ${
                        isActive ? 'gradient-text' : 'text-gray-400 hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Mobile Social Links */}
              <motion.div 
                className="flex gap-6 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/10 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </motion.div>

              {/* Mobile Resume Button */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-medium text-black"
                style={{ background: 'linear-gradient(135deg, #00FF87, #60EFFF)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsOpen(false)}
              >
                <FiDownload size={18} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
