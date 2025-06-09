import React from "react";
import logo from "../assets/images/langzy_logo.png";
import cloudLeft from "../assets/images/home/cloudleft.png";
import cloudRight from "../assets/images/home/cloudright.png"
import cloudTop from "../assets/images/home/cloudtop.png";
import { Link, useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="bg-sky-400 min-h-screen flex flex-col items-center text-white font-sans">
      {/* Navbar */}
      <nav className="bg-sky-300 mt-4 px-6 py-2 rounded-full shadow-md flex justify-center gap-20 items-center w-11/12 max-w-5xl">
        <div className="flex gap-10 text-ls text-white">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Languages</a>
          <a href="#" className="hover:underline">Team</a>
          <a href="#" className="hover:underline">Reviews</a>
        </div>
        <div className="flex gap-2">
          <Link  to="/login" className="bg-black text-white px-4 py-1 rounded-full text-sm">Login</Link>
          <Link  to="/signup" className="bg-black text-white px-4 py-1 rounded-full text-sm">Sign Up</Link>
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
            <span className="inline-block">
              <img src={logo} alt="Langzy Logo" className="w-full" />
            </span>
          </h1>
        </div>
        <button className="mt-10 px-6 py-2 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition">
          Get Started
        </button>
      </div>
    </div>
  );
}