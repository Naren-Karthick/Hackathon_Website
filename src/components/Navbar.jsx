import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Domains', href: '#domains' },
    { name: 'Registration', href: '#registration' },
    { name: 'Club Members', href: '#members' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 mt-4">
      <nav className={`mx-auto max-w-7xl rounded-full transition-all duration-300 ${isScrolled ? 'glass py-3 px-6' : 'bg-transparent py-3 px-6 border border-transparent'}`}>
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={(e) => scrollToSection(e, '#home')}>
            <Terminal className="text-primary w-8 h-8" />
            <span className="font-bold text-xl tracking-wider text-slate-900">
              ITronix <span className="text-accent">| SMIT</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-slate-600 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={(e) => scrollToSection(e, '#registration')}
                className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-white transition-all px-6 py-2 rounded-full font-bold shadow-sm"
              >
                Register Now
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-slate-600 hover:text-primary block px-3 py-3 rounded-md text-base font-medium"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={(e) => scrollToSection(e, '#registration')}
            className="w-full text-center mt-4 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-white transition-all px-4 py-3 rounded-md font-bold"
          >
            Register Now
          </button>
        </div>
      </div>
      </nav>
    </div>
  );
};

export default Navbar;
