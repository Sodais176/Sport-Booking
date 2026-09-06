import React, { useState } from 'react';
import { 
  Dumbbell, 
  Calendar, 
  ShoppingBag, 
  CreditCard, 
  BarChart3, 
  Star, 
  Info, 
  Menu, 
  X,
  Sparkles,
  MapPin,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
  umkmProductCount: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  highlight?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookingCount,
  umkmProductCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Dumbbell },
    { id: 'lapangan', label: 'Lapangan', icon: MapPin },
    { id: 'booking', label: 'Booking', icon: Calendar, badge: bookingCount },
    { id: 'minimarket', label: 'Minimarket UMKM', icon: ShoppingBag, badge: umkmProductCount, highlight: true },
    { id: 'panduan', label: 'Cara Pesan & Kontak', icon: HelpCircle },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'grafik', label: 'Grafik & Laporan', icon: BarChart3 },
    { id: 'testimoni', label: 'Testimoni', icon: Star },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950 text-white shadow-xl border-b border-slate-800">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-4 py-1.5 text-xs sm:text-sm font-medium text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
        <span>
          <strong>Ekosistem Olahraga Berdayakan UMKM:</strong> Booking lapangan sekarang, nikmati hidrasi &amp; snack sehat dari UMKM ekonomi kreatif lokal arena!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  SPORT BOOKING
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  + UMKM HUB
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Padel • Futsal • Badminton &amp; Minimarket Kreatif
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : item.highlight
                      ? 'text-emerald-300 hover:text-white hover:bg-slate-800/80 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-slate-900 text-emerald-400' : 'bg-emerald-500/30 text-emerald-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('booking')}
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservasi Lapangan</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : item.highlight
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-emerald-400 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
