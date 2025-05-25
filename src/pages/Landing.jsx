import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Users, BookOpen, Video, MessageCircle, Award, Sparkles, Globe, Zap, Target, TrendingUp } from 'lucide-react'

const LuxuryLanding = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const heroVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const features = [
    { icon: Video, title: "Live Interactive Sessions", desc: "HD video with screen-share and real-time collaboration" },
    { icon: MessageCircle, title: "Smart Collaboration", desc: "Instant chat, whiteboards, and peer-to-peer notes" },
    { icon: BookOpen, title: "Premium Content Library", desc: "On-demand recordings and curated resources" },
    { icon: Award, title: "Expert-Led Courses", desc: "Industry professionals sharing real-world insights" }
  ]

  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "1.2K+", label: "Expert Tutors" },
    { number: "98%", label: "Success Rate" },
    { number: "500+", label: "Premium Courses" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-[#E040FB]/20 to-[#FF6F61]/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-gradient-to-r from-[#00F5D4]/20 to-[#E040FB]/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * -0.015,
          }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-[#E040FB] to-[#FF6F61] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            ConsultLearn
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-[#E040FB] transition-colors">Features</a>
            <a href="#about" className="hover:text-[#E040FB] transition-colors">About</a>
            <a href="#pricing" className="hover:text-[#E040FB] transition-colors">Pricing</a>
            <motion.button 
              className="px-6 py-2 bg-gradient-to-r from-[#E040FB] to-[#FF6F61] rounded-full font-medium hover:shadow-lg hover:shadow-[#E040FB]/25 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-[#E040FB]/30 rounded-full mb-8"
            variants={childVariants}
          >
            <Sparkles className="w-4 h-4 text-[#E040FB]" />
            <span className="text-sm font-medium">Premium Learning Experience</span>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6 leading-none"
            variants={childVariants}
          >
            <span className="bg-gradient-to-r from-[#E040FB] via-[#FF6F61] to-[#00F5D4] bg-clip-text text-transparent">
              Elevate
            </span>
            <br />
            Your Learning
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            variants={childVariants}
          >
            Transform your expertise into premium educational experiences. Join thousands of professionals creating, teaching, and learning through our cutting-edge platform.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={childVariants}
          >
            <motion.button 
              className="group relative px-8 py-4 bg-gradient-to-r from-[#E040FB] to-[#FF6F61] rounded-full font-bold text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Learning Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#FF6F61] to-[#E040FB]"
                initial={{ x: '100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button 
              className="group flex items-center gap-3 px-8 py-4 border-2 border-[#00F5D4] rounded-full font-semibold text-[#00F5D4] hover:bg-[#00F5D4] hover:text-black transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={childVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#E040FB] to-[#00F5D4] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Role Selection Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Choose Your <span className="bg-gradient-to-r from-[#FF6F61] to-[#E040FB] bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Whether you're learning, teaching, or building an educational empire, we've got you covered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Students",
                subtitle: "Learn & Grow",
                description: "Access premium courses, live sessions, and collaborative tools designed for accelerated learning.",
                icon: BookOpen,
                gradient: "from-[#E040FB] to-[#FF6F61]",
                href: "/student"
              },
              {
                title: "Tutors",
                subtitle: "Teach & Inspire",
                description: "Share your expertise with powerful teaching tools, live streaming, and student engagement features.",
                icon: Users,
                gradient: "from-[#00F5D4] to-[#E040FB]",
                href: "/tutor"
              },
              {
                title: "Consultancy Owners",
                subtitle: "Scale & Profit",
                description: "Build and monetize your educational platform with advanced analytics and business tools.",
                icon: TrendingUp,
                gradient: "from-[#FF6F61] to-[#00F5D4]",
                href: "/owner"
              }
            ].map((role, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-[#E040FB]/50 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${role.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                <p className="text-[#E040FB] font-semibold mb-4">{role.subtitle}</p>
                <p className="text-gray-300 mb-8 leading-relaxed">{role.description}</p>
                <motion.a
                  href={role.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${role.gradient} rounded-full font-semibold hover:shadow-lg transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Premium <span className="bg-gradient-to-r from-[#00F5D4] to-[#E040FB] bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of online education with cutting-edge tools and seamless interactions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#E040FB] to-[#FF6F61] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 bg-gradient-to-r from-[#E040FB]/20 to-[#FF6F61]/20 backdrop-blur-xl border border-[#E040FB]/30 rounded-3xl"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Ready to <span className="bg-gradient-to-r from-[#E040FB] to-[#00F5D4] bg-clip-text text-transparent">Transform</span> Your Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already building their success story with our platform.
            </p>
            <motion.button 
              className="px-12 py-4 bg-gradient-to-r from-[#E040FB] to-[#FF6F61] rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-[#E040FB]/25 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#E040FB] to-[#FF6F61] bg-clip-text text-transparent mb-4 md:mb-0">
            ConsultLearn
          </div>
          <div className="text-gray-400">
            © 2024 ConsultLearn. Elevating education worldwide.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LuxuryLanding