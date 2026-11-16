import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, MapPin, Calendar, Info, PhoneCall } from 'lucide-react';
import BrandLogo from './BrandLogo';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Destinations', href: '/destinations', icon: MapPin },
    { name: 'Sample Itineraries', href: '/itineraries', icon: Calendar },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: PhoneCall },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-forest-dark/95 backdrop-blur-md shadow-lg border-b border-forest-light/40 py-3' 
        : 'bg-forest-dark py-4 border-b border-forest/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogo variant="light" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    active ? 'text-gold' : 'text-ivory/85 hover:text-ivory'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/plan-trip"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-gold to-gold-accent hover:from-gold-dark hover:to-gold text-forest-dark shadow-md hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              <span>Plan Custom Trip</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/plan-trip"
              className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full bg-gold text-forest-dark"
            >
              Plan Trip
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-ivory hover:text-gold hover:bg-forest focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-forest-dark border-b border-forest-light/30 px-4 pt-3 pb-6 animate-fade-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.href) 
                      ? 'bg-forest text-gold font-semibold' 
                      : 'text-ivory/90 hover:bg-forest/60'
                  }`}
                >
                  <Icon className="w-5 h-5 text-gold" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-forest-light/30">
              <Link
                to="/plan-trip"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm uppercase tracking-wider font-semibold bg-gold text-forest-dark hover:bg-gold-dark transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Plan Your Custom Trip</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
