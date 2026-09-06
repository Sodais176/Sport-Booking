import React from 'react';
import { Dumbbell, Heart, MapPin, Phone, Mail, Clock, HelpCircle, ShoppingBag } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-20 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Brand & Desc */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-white text-base tracking-tight">SPORT BOOKING</span>
                <p className="text-[11px] text-emerald-400 font-semibold">
                  Arena Hub &amp; Ekosistem UMKM
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform reservasi lapangan Futsal, Padel, dan Badminton terpadu yang memberdayakan pengrajin &amp; pedagang minimarket ekonomi kreatif lokal arena.
            </p>
          </div>

          {/* Col 2: Lokasi & Jam Buka */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>Lokasi &amp; Jam Buka</span>
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p className="leading-relaxed">
                Komplek Marba Jasmine Residence, Jl. Masjid Al-Wustho No.12, RT.17/RW.7, Pondok Bambu, Durensawit, East Jakarta City, Jakarta 13430
              </p>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Buka Setiap Hari: 07.00 - 22.00 WIB</span>
              </div>
              <button
                onClick={() => setActiveTab('panduan')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer pt-1"
              >
                Lihat Peta &amp; Akses &rarr;
              </button>
            </div>
          </div>

          {/* Col 3: Kontak & Bantuan */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Kontak &amp; CS</span>
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-16">WhatsApp:</span>
                <a 
                  href="https://wa.me/6281315746759" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  +62 813-1574-6759
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-16">Telepon:</span>
                <span className="text-slate-300 font-medium">(0818) 747-742</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-16">Email:</span>
                <a href="sodais:adamsodais6@gmail.com" className="text-slate-300 hover:text-white">
                  adamsodais6@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Panduan &amp; Menu</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button onClick={() => setActiveTab('home')} className="text-left hover:text-emerald-400 cursor-pointer">Home</button>
              <button onClick={() => setActiveTab('panduan')} className="text-left hover:text-emerald-400 cursor-pointer text-emerald-400 font-bold">Cara Pesan</button>
              <button onClick={() => setActiveTab('lapangan')} className="text-left hover:text-emerald-400 cursor-pointer">Lapangan</button>
              <button onClick={() => setActiveTab('minimarket')} className="text-left hover:text-emerald-400 cursor-pointer">Produk UMKM</button>
              <button onClick={() => setActiveTab('booking')} className="text-left hover:text-emerald-400 cursor-pointer">Booking</button>
              <button onClick={() => setActiveTab('payment')} className="text-left hover:text-emerald-400 cursor-pointer">Payment</button>
              <button onClick={() => setActiveTab('testimoni')} className="text-left hover:text-emerald-400 cursor-pointer">Ulasan</button>
              <button onClick={() => setActiveTab('about')} className="text-left hover:text-emerald-400 cursor-pointer">About</button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 Sport Booking System | Muhammad Sodais Adam &amp; Tim (UAS Pemrograman Web). All Rights Reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Sinergi Sportainment &amp; Pemberdayaan UMKM Kreatif</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
