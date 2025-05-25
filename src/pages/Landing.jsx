import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    Users, Award, Video, PenTool, Brain, Shield, FileText, UserCheck,
    GraduationCap, ChevronRight, ChevronDown, Sparkles, Star, ArrowRight, Play, Rocket, Briefcase
} from 'lucide-react'
import ReactCountryFlag from "react-country-flag";

const testimonials = [
    {
        name: "Dr. Sarah Chen",
        role: "Consultant",
        content: "This platform revolutionized my consultancy teaching. The live features and analytics help me give the best to my clients worldwide.",
        avatar: "👩‍💼"
    },
    {
        name: "Michael Rodriguez",
        role: "Language Specialist",
        content: "The real-time tools make language classes easy—even for complete beginners. My students love the seamless experience!",
        avatar: "👨‍🏫"
    },
    {
        name: "Emma Thompson",
        role: "IELTS Coach",
        content: "Organized resources and student analytics let me focus on teaching. My students' pass rates have gone up!",
        avatar: "👩‍🎓"
    }
];

const features = [
    {
        icon: Video,
        title: "Live Interactive Sessions",
        desc: "HD video, screen sharing, and real-time chat for professional online classes.",
        color: "from-[#E040FB] to-[#FF6F61]"
    },
    {
        icon: PenTool,
        title: "Collaborative Whiteboard",
        desc: "Teach with whiteboards—draw, annotate, and explain live.",
        color: "from-[#00F5D4] to-[#E040FB]"
    },
    {
        icon: Brain,
        title: "Smart Course Builder",
        desc: "Easily create, update, and organize all your lessons and materials.",
        color: "from-[#FF6F61] to-[#00F5D4]"
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        desc: "All data is encrypted and protected by strict compliance standards.",
        color: "from-[#E040FB] to-[#00F5D4]"
    },
    {
        icon: FileText,
        title: "Resource Library",
        desc: "Upload, store, and share unlimited learning materials and recordings.",
        color: "from-[#00F5D4] to-[#FF6F61]"
    },
    {
        icon: UserCheck,
        title: "Student Analytics",
        desc: "Track progress, attendance, and engagement with beautiful dashboards.",
        color: "from-[#FF6F61] to-[#E040FB]"
    }
];

// Use countryCode for flags, or icon for non-country programs
const languages = [
    { name: "German Language", students: "2,500+", countryCode: "DE", level: "A1 to C2", color: "bg-gradient-to-r from-[#E040FB] to-[#FF6F61]" },
    { name: "Spanish Language", students: "3,200+", countryCode: "ES", level: "Beginner to Advanced", color: "bg-gradient-to-r from-[#00F5D4] to-[#E040FB]" },
    {
        name: "IELTS Preparation", students: "1,800+",
        icon: Award, level: "Band 6.0 to 9.0", color: "bg-gradient-to-r from-[#FF6F61] to-[#00F5D4]"
    },
    { name: "Business English", students: "2,100+", icon: Briefcase, level: "Professional Level", color: "bg-gradient-to-r from-[#E040FB] to-[#00F5D4]" },
    { name: "French Language", students: "1,900+", countryCode: "FR", level: "A1 to C1", color: "bg-gradient-to-r from-[#00F5D4] to-[#FF6F61]" },
    { name: "Italian Language", students: "1,400+", countryCode: "IT", level: "Beginner to Intermediate", color: "bg-gradient-to-r from-[#FF6F61] to-[#E040FB]" }
];

const stats = [
    { number: "10,000+", label: "Active Learners", icon: Users },
    { number: "95%", label: "Completion Rate", icon: Award },
    { number: "4.9/5", label: "Platform Rating", icon: Star },
    { number: "24/7", label: "Support", icon: Sparkles }
];

const Landing = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1E1E1E] via-[#2A1A2A] to-[#1A2A2A] text-white overflow-hidden">
            {/* Navigation */}
            <motion.nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur border-b border-[#E040FB]/20"
                initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.7 }}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#E040FB] to-[#FF6F61] bg-clip-text text-transparent flex items-center gap-2">
                        <GraduationCap className="w-8 h-8 text-[#E040FB]" /> ConsultancyLearn
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#platform" className="hover:text-[#E040FB] font-medium">Platform</a>
                        <a href="#languages" className="hover:text-[#E040FB] font-medium">Languages</a>
                        <a href="#testimonials" className="hover:text-[#E040FB] font-medium">Reviews</a>
                        <motion.button className="px-6 py-2 bg-gradient-to-r from-[#E040FB] to-[#FF6F61] rounded-lg font-semibold hover:shadow-lg"
                            whileHover={{ scale: 1.05 }}>Login</motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Hero */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-28">
                <motion.div className="max-w-4xl mx-auto text-center"
                    initial="hidden" animate={isHeroInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0, y: 80 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}>
                    <motion.div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#E040FB]/20 to-[#FF6F61]/20 border border-[#E040FB]/30 rounded-full mb-8 backdrop-blur-xl"
                        whileHover={{ scale: 1.05 }}>
                        <Award className="w-5 h-5 text-[#FF6F61]" />
                        <span className="font-semibold">Premium Learning Experience</span>
                        <Sparkles className="w-5 h-5 text-[#00F5D4]" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-[#E040FB] via-[#FF6F61] to-[#00F5D4] bg-clip-text text-transparent">
                        Next-Gen Consultancy Platform
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Modern consultancy made simple. Create, manage, and deliver your services in style—trusted by 10,000+ learners globally.
                    </p>
                    <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <motion.button
                            className="group relative px-10 py-5 bg-gradient-to-r from-[#E040FB] to-[#FF6F61] rounded-lg font-semibold text-xl overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.05, y: -3 }}>
                            <span className="flex items-center gap-3">Start Free Trial <ArrowRight className="w-6 h-6" /></span>
                        </motion.button>
                        <motion.button className="group flex items-center gap-3 px-8 py-5 border-2 border-[#00F5D4] rounded-lg font-semibold text-[#00F5D4] hover:bg-[#00F5D4] hover:text-black transition-all text-lg"
                            whileHover={{ scale: 1.05, y: -2 }}>
                            <Play className="w-6 h-6" /> Watch Demo
                        </motion.button>
                    </motion.div>
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#E040FB] to-[#00F5D4] rounded-lg flex items-center justify-center">
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-[#E040FB] to-[#00F5D4] bg-clip-text text-transparent">{stat.number}</div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                {/* Scroll indicator */}
                <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ChevronDown className="w-8 h-8 text-[#E040FB]" />
                </motion.div>
            </section>

            {/* Language Programs */}
            <section id="languages" className="relative py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            Popular <span className="bg-gradient-to-r from-[#FF6F61] to-[#E040FB] bg-clip-text text-transparent">Language Programs</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Master international languages or prepare for tests with certified professionals.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {languages.map((language, idx) => (
                            <motion.div key={idx}
                                className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-[#E040FB]/50 cursor-pointer overflow-hidden transition-all"
                                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                whileHover={{ scale: 1.02, y: -5 }}>
                                <div className="flex items-center gap-4 mb-6">
                                    {/* Show flag with react-country-flag, or icon for non-country */}
                                    {language.countryCode ? (
                                        <ReactCountryFlag
                                            countryCode={language.countryCode}
                                            svg
                                            style={{ fontSize: "2em", borderRadius: "4px" }}
                                        />
                                    ) : language.icon ? (
                                        <language.icon className="w-8 h-8 text-[#FF6F61]" />
                                    ) : null}
                                    <div>
                                        <h3 className="text-2xl font-bold group-hover:text-[#E040FB] transition-colors">{language.name}</h3>
                                        <p className="text-gray-400">{language.level}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Users className="w-5 h-5 text-[#00F5D4]" />
                                    <span className="text-[#00F5D4] font-semibold">{language.students} enrolled</span>
                                </div>
                                <motion.div className={`px-6 py-3 ${language.color} rounded-lg font-semibold flex items-center justify-center gap-2`}
                                    whileHover={{ scale: 1.05 }}>
                                    Explore Program <ChevronRight className="w-4 h-4" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Features */}
            <section id="platform" className="relative py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            Modern <span className="bg-gradient-to-r from-[#00F5D4] to-[#E040FB] bg-clip-text text-transparent">Platform Features</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Built for consultants and students who demand more—every feature designed to make online learning effortless and effective.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div key={idx}
                                className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-[#E040FB]/50 overflow-hidden transition-all"
                                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                whileHover={{ scale: 1.02, y: -5 }}>
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#E040FB]">{feature.title}</h3>
                                <p className="text-gray-300 text-lg">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="relative py-32 px-6 bg-gradient-to-br from-[#1A2A2A] to-[#2A1A2A]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            Real Students, <span className="bg-gradient-to-r from-[#E040FB] to-[#00F5D4] bg-clip-text text-transparent">Real Results</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">See what students and consultants are saying!</p>
                    </div>
                    <div className="relative">
                        <motion.div
                            className="bg-white/5 border border-[#E040FB]/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto"
                            key={currentTestimonial}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
                            <div className="flex justify-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-[#FF6F61] fill-current" />
                                ))}
                            </div>
                            <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
                                "{testimonials[currentTestimonial].content}"
                            </p>
                            <div className="text-[#E040FB] font-bold text-lg">
                                {testimonials[currentTestimonial].name}
                            </div>
                            <div className="text-gray-400">
                                {testimonials[currentTestimonial].role}
                            </div>
                        </motion.div>
                        {/* Indicators */}
                        <div className="flex justify-center mt-8 gap-3">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`w-3 h-3 rounded-full ${idx === currentTestimonial ? 'bg-[#E040FB] scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                                    onClick={() => setCurrentTestimonial(idx)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-32 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative p-12 bg-gradient-to-r from-[#E040FB]/20 via-[#FF6F61]/20 to-[#00F5D4]/20 border border-[#E040FB]/30 rounded-3xl"
                    >
                        <div className="text-6xl mb-6">🚀</div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            Ready to <span className="bg-gradient-to-r from-[#E040FB] to-[#00F5D4] bg-clip-text text-transparent">Level Up</span> Your Learning?
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of learners winning with our platform. <span className="text-[#FF6F61] font-bold">Your future self will thank you!</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <motion.button
                                className="px-12 py-5 bg-gradient-to-r from-[#E040FB] to-[#FF6F61] rounded-full font-black text-xl hover:shadow-2xl flex items-center gap-3"
                                whileHover={{ scale: 1.05, y: -3 }}>
                                Start FREE Trial <Rocket className="w-6 h-6" />
                            </motion.button>
                            <div className="text-gray-400 text-sm">
                                💳 No credit card required
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Footer */}
            <footer className="relative py-16 px-6 border-t border-white/10 bg-black/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="text-3xl font-black bg-gradient-to-r from-[#E040FB] to-[#FF6F61] bg-clip-text text-transparent mb-4">
                            ConsultancyLearn
                        </div>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                            Modern consultancy learning for everyone. Built by experts, trusted by students worldwide.
                            <span className="text-[#00F5D4]"> Learn. Grow. Achieve.</span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h4 className="font-bold text-[#E040FB] mb-4">Platform</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Live Sessions</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#FF6F61] mb-4">Subjects</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Languages</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Business</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Test Prep</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Consultancy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#00F5D4] mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">24/7 Chat</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#E040FB] mb-4">Connect</h4>
                            <div className="flex gap-4 justify-center md:justify-start">
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-[#E040FB] to-[#FF6F61] rounded-full flex items-center justify-center hover:scale-110 transition-transform text-xl">📱</a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-[#00F5D4] to-[#E040FB] rounded-full flex items-center justify-center hover:scale-110 transition-transform text-xl">💬</a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-[#FF6F61] to-[#00F5D4] rounded-full flex items-center justify-center hover:scale-110 transition-transform text-xl">🎓</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 mb-4 md:mb-0">
                            © {new Date().getFullYear()} ConsultancyLearn. Empowering learning, everywhere.
                        </div>
                        <div className="flex items-center gap-6 text-gray-400 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Landing
