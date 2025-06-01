import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Video, BookOpen, MessageCircle, Globe, Star, X, Gift, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { scrollY } = useScroll();
  
  // Scroll-based transforms for dynamic animations
  const cloudX1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const cloudX2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const cloudX3 = useTransform(scrollY, [0, 1500], [0, 300]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const languages = [
    { 
      name: "English", 
      flag: "🇺🇸", 
      country: "USA",
      gradient: "from-red-100 to-blue-100"
    },
    { 
      name: "Spanish", 
      flag: "🇪🇸", 
      country: "Spain",
      gradient: "from-red-100 to-yellow-100"
    },
    { 
      name: "German", 
      flag: "🇩🇪", 
      country: "Germany",
      gradient: "from-red-100 to-yellow-100"
    },
    { 
      name: "Korean", 
      flag: "🇰🇷", 
      country: "South Korea",
      gradient: "from-blue-100 to-red-100"
    },
    { 
      name: "French", 
      flag: "🇫🇷", 
      country: "France",
      gradient: "from-blue-100 to-red-100"
    },
    { 
      name: "Japanese", 
      flag: "🇯🇵", 
      country: "Japan",
      gradient: "from-red-100 to-white"
    },
    { 
      name: "Italian", 
      flag: "🇮🇹", 
      country: "Italy",
      gradient: "from-green-100 to-red-100"
    },
    { 
      name: "Chinese", 
      flag: "🇨🇳", 
      country: "China",
      gradient: "from-red-100 to-yellow-100"
    }
  ];

  const features = [
    {
      icon: Video,
      title: "Live Language Classes",
      desc: "Interactive video calls with native speakers and expert tutors from around the world.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Smart Learning Resources",
      desc: "AI-powered study materials, interactive exercises, and personalized learning paths.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Star,
      title: "HD Class Recordings",
      desc: "Never miss a lesson! Access high-quality recordings with interactive transcripts.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Global Study Groups",
      desc: "Join study circles with learners worldwide and practice together in real-time.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Globe,
      title: "Cultural Immersion",
      desc: "Learn beyond language - discover culture, traditions, and local expressions.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: MessageCircle,
      title: "24/7 Language Exchange",
      desc: "Chat with native speakers anytime through our integrated messaging platform.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  // Floating cloud variants with scroll interaction
  const floatingCloudVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-gray-900 font-sans overflow-hidden relative">
      {/* Dynamic Scrolling Clouds */}
      <motion.div 
        className="fixed top-20 left-0 opacity-60 z-0 pointer-events-none"
        style={{ x: cloudX1 }}
        variants={floatingCloudVariants}
        animate="animate"
      >
        <div className="w-80 h-40 bg-white rounded-full blur-lg shadow-lg"></div>
      </motion.div>
      
      <motion.div 
        className="fixed top-60 right-0 opacity-50 z-0 pointer-events-none"
        style={{ x: cloudX2 }}
        variants={floatingCloudVariants}
        animate="animate"
      >
        <div className="w-64 h-32 bg-white rounded-full blur-md shadow-md"></div>
      </motion.div>

      <motion.div 
        className="fixed top-40 left-1/2 opacity-40 z-0 pointer-events-none"
        style={{ x: cloudX3 }}
        variants={floatingCloudVariants}
        animate="animate"
      >
        <div className="w-96 h-48 bg-white rounded-full blur-xl shadow-xl"></div>
      </motion.div>

      {/* Special Offer Popup */}
      {showPopup && (
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div 
            className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-2xl shadow-2xl max-w-lg text-center relative border-4 border-yellow-300"
            initial={{ scale: 0.5, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4"
            >
              <Gift className="w-16 h-16 mx-auto text-yellow-600" />
            </motion.div>
            
            <h3 className="text-3xl font-bold mb-4 text-orange-800">🎉 Limited Time Offer!</h3>
            <div className="mb-6">
              <p className="text-xl font-semibold text-orange-700 mb-2">Get 50% OFF Your First Month!</p>
              <p className="text-gray-700">Plus FREE access to premium resources and 1-on-1 tutoring session</p>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Offer expires in 24 hours</span>
              <Sparkles className="w-5 h-5 text-yellow-600" />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPopup(false)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all shadow-lg"
              >
                Claim Offer Now!
              </button>
              <button 
                onClick={() => setShowPopup(false)}
                className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <motion.header 
        className="bg-white/95 backdrop-blur-md shadow-lg py-6 px-8 flex justify-between items-center sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center">
          <motion.h1 
            className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex items-center">
              L<motion.span 
                className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 flex items-center justify-center text-white mx-0.5"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >a</motion.span>gzy
            </span>
          </motion.h1>
        </div>
        <div className="flex items-center gap-4">
          <motion.button 
            className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="py-20 px-8 text-center relative z-10"
        style={{ y: backgroundY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 30px rgba(255,255,255,0.8)",
                "0 0 20px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Language Learning
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Made Magical
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-white/95 max-w-3xl mx-auto mb-12 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Join over 100,000+ learners in our global community. Master any language through live classes, 
            AI-powered resources, and cultural immersion experiences.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button 
              className="px-10 py-4 bg-white text-blue-600 text-lg rounded-full hover:bg-blue-50 shadow-2xl font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button 
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg rounded-full hover:from-purple-700 hover:to-pink-700 shadow-2xl font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Language Selection */}
      <section className="py-20 px-8 bg-white/95 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h3 
            className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Choose Your Language Adventure
          </motion.h3>
          <motion.p 
            className="text-center text-gray-600 mb-12 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore cultures and master languages with native speakers from around the world
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {languages.map((lang, idx) => (
              <motion.button 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)" 
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br ${lang.gradient} border-2 border-white/50
                  ${selectedLanguage === lang.name ? 'ring-4 ring-blue-500 bg-blue-100' : ''}`}
                onClick={() => setSelectedLanguage(lang.name)}
              >
                <motion.span 
                  className="text-5xl mb-3"
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: idx * 0.2 
                  }}
                >
                  {lang.flag}
                </motion.span>
                <span className="font-bold text-lg text-gray-800">{lang.name}</span>
                <span className="text-sm text-gray-600 mt-1">{lang.country}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-blue-50 to-purple-50 relative z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{ y: useTransform(scrollY, [0, 1000], [0, -200]) }}
        >
          <div className="w-96 h-96 bg-blue-300 rounded-full blur-3xl absolute top-20 -left-20"></div>
          <div className="w-80 h-80 bg-purple-300 rounded-full blur-3xl absolute bottom-20 -right-20"></div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h3 
            className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Lagzy?
          </motion.h3>
          <motion.p 
            className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Experience the future of language learning with cutting-edge technology and human connection
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-white/50"
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className={`w-16 h-16 mx-auto bg-gradient-to-r ${feature.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ x: useTransform(scrollY, [0, 1000], [0, 100]) }}
        >
          <div className="w-96 h-96 bg-white rounded-full blur-3xl absolute top-10 left-10"></div>
          <div className="w-80 h-80 bg-white rounded-full blur-2xl absolute bottom-10 right-10"></div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h3 
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Success Stories That Inspire
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <p className="font-semibold text-lg">Sarah K.</p>
                  <p className="text-white/80 text-sm">🇺🇸 → 🇪🇸 Spanish Fluent in 6 months</p>
                </div>
              </div>
              <p className="text-lg italic mb-4 leading-relaxed">"The immersive experience and supportive community transformed my Spanish from zero to conversational in just 6 months. The cultural insights made all the difference!"</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <p className="font-semibold text-lg">Michael T.</p>
                  <p className="text-white/80 text-sm">🇺🇸 → 🇰🇷 Korean Advanced Level</p>
                </div>
              </div>
              <p className="text-lg italic mb-4 leading-relaxed">"I've tried countless apps and platforms, but Lagzy's personalized approach and live interaction with native speakers is unmatched. Now I'm working in Seoul!"</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 text-center bg-gradient-to-br from-white to-blue-50 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Your Language Journey Starts Now
          </motion.h3>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Join thousands of successful language learners who chose Lagzy. Whether you're preparing for exams, 
            advancing your career, or exploring new cultures - we're here to guide you every step of the way.
          </p>
          <motion.button 
            className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl rounded-full font-bold hover:from-blue-700 hover:to-purple-700 shadow-2xl"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              background: "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                "0 10px 30px rgba(59, 130, 246, 0.3)",
                "0 15px 40px rgba(139, 92, 246, 0.4)",
                "0 10px 30px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Start Your Free 14-Day Trial
          </motion.button>
          <p className="text-sm text-gray-500 mt-4">No credit card required • Cancel anytime • Full access to all features</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 bg-gray-900 text-white/90 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <motion.h4 
                className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Lagzy
              </motion.h4>
              <p className="text-gray-300 leading-relaxed">Empowering global communication through innovative language learning experiences and cultural exchange.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Languages</h4>
              <ul className="space-y-3">
                {languages.slice(0, 4).map((lang, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                      <span>{lang.flag}</span>
                      {lang.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-purple-400">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-pink-400">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} Lagzy. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, idx) => (
                <motion.a 
                  key={social}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-gray-600 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all"></div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;