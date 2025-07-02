import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-sky-300 mt-4 px-6 py-2 rounded-full shadow-md flex justify-center gap-20 items-center w-11/12 max-w-5xl mx-auto">
      <div className="flex gap-10 text-ls text-white">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/about-us" className="hover:underline">
          About Us
        </Link>
        <a href="#languages" className="hover:underline">
          Languages
        </a>
        <a href="#pricing" className="hover:underline">
          Pricing
        </a>
        <a href="#reviews" className="hover:underline">
          Reviews
        </a>
        <Link to="/contact-us" className="hover:underline">
          Contact Us
        </Link>
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
  );
};

export default Navbar;
