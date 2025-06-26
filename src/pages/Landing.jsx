// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/langzy_logo.png";
import cloudLeft from "../assets/images/home/cloudleft.png";
import cloudRight from "../assets/images/home/cloudright.png";
import cloudTop from "../assets/images/home/cloudtop.png";

import Card from "../../../consultancy-admin/admin-panel/src/components/Card";
import PricingCard from "../components/PricingCard";
import api from "../api/axios";

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
    <div className="bg-sky-400 min-h-screen flex flex-col items-center text-white font-sans">
      {/* Navbar */}
      <nav className="bg-sky-300 mt-4 px-6 py-2 rounded-full shadow-md flex justify-center gap-20 items-center w-11/12 max-w-5xl">
        <div className="flex gap-10 text-ls text-white">
          <a href="#" className="hover:underline">
            Home
          </a>
          <Link
            to="/about-us" className="hover:underline">
            About Us
          </Link>
          <a href="#languages" className="hover:underline">
            Languages
          </a>
          <a href="#pricing" className="hover:underline">
            Pricing
          </a>
          <a href="#" className="hover:underline">
            Reviews
          </a>
        </div>
        <div className="flex gap-2">
          <Link
            to="/login"
            className="bg-black text-white px-4 py-1 rounded-full text-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-black text-white px-4 py-1 rounded-full text-sm"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-20 relative z-10">
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
        </div>
        <button className="mt-10 px-6 py-2 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition">
          Get Started
        </button>
      </div>

      {/* Languages Section */}
      <section
        id="languages"
        className="w-full max-w-6xl mx-auto mt-20 px-4"
      >
        <h2 className="text-4xl font-bold text-center text-black mb-8">
          Available Languages
        </h2>
        {langLoading ? (
          <div className="text-center text-lg text-gray-700">
            Loading languages...
          </div>
        ) : langError ? (
          <div className="text-center text-red-600">{langError}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {languages.map((lang) => (
              <Card
                key={lang._id}
                title={lang.name}
                value={lang.code}
                className="hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center">
                  {lang.flag && (
                    <img
                      src={lang.flag}
                      alt={lang.name}
                      className="w-16 h-16 mb-2 rounded-full border"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {lang.name}
                  </h3>
                  <p className="text-gray-500">{lang.description}</p>
                  {lang.levels?.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      Levels: {lang.levels.length}
                    </div>
                  )}
                  <div className="mt-1 text-xs text-gray-400">
                    Code: {lang.code}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="w-full max-w-6xl mx-auto mt-24 px-4 pb-16"
      >
        <h2 className="text-4xl font-bold text-center text-black mb-8">
          Pricing Plans
        </h2>
        {plansLoading ? (
          <div className="text-center text-lg text-gray-700">
            Loading pricing...
          </div>
        ) : plansError ? (
          <div className="text-center text-red-600">{plansError}</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingCard plan={plan} key={plan.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
