import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link to="/" className="text-xl font-black tracking-tighter text-gray-900 dark:text-slate-100 select-none hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            FUJI
          </Link>
          <p className="text-xs text-gray-400 dark:text-slate-500">Curating the best everyday items for you.</p>
        </div>

        {/* Center/Right: Micro Copyright & links */}
        <p className="text-xs text-gray-400 dark:text-slate-500 order-last md:order-none">
          &copy; {new Date().getFullYear()} Fuji Inc. All rights reserved.
        </p>

        {/* Right: Quick Footer Links */}
        <div className="flex gap-6 text-xs text-gray-500 dark:text-slate-400 font-medium">
          <Link to="/about" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">About Us</Link>
          <Link to="/new-arrivals" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">New Arrivals</Link>
          <a href="#privacy" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
