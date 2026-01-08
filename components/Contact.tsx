'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiCheck, FiClock, FiMessageCircle } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'khanggialata@gmail.com',
      href: 'mailto:khanggialata@gmail.com',
      gradient: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Ho Chi Minh City, Vietnam',
      href: '#',
      gradient: 'from-cyan-500 to-purple-500',
    },
    {
      icon: FiClock,
      title: 'Response Time',
      value: 'Within 24 hours',
      href: '#',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/thukalnchen', label: 'GitHub', color: '#ffffff' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/tran-trong-khang/', label: 'LinkedIn', color: '#0A66C2' },
    { icon: FaFacebookF, href: 'https://www.facebook.com/thukalnchin', label: 'Facebook', color: '#1877F2' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28" style={{ zIndex: 10 }}>
      {/* Aurora Section Divider */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500" />
      
      {/* Background Aurora Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 -left-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{
                background: 'rgba(236, 72, 153, 0.1)',
                border: '1px solid rgba(236, 72, 153, 0.2)',
                color: 'rgb(236, 72, 153)',
              }}
            >
              Let's Connect
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              I'm always open to discussing new opportunities, projects, or partnerships.
              Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Contact Info Card */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative group" data-cursor-hover>
                {/* Aurora Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 group-hover:border-white/20 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500">
                      <FiMessageCircle size={24} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">
                      Contact Info
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {contactInfo.map((info, index) => (
                      <motion.a
                        key={info.title}
                        href={info.href}
                        className="flex items-center gap-3 p-3 bg-black/30 rounded-xl hover:bg-black/40 transition-all group/item border border-white/5 hover:border-white/10"
                        whileHover={{ x: 3, scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <motion.div 
                          className={`p-2.5 bg-gradient-to-r ${info.gradient} rounded-lg flex-shrink-0`}
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <info.icon size={18} className="text-black" />
                        </motion.div>
                        <div className="min-w-0">
                          <p className="text-gray-500 text-xs">{info.title}</p>
                          <p className="text-white font-medium text-sm truncate">{info.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-gray-500 text-sm mb-3">Connect with me</p>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group/social"
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon 
                            size={22} 
                            className="text-gray-400 group-hover/social:text-white transition-colors"
                          />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="mt-5 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      <span className="text-emerald-400 font-medium">Available for work</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="relative group" data-cursor-hover>
                {/* Aurora Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 group-hover:border-white/20 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-2">Send Me a Message</h3>
                  <p className="text-gray-500 mb-6">Fill out the form below and I'll get back to you soon.</p>
                  
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="py-16 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center"
                        >
                          <FiCheck size={40} className="text-black" />
                        </motion.div>
                        <h4 className="text-2xl font-bold mb-2 gradient-text">Message Sent!</h4>
                        <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="form"
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Name Field */}
                          <div className="relative">
                            <motion.label 
                              htmlFor="name" 
                              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                                focusedField === 'name' || formData.name
                                  ? '-top-2.5 text-xs text-emerald-400 bg-[#0a0a0f] px-2'
                                  : 'top-3.5 text-gray-500'
                              }`}
                            >
                              Your Name
                            </motion.label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="w-full px-4 py-3.5 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all text-white"
                            />
                          </div>

                          {/* Email Field */}
                          <div className="relative">
                            <motion.label 
                              htmlFor="email" 
                              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                                focusedField === 'email' || formData.email
                                  ? '-top-2.5 text-xs text-cyan-400 bg-[#0a0a0f] px-2'
                                  : 'top-3.5 text-gray-500'
                              }`}
                            >
                              Your Email
                            </motion.label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="w-full px-4 py-3.5 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:bg-black/40 transition-all text-white"
                            />
                          </div>
                        </div>

                        {/* Message Field */}
                        <div className="relative">
                          <motion.label 
                            htmlFor="message" 
                            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                              focusedField === 'message' || formData.message
                                ? '-top-2.5 text-xs text-purple-400 bg-[#0a0a0f] px-2'
                                : 'top-3.5 text-gray-500'
                            }`}
                          >
                            Your Message
                          </motion.label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            required
                            rows={6}
                            className="w-full px-4 py-3.5 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all text-white resize-none"
                          />
                          <div className="absolute bottom-3 right-3 text-xs text-gray-600">
                            {formData.message.length}/500
                          </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full relative px-8 py-4 rounded-xl font-semibold text-black overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                          style={{ background: 'linear-gradient(135deg, #00FF87, #60EFFF)' }}
                          whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: '0 20px 40px rgba(0, 255, 135, 0.3)' }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        >
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                          
                          <span className="relative flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                <FiSend size={20} />
                                Send Message
                              </>
                            )}
                          </span>
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
