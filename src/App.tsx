import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VerifiedProfessionalsSection } from './components/VerifiedProfessionalsSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CostEstimator } from './components/CostEstimator';
import { WorkersLiveGallery } from './components/WorkersLiveGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProjectShowcase } from './components/ProjectShowcase';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { LocationSection } from './components/LocationSection';
import { ContactBookingSection } from './components/ContactBookingSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { BookingRequest, DurationType } from './types';
import { getStoredBookings } from './utils/booking';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [bookingInitialData, setBookingInitialData] = useState<{
    serviceId?: string;
    workersCount?: number;
    durationType?: DurationType;
    daysCount?: number;
    includeTools?: boolean;
    isUrgent?: boolean;
    estimatedPrice?: number;
  }>({});

  // Load stored bookings
  const refreshBookings = () => {
    setBookings(getStoredBookings());
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  const handleOpenBookingModal = (serviceId?: string) => {
    setBookingInitialData({
      serviceId,
      workersCount: 2,
      durationType: 'full_day'
    });
    setIsBookingModalOpen(true);
  };

  const handleProceedFromCalculator = (data: {
    serviceId: string;
    workersCount: number;
    durationType: DurationType;
    daysCount: number;
    includeTools: boolean;
    isUrgent: boolean;
    estimatedPrice: number;
  }) => {
    setBookingInitialData(data);
    setIsBookingModalOpen(true);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBookOnline = () => {
    const el = document.getElementById('book-online');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Website Navigation Header */}
      <Navbar
        onOpenBookingModal={() => handleOpenBookingModal()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingsCount={bookings.length}
      />

      {/* Main Website Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenBooking={scrollToBookOnline}
          onScrollToCalculator={scrollToCalculator}
        />

        <VerifiedProfessionalsSection />

        <AboutSection />

        <ServicesSection
          onSelectServiceForBooking={(serviceId) => handleOpenBookingModal(serviceId)}
        />

        <CostEstimator
          onProceedToBooking={handleProceedFromCalculator}
        />

        <WorkersLiveGallery
          onSelectCrewForBooking={(serviceId) => handleOpenBookingModal(serviceId)}
        />

        <WhyChooseUs />

        <ProjectShowcase
          onOpenBooking={scrollToBookOnline}
        />

        <HowItWorks
          onOpenBooking={scrollToBookOnline}
        />

        <Testimonials />

        <LocationSection />

        <ContactBookingSection
          onBookingCreated={refreshBookings}
        />

        <FAQSection />
      </main>

      {/* Website Corporate Footer */}
      <Footer
        onOpenBooking={scrollToBookOnline}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* Discreet Website Floating Contact Hotlines */}
      <FloatingActionBar />

      {/* Quick Booking Modal (when triggered from cards or calculator) */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={refreshBookings}
        initialData={bookingInitialData}
      />

      {/* My Bookings / Work Order Status Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onBookNew={scrollToBookOnline}
      />
    </div>
  );
}
