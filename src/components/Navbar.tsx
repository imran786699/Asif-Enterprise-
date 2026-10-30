import React, { useState } from 'react';
import { Phone, MessageSquare, HardHat, ClipboardList, Menu, X, ShieldCheck, MapPin, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { generateDirectWhatsAppUrl } from '../utils/booking';

interface NavbarProps {
  onOpenBookingModal: (serviceId?: string) => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBookingModal,
  onOpenMyBookings,
  bookingsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Corporate Contact & Address Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{BUSINESS_INFO.address}</span>
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <span className="hidden lg:inline text-slate-400">
              Hours: Mon - Sun: 7:00 AM – 9:00 PM (Emergency 24/7)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hotline: {BUSINESS_INFO.displayPhone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={BUSINESS_INFO.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white underline"
            >
              Google Map Pin ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Website Header */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Corporate Credentials */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/20">
            <HardHat className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                ASIF ENTERPRISE
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                Govt ID Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Contractors · Online Labours & Master Carpenters
            </p>
          </div>
        </div>

        {/* Desktop Website Navigation Links */}
        <div className="hidden xl:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-300">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('verified-standards')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Verified Standards
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Services & Rates
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Cost Estimator
          </button>
          <button
            onClick={() => scrollToSection('why-us')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Why Choose Us
          </button>
          <button
            onClick={() => scrollToSection('workers-gallery')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Workers at Work
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Past Works
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Hub & Location
          </button>
          <button
            onClick={() => scrollToSection('faqs')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            FAQs
          </button>
        </div>

        {/* Corporate Header Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Order Status Checker */}
          <button
            onClick={onOpenMyBookings}
            className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Check status of your booked workforce"
          >
            <ClipboardList className="w-4 h-4 text-amber-400" />
            <span>Track Order</span>
          </button>

          {/* Direct Call Line */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            title="Call Asif Enterprise"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{BUSINESS_INFO.displayPhone}</span>
          </a>

          {/* Book / Work Order Primary Button */}
          <button
            onClick={() => scrollToSection('book-online')}
            className="px-4 py-2 text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md hover:shadow-amber-400/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Book Online</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="p-2 rounded-lg bg-emerald-600 text-white"
            aria-label="Call Now"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950 px-4 pt-4 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('book-online');
              }}
              className="w-full py-2.5 px-3 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs text-center flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              Book Online
            </button>
            <a
              href={generateDirectWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 bg-emerald-600 text-white font-semibold rounded-lg text-xs text-center flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          <div className="flex flex-col space-y-2 pt-2 border-t border-slate-800 text-sm">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 px-3 text-slate-300 hover:bg-slate-900 rounded-md"
            >
              About Asif Enterprise
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 px-3 text-slate-300 hover:bg-slate-900 rounded-md"
            >
              Services & Daily Rates
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-left py-2 px-3 text-slate-300 hover:bg-slate-900 rounded-md"
            >
              Instant Cost Estimator
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className="text-left py-2 px-3 text-slate-300 hover:bg-slate-900 rounded-md"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-left py-2 px-3 text-slate-300 hover:bg-slate-900 rounded-md"
            >
              Completed Projects Gallery
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="text-left py-2 px-3 text-slate-300 hover:bg-slate-900 rounded-md"
            >
              Office Hub & Google Map
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className="text-left py-2 px-3 text-slate-300 hover:bg-slate-900 rounded-md"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="text-left py-2 px-3 text-amber-400 font-semibold hover:bg-slate-900 rounded-md flex items-center justify-between"
            >
              <span>Track Work Orders</span>
              {bookingsCount > 0 && (
                <span className="text-xs text-slate-400">({bookingsCount} active)</span>
              )}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
            <p>Direct Call: <a href={`tel:${BUSINESS_INFO.phone}`} className="text-white font-bold">{BUSINESS_INFO.displayPhone}</a></p>
            <p className="mt-1">Head Office: {BUSINESS_INFO.address}</p>
          </div>
        </div>
      )}
    </header>
  );
};
