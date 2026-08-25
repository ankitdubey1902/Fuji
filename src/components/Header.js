import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../store/cartSlice';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);
  
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 md:bg-transparent md:text-indigo-600 md:dark:text-indigo-400 font-bold' 
      : 'text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-slate-800 md:hover:bg-transparent';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Brand Name (Always Left) */}
        <Link 
          to="/" 
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <span className="text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
            FUJI
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </Link>
        
        {/* Desktop & Mobile Actions (Always Right) */}
        <div className="flex items-center gap-2 md:gap-6">
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link to="/" className={`${isActive('/')} transition-colors`}>
              Shop
            </Link>
            <Link to="/new-arrivals" className={`${isActive('/new-arrivals')} transition-colors`}>
              New Arrivals
            </Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors`}>
              About Us
            </Link>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.938-8.937h-2.25m-13.5 0h-2.25m15.364-6.364-1.591 1.591M6.343 17.657l-1.591 1.591m12.728 0-1.591-1.591M6.343 6.343L4.752 4.752M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
              </svg>
            )}
          </button>

          {/* Cart Icon & Actions */}
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              dispatch(toggleCart());
            }}
            className="relative p-2.5 text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-indigo-600 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Hamburger button (Mobile Toggle) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 ${
          isMenuOpen ? 'max-h-60 opacity-100 border-t border-b border-gray-100 dark:border-slate-800 shadow-inner' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-1 text-sm font-semibold">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)}
            className={`px-4 py-3 rounded-xl transition-all ${isActive('/')}`}
          >
            Shop Catalog
          </Link>
          <Link 
            to="/new-arrivals" 
            onClick={() => setIsMenuOpen(false)}
            className={`px-4 py-3 rounded-xl transition-all ${isActive('/new-arrivals')}`}
          >
            New Arrivals
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsMenuOpen(false)}
            className={`px-4 py-3 rounded-xl transition-all ${isActive('/about')}`}
          >
            About Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

