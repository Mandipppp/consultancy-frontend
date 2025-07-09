// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/langzy_logo.png";
import cloudLeft from "../assets/images/home/cloudleft.png";
import cloudRight from "../assets/images/home/cloudright.png";
import cloudTop from "../assets/images/home/cloudtop.png";

import Card from "../components/Card";
import PricingCard from "../components/PricingCard";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  // ─── Languages State ─────────────────────────────────────────────
  const [languages, setLanguages] = useState([]);
  const [langLoading, setLangLoading] = useState(true);
  const [langError, setLangError] = useState(null);

  // ─── Plans State ─────────────────────────────────────────────────
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState(null);

  // ─── Load Languages ──────────────────────────────────────────────
  useEffect(() => {
    const loadLanguages = async () => {
      setLangLoading(true);
      setLangError(null);
      try {
        // since your api baseURL is .../api, this calls GET /api/languages
        const res = await api.get("/api/languages");
        const list = Array.isArray(res.data.data) ? res.data.data : [];
        setLanguages(list);
      } catch (err) {
        console.error(err);
        setLangError("Failed to load languages");
      } finally {
        setLangLoading(false);
      }
    };
    loadLanguages();
  }, []);

  // ─── Load Pricing Plans ──────────────────────────────────────────
  useEffect(() => {
    const loadPlans = async () => {
      setPlansLoading(true);
      setPlansError(null);
      try {
        // replace with your real endpoint if you have one:
        const res = await api.get("api/pricing/plans");
        const list = Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setPlans(list);
      } catch (err) {
        console.warn("Could not fetch plans, falling back to demo", err);
        // fallback static demo
        setPlans([
          {
            id: 1,
            name: "Basic",
            price: 1500,
            discountType: "percent",
            discountValue: 20,
            billingCycle: "month",
            popular: false,
            features: [
              "5GB Storage",
              "Email Support",
              "Basic Analytics",
              "Mobile App Access",
            ],
          },
          {
            id: 2,
            name: "Pro",
            price: 3000,
            discountType: "amount",
            discountValue: 500,
            billingCycle: "month",
            popular: true,
            features: [
              "50GB Storage",
              "Priority Support",
              "Advanced Analytics",
              "Mobile + Desktop Apps",
              "API Access",
              "Custom Integrations",
            ],
          },
          {
            id: 3,
            name: "Enterprise",
            price: 5000,
            billingCycle: "month",
            popular: false,
            features: [
              "Unlimited Storage",
              "24/7 Phone Support",
              "Custom Analytics",
              "All Platform Access",
              "Advanced API",
              "White-label Solution",
              "Dedicated Account Manager",
            ],
          },
        ]);
      } finally {
        setPlansLoading(false);
      }
    };
    loadPlans();
  }, []);

  return (
    <div className="bg-sky-400 text-white font-sans">
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Page 1: Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="relative w-full max-w-[700px] h-[300px] sm:h-[400px] flex flex-col items-center">
          {/* Mobile: Hide clouds on very small screens, show on larger mobile */}
          <img
            src={cloudLeft}
            alt="Cloud 1"
            className="hidden sm:block absolute bottom-0 left-0 w-[200px] sm:w-[350px] z-0 animate-cloud-left"
          />
          <img
            src={cloudTop}
            alt="Cloud 2"
            className="hidden sm:block absolute top-10 left-[150px] sm:left-[300px] w-[100px] sm:w-[180px] z-0 animate-cloud-middle"
          />
          <img
            src={cloudRight}
            alt="Cloud 3"
            className="hidden sm:block absolute top-40 sm:top-60 right-0 w-[150px] sm:w-[250px] z-0 animate-cloud-right"
          />
          
          <h2 className="absolute text-lg sm:text-2xl md:text-3xl top-8 sm:top-20 font-semibold text-center text-black tracking-wide sm:tracking-widest z-10 px-4">
            Grow your words. Expand your world.
          </h2>
          <h1 className="relative z-10 text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-bold text-white drop-shadow-[4px_4px_2px_rgba(0,0,0,0.3)]">
            <img src={logo} alt="Langzy Logo" className="w-full" />
          </h1>
        </div>
        
        {/* Hero Content Below Logo */}
        <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-4">
            Master new languages with expert tutors, structured courses, and personalized learning paths. 
            Join thousands of successful language learners worldwide.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
            <Link 
              to="/signup"
              className="bg-white text-sky-600 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-sky-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Get Started Free
            </Link>
            <button 
              onClick={() => document.getElementById('languages').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-sky-600 transition-all duration-300 w-full sm:w-auto"
            >
              Explore Languages
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => document.getElementById('languages').scrollIntoView({ behavior: 'smooth' })}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>


      {/* Page 2: Languages Section */}
      <section
        id="languages"
        className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-white flex items-center justify-center py-12 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Master Global Languages
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Choose from our extensive collection of languages, each with expertly crafted curricula 
              and native-speaking instructors to guide your learning journey.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-sky-400 to-cyan-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>
          
          {langLoading ? (
            <div className="flex flex-col sm:flex-row justify-center items-center py-12 sm:py-20">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-sky-400 border-t-transparent"></div>
              <span className="mt-4 sm:mt-0 sm:ml-4 text-lg sm:text-xl text-gray-600">Loading languages...</span>
            </div>
          ) : langError ? (
            <div className="text-center py-12 sm:py-20">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 max-w-md mx-auto">
                <div className="text-red-600 text-base sm:text-lg font-semibold">{langError}</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {languages.map((lang) => {
                // Check if this language is German (available)
                const isAvailable = lang.name?.toLowerCase() === 'german' || lang.code?.toLowerCase() === 'de';
                
                return (
                  <div
                    key={lang._id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                  >
                    {/* Card Header with Flag */}
                    <div className="relative h-32 overflow-hidden">
                      {lang.flag ? (
                        <>
                          <img
                            src={lang.flag}
                            alt={lang.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center group-hover:from-sky-500 group-hover:to-blue-700 transition-all duration-300">
                          <span className="text-white font-bold text-4xl">{lang.name?.charAt(0)}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors duration-300">
                          {lang.name}
                        </h3>
                        {lang.description && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                            {lang.description}
                          </p>
                        )}
                      </div>

                      {/* Language Info */}
                      <div className="space-y-3 mb-4">
                        {lang.levels?.length > 0 && (
                          <div className="flex items-center justify-center">
                            <div className="bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full">
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-sky-700 font-medium text-sm">
                                  {lang.levels.length} Level{lang.levels.length > 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-center">
                          <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                              <span className="text-gray-600 font-mono text-sm">{lang.code}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="text-center">
                        <button className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                          Start Learning
                        </button>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    {/* Coming Soon Overlay for non-German languages */}
                    {!isAvailable && (
                      <>
                        {/* Coming Soon Badge */}
                        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
                          Coming Soon
                        </div>
                        
                        {/* Button Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 z-10">
                          <div className="bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-xl text-center cursor-not-allowed">
                            Available Soon
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Call to Action */}
          {!langLoading && !langError && languages.length > 0 && (
            <div className="text-center mt-12 sm:mt-16">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Language Journey?</h3>
                <p className="text-sky-100 mb-6 text-base sm:text-lg max-w-2xl mx-auto">
                  Join thousands of learners who have already started mastering new languages with our proven methodology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/signup"
                    className="bg-white text-sky-600 px-8 py-3 rounded-full font-bold hover:bg-sky-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/contact-us"
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-sky-600 transition-all duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative bg-white">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white px-6 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 3: Pricing Section */}
      <section
        id="pricing"
        className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Select the perfect plan that fits your language learning goals. 
              All plans include access to our expert tutors and comprehensive curriculum.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>

          {plansLoading ? (
            <div className="flex flex-col sm:flex-row justify-center items-center py-12 sm:py-20">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-emerald-400 border-t-transparent"></div>
              <span className="mt-4 sm:mt-0 sm:ml-4 text-lg sm:text-xl text-gray-600">Loading pricing plans...</span>
            </div>
          ) : plansError ? (
            <div className="text-center py-12 sm:py-20">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 max-w-md mx-auto">
                <div className="text-red-600 text-base sm:text-lg font-semibold">{plansError}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
                {plans.map((plan) => (
                  <div key={plan.id} className="transform hover:scale-105 transition-all duration-300">
                    <PricingCard plan={plan} />
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-sky-500 to-cyan-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Need a Custom Plan?</h3>
                <p className="text-sky-100 mb-4 sm:mb-6 text-base sm:text-lg">
                  Contact us for enterprise solutions and bulk pricing options tailored to your organization.
                </p>
                <Link 
                  to="/contact-us"
                  className="inline-block bg-white text-sky-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-sky-50 transition-colors duration-200 text-sm sm:text-base"
                >
                  Contact Sales
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
