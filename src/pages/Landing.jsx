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
        // since your api baseURL is .../api, this calls POST /api/languages
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
      <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
        <div className="relative w-[700px] h-[400px] flex flex-col items-center">
          <img
            src={cloudLeft}
            alt="Cloud 1"
            className="absolute bottom-0 left-0 w-[350px] z-0 animate-cloud-left"
          />
          <img
            src={cloudTop}
            alt="Cloud 2"
            className="absolute top-10 left-[300px] w-[180px] z-0 animate-cloud-middle"
          />
          <img
            src={cloudRight}
            alt="Cloud 3"
            className="absolute top-60 right-0 w-[250px] z-0 animate-cloud-right"
          />
          <h2 className="absolute text-3xl top-20 font-semibold text-center text-black tracking-widest z-10">
            Grow your words. Expand your world.
          </h2>
          <h1 className="relative z-10 text-[120px] font-bold text-white drop-shadow-[4px_4px_2px_rgba(0,0,0,0.3)]">
            <img src={logo} alt="Langzy Logo" className="w-full" />
          </h1>
          <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 px-12 py-4 rounded-2xl bg-white text-sky-600 text-xl font-bold hover:bg-sky-50 hover:text-sky-700 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-sky-200 animate-pulse">
            Get Started
          </button>
        </div>
      </div>

      {/* Page 2: Languages Section */}
      <section
        id="languages"
        className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-white flex items-center justify-center py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Available Languages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive language programs designed to help you master new languages 
              with expert guidance and structured learning paths.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-cyan-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          {langLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-400 border-t-transparent"></div>
              <span className="ml-4 text-xl text-gray-600">Loading languages...</span>
            </div>
          ) : langError ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                <div className="text-red-600 text-lg font-semibold">{langError}</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {languages.map((lang) => (
                <Card
                  key={lang._id}
                  title={lang.name}
                  value={lang.code}
                  className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-100"
                >
                  <div className="flex flex-col items-center text-center">
                    {lang.flag && (
                      <div className="w-16 h-16 mb-3 rounded-full border-2 border-sky-100 shadow-sm overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img
                          src={lang.flag}
                          alt={lang.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {lang.name}
                    </h3>
                    {lang.description && (
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                        {lang.description}
                      </p>
                    )}
                    {lang.levels?.length > 0 && (
                      <div className="bg-sky-50 px-3 py-1 rounded-full mb-2">
                        <span className="text-sky-700 font-medium text-sm">
                          {lang.levels.length} Level{lang.levels.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">
                      {lang.code}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Page 3: Pricing Section */}
      <section
        id="pricing"
        className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select the perfect plan that fits your language learning goals. 
              All plans include access to our expert tutors and comprehensive curriculum.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {plansLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-400 border-t-transparent"></div>
              <span className="ml-4 text-xl text-gray-600">Loading pricing plans...</span>
            </div>
          ) : plansError ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                <div className="text-red-600 text-lg font-semibold">{plansError}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {plans.map((plan) => (
                  <div key={plan.id} className="transform hover:scale-105 transition-all duration-300">
                    <PricingCard plan={plan} />
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-sky-500 to-cyan-600 rounded-2xl p-8 text-center text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-3">Need a Custom Plan?</h3>
                <p className="text-sky-100 mb-6 text-lg">
                  Contact us for enterprise solutions and bulk pricing options tailored to your organization.
                </p>
                <Link 
                  to="/contact-us"
                  className="inline-block bg-white text-sky-600 px-8 py-3 rounded-full font-semibold hover:bg-sky-50 transition-colors duration-200"
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
