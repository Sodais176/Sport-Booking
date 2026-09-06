import React, { useState, useEffect } from 'react';
import { 
  INITIAL_COURTS, 
  INITIAL_PRODUCTS, 
  INITIAL_BOOKINGS, 
  INITIAL_PAYMENTS, 
  INITIAL_TESTIMONIALS 
} from './data/initialData';
import { Booking, PaymentRecord, Testimonial, Court } from './types';

import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { CourtsSection } from './components/CourtsSection';
import { BookingSection } from './components/BookingSection';
import { MinimarketSection } from './components/MinimarketSection';
import { PaymentSection } from './components/PaymentSection';
import { DashboardChartsSection } from './components/DashboardChartsSection';
import { TestimonialSection } from './components/TestimonialSection';
import { AboutSection } from './components/AboutSection';
import { InfoKontakSection } from './components/InfoKontakSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [courts] = useState<Court[]>(INITIAL_COURTS);
  const [products] = useState(INITIAL_PRODUCTS);

  // Persistent State for Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Persistent State for Payments
  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('payments');
      return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
    } catch {
      return INITIAL_PAYMENTS;
    }
  });

  // Persistent State for Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('testimonials');
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  // Cross-component preselection
  const [selectedSportPreset, setSelectedSportPreset] = useState<string | null>(null);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<string | undefined>(undefined);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    } catch (_) {}
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('payments', JSON.stringify(payments));
    } catch (_) {}
  }, [payments]);

  useEffect(() => {
    try {
      localStorage.setItem('testimonials', JSON.stringify(testimonials));
    } catch (_) {}
  }, [testimonials]);

  // Navigate to booking with preselected court
  const handleSelectCourtForBooking = (courtId: string) => {
    const found = courts.find(c => c.id === courtId);
    if (found) {
      setSelectedSportPreset(found.sport);
    }
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSportForBooking = (sport: string) => {
    setSelectedSportPreset(sport);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to payment with preselected booking
  const handleSelectBookingForPayment = (bookingId: string) => {
    setSelectedBookingForPayment(bookingId);
    setActiveTab('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Content View Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'home' && (
          <HomeSection 
            setActiveTab={handleTabChange} 
            courts={courts} 
            products={products}
            onSelectSport={handleSelectSportForBooking}
            totalBookings={bookings.length}
          />
        )}

        {activeTab === 'lapangan' && (
          <CourtsSection 
            courts={courts} 
            onSelectCourt={handleSelectCourtForBooking}
            onSelectSport={handleSelectSportForBooking as any}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'booking' && (
          <BookingSection 
            courts={courts} 
            products={products}
            availableProducts={products}
            bookings={bookings}
            setBookings={setBookings}
            onProceedToPayment={handleSelectBookingForPayment}
            setSelectedBookingForPayment={handleSelectBookingForPayment}
            initialSport={selectedSportPreset}
            selectedSportPreset={selectedSportPreset as any}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'minimarket' && (
          <MinimarketSection 
            products={products} 
            setActiveTab={handleTabChange} 
          />
        )}

        {activeTab === 'payment' && (
          <PaymentSection 
            bookings={bookings}
            payments={payments}
            setPayments={setPayments}
            setBookings={setBookings}
            selectedBookingId={selectedBookingForPayment}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'grafik' && (
          <DashboardChartsSection 
            bookings={bookings}
            payments={payments}
            products={products}
          />
        )}

        {activeTab === 'testimoni' && (
          <TestimonialSection 
            testimonials={testimonials}
            setTestimonials={setTestimonials}
          />
        )}

        {activeTab === 'panduan' && (
          <InfoKontakSection 
            products={products}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection />
        )}
      </main>

      {/* Professional Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}
