'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp, FiCode, FiCoffee } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FiGithub className="w-5 h-5" />, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FiLinkedin className="w-5 h-5" />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FiMail className="w-5 h-5" />, href: 'mailto:your@email.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const stats = [
    { icon: <FiCode />, value: '15+', label: 'Projects' },
    { icon: <FiCoffee />, value: '∞', label: 'Coffee Cups' },
  ];

  return (
    <footer 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Aurora gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />
      
      {/* Background with aurora effect */}
      <div className="absolute inset-0 bg-[var(--surface)]/80 backdrop-blur-md" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom py-12 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">
              <span className="gradient-text">ThuKaLn</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting digital experiences with passion and precision. 
              Always learning, always building.
            </p>
            
            {/* Mini Stats */}
            <div className="flex gap-6 pt-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[var(--primary)]">{stat.icon}</span>
                  <span className="text-white font-semibold">{stat.value}</span>
                  <span className="text-gray-500 text-sm">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold">Quick Links</h4>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--primary)] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, type: 'spring' }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg glass-aurora flex items-center justify-center text-gray-400 hover:text-[var(--primary)] transition-colors group relative overflow-hidden"
                  aria-label={link.label}
                >
                  <span className="relative z-10">{link.icon}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              ))}
            </div>
            
            {/* Status */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for opportunities
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-400 flex items-center gap-2 text-sm">
            Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FiHeart className="text-[var(--accent)] fill-[var(--accent)]" />
            </motion.span>
            and lots of 
            <FiCoffee className="text-[var(--secondary)]" />
            by{' '}
            <span className="gradient-text font-semibold">ThuKaLn</span>
          </p>
          
          <p className="text-gray-500 text-sm">
            © {currentYear} All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        style={{ opacity }}
        animate={{ 
          y: isVisible ? 0 : 100,
          opacity: isVisible ? 1 : 0 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full glass-aurora flex items-center justify-center text-[var(--primary)] shadow-lg shadow-[var(--primary)]/20 z-50 group"
        aria-label="Back to top"
      >
        <FiArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
    </footer>
  );
};

export default Footer;
