import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, Heart } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BUSINESS_CONFIG } from '../../config/contact';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-ivory/80 pt-16 pb-12 border-t border-forest-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-light/30">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="large" />
            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
              Discover Northeast India. Your Journey, Your Way. Tailor-made, slow travel experiences across Meghalaya, Assam, Sikkim, and the Eastern Himalayas.
            </p>
            <div className="pt-2 text-xs text-gold/80 italic">
              * Partnership with TravelTriangle, subject to applicable platform agreements.
            </div>
          </div>

          {/* Northeast Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destinations/meghalaya" className="hover:text-gold transition-colors">
                  Meghalaya (Sohra & Dawki)
                </Link>
              </li>
              <li>
                <Link to="/destinations/assam-guwahati" className="hover:text-gold transition-colors">
                  Assam & Guwahati (Kaziranga)
                </Link>
              </li>
              <li>
                <Link to="/destinations/sikkim" className="hover:text-gold transition-colors">
                  Sikkim (Gangtok & Pelling)
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gold/90 hover:underline inline-block pt-1">
                  View All Destinations &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Custom Travel</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/plan-trip" className="hover:text-gold transition-colors font-medium text-ivory">
                  Plan Your Custom Trip
                </Link>
              </li>
              <li>
                <Link to="/itineraries" className="hover:text-gold transition-colors">
                  Sample Itineraries
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact Our Specialists
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-gold transition-colors">
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phoneDisplay.replace(/[^0-9+]/g, '')}`} className="hover:text-gold transition-colors">
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-ivory/60 pt-1">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.locations.operations}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
          <p>&copy; {currentYear} THE MEMORABLE TRIP. All rights reserved. Every journey is personal.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="hover:text-ivory transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ivory transition-colors">Terms of Service</Link>
            <Link to="/admin/login" className="hover:text-gold transition-colors flex items-center gap-1 text-ivory/40 hover:text-gold">
              <Shield className="w-3 h-3" />
              <span>Agency Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
