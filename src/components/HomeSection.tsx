import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Calendar, 
  QrCode, 
  HeartHandshake, 
  Award, 
  Users, 
  Coffee, 
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageCircle,
  HelpCircle,
  Star,
  Navigation,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { Court, MinimarketProduct } from '../types';

interface HomeSectionProps {
  courts?: Court[];
  products?: MinimarketProduct[];
  onSelectSport?: (sport: string) => void;
  setActiveTab: (tab: string) => void;
  totalBookings?: number;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  courts = [],
  products = [],
  onSelectSport,
  setActiveTab,
  totalBookings = 24
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const fullAddress = "Marba Jasmine Residence, Jl. Masjid Al-Wustho No.10, RT.17/RW.7, Pd. Bambu, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13430";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sinergi Sportainment &amp; Pemberdayaan Ekonomi Kreatif UMKM 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
            Reservasi Lapangan Olahraga, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Gerakkan Omzet UMKM Kreatif
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            Platform terpadu untuk pemesanan lapangan <strong>Futsal, Padel, dan Badminton</strong> yang terintegrasi langsung dengan ekosistem <strong>Minimarket &amp; Ekonomi Kreatif</strong> lokal arena. Setiap sesi olahraga menghadirkan pasar pasti (captive market) bagi produk hidrasi sehat, snack nutrisi, serta kriya olahraga buatan pengrajin lokal.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('booking')}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Lapangan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('minimarket')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Katalog Minimarket UMKM</span>
            </button>

            <button
              onClick={() => setActiveTab('panduan')}
              className="px-6 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold text-sm border border-emerald-500/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Panduan, Lokasi &amp; Kontak</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">3 Arena</div>
            <div className="text-xs text-slate-400 mt-1">Padel, Futsal, Badminton</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">9+ Produk</div>
            <div className="text-xs text-slate-400 mt-1">Minuman &amp; Kriya UMKM</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{totalBookings} Booking</div>
            <div className="text-xs text-slate-400 mt-1">Transaksi Terverifikasi</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-teal-300">100% QRIS</div>
            <div className="text-xs text-slate-400 mt-1">Non-Tunai &amp; Inklusi Finansial</div>
          </div>
        </div>
      </div>

      {/* Visual Infographic: Alur Keterkaitan Sport Booking & UMKM */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Model Integrasi Nilai Tambah
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Bagaimana Sport Booking Menggerakkan Minimarket UMKM?
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Rantai keterkaitan organik antara reservasi digital lapangan dengan ekosistem ekonomi kreatif di area sport center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative group hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm mb-4 shadow-md">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Reservasi Terjadwal
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pemain memesan lapangan Futsal, Padel, atau Badminton secara online dengan jam pasti (misal: 19.00 - 21.00 WIB).
            </p>
            <div className="mt-3 text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-1 rounded">
              Dampak: Captive Market terbentuk
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative group hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center font-black text-sm mb-4 shadow-md">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-teal-600" />
              Pre-Order UMKM Bundle
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Di formulir pemesanan, pemain langsung memilih paket hidrasi isotonik, energy bar madu, sewa raket, atau grip kriya batik.
            </p>
            <div className="mt-3 text-[11px] font-semibold text-teal-700 bg-teal-100/60 px-2 py-1 rounded">
              Dampak: Peningkatan Order Value
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative group hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-black text-sm mb-4 shadow-md">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-cyan-600" />
              1x Bayar QRIS / Transfer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Total biaya sewa lapangan + belanja minimarket UMKM dibayar bersamaan via QRIS, E-Wallet, atau Bank Transfer terverifikasi.
            </p>
            <div className="mt-3 text-[11px] font-semibold text-cyan-700 bg-cyan-100/60 px-2 py-1 rounded">
              Dampak: Inklusi Keuangan UMKM
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative group hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-black text-sm mb-4 shadow-md">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-amber-600" />
              Zero-Queue Ready di Bench
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Saat tim tiba di arena, minimarket UMKM sudah menyiapkan pesanan di loker pemain / bench lapangan tanpa antre!
            </p>
            <div className="mt-3 text-[11px] font-semibold text-amber-800 bg-amber-100/60 px-2 py-1 rounded">
              Dampak: Pengalaman bermain prima
            </div>
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center gap-3">
          <HeartHandshake className="w-8 h-8 text-emerald-600 shrink-0" />
          <p className="text-xs sm:text-sm text-slate-700">
            <strong>Ekonomi Sirkular Berjalan Nyata:</strong> Pengelola arena olahraga mendapatkan okupansi lapangan maksimal, sementara produsen UMKM lokal mendapatkan akses pasar harian tanpa biaya gerai yang mencekik.
          </p>
        </div>
      </div>

      {/* Pilihan Lapangan Olahraga */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Pilihan Fasilitas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Daftar Lapangan Olahraga
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Fasilitas berstandar kompetisi dengan akses langsung ke minimarket &amp; loker tim.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('lapangan')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Lihat Detail Spesifikasi &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courts.map((court) => (
            <div 
              key={court.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden group">
                <img 
                  src={court.imageUrl} 
                  alt={court.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-extrabold px-2.5 py-1 rounded-md">
                  {court.sport}
                </div>
                <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Rp {court.pricePerHour.toLocaleString('id-ID')} / jam
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{court.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {court.description}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    {court.facilities.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onSelectSport) {
                        onSelectSport(court.sport);
                      }
                      setActiveTab('booking');
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Booking {court.sport}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Showcase Produk Unggulan UMKM */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>PRODUK UNGGULAN MINIMARKET &amp; KANTIN SEHAT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pilihan Produk Unggulan Binaan UMKM Arena
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Produk segar, bergizi, dan kriya bernilai tinggi yang siap langsung diantar ke bench lapangan Anda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('panduan')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Panduan &amp; Info</span>
            </button>
            <button
              onClick={() => setActiveTab('minimarket')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Semua Katalog UMKM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 hover:border-emerald-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase">
                  Kuliner Sehat
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9
                </span>
              </div>
              <h3 className="font-bold text-base text-white">Isotonik Herbal Citrus 500ml</h3>
              <p className="text-[11px] font-semibold text-emerald-400 mt-0.5">UMKM Jamu Lestari Jogja</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Elektrolit alami kelapa muda segar, jeruk nipis, dan ekstrak jahe merah untuk rehidrasi cepat tanpa kram.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
              <span className="text-emerald-400 font-black text-sm">Rp 15.000</span>
              <button
                onClick={() => setActiveTab('booking')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                + Pre-Order
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 hover:border-cyan-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 uppercase">
                  Kriya Seni &amp; Sport
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0
                </span>
              </div>
              <h3 className="font-bold text-base text-white">Grip Raket Kriya Motif Batik</h3>
              <p className="text-[11px] font-semibold text-cyan-400 mt-0.5">Studio Kriya Sporty Batik</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Grip raket anti-slip kain berdaya serap tinggi dengan corak batik parang khas sentra pengrajin lokal.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
              <span className="text-emerald-400 font-black text-sm">Rp 25.000</span>
              <button
                onClick={() => setActiveTab('booking')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                + Pre-Order
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 hover:border-amber-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 uppercase">
                  Snack Energi
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.7
                </span>
              </div>
              <h3 className="font-bold text-base text-white">Energy Bar Pisang &amp; Madu</h3>
              <p className="text-[11px] font-semibold text-amber-400 mt-0.5">UMKM NutriSnack Nusantara</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Camilan padat gizi dari oats organik, pisang sale lokal, dan madu hutan murni untuk pengisi stamina instan.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
              <span className="text-emerald-400 font-black text-sm">Rp 14.000</span>
              <button
                onClick={() => setActiveTab('booking')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                + Pre-Order
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 hover:border-emerald-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase">
                  Alat Olahraga
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9
                </span>
              </div>
              <h3 className="font-bold text-base text-white">Shuttlecock Point Spin Tabung</h3>
              <p className="text-[11px] font-semibold text-emerald-400 mt-0.5">Koperasi Pengrajin Kok Tegal</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Kok bulu angsa asli hasil buatan tangan pengrajin dengan kestabilan putaran dan durabilitas standar PBSI.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
              <span className="text-emerald-400 font-black text-sm">Rp 75.000</span>
              <button
                onClick={() => setActiveTab('booking')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                + Pre-Order
              </button>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 hover:border-teal-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-400 uppercase">
                  Roti Artisan
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9
                </span>
              </div>
              <h3 className="font-bold text-base text-white">Roti Gandum Bakar Coklat Pisang</h3>
              <p className="text-[11px] font-semibold text-teal-400 mt-0.5">Dapur Roti Kreatif Bu Endang</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Roti gandum segar panggang hangat dengan isian pisang raja karamel manis alami dan selai coklat rendah gula.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
              <span className="text-emerald-400 font-black text-sm">Rp 18.000</span>
              <button
                onClick={() => setActiveTab('booking')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                + Pre-Order
              </button>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 hover:border-purple-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-400 uppercase">
                  Merchandise
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.8
                </span>
              </div>
              <h3 className="font-bold text-base text-white">Jersey Dry-Fit Custom Sablon</h3>
              <p className="text-[11px] font-semibold text-purple-400 mt-0.5">Creative Apparel Sablon Sport</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Bahan dry-fit mikro menyerap keringat dengan sentuhan grafis tipografi karya desainer muda Yogyakarta.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
              <span className="text-emerald-400 font-black text-sm">Rp 85.000</span>
              <button
                onClick={() => setActiveTab('booking')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                + Pre-Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Cara Pemesanan Lapangan & Produk */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Panduan Pemesanan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Cara Pemesanan Lapangan &amp; Produk UMKM
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Hanya butuh 3 menit untuk mengamankan jam bermain dan produk pendukung tanpa repot.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('booking')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Mulai Booking Sekarang</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Langkah 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative group hover:border-emerald-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                01
              </span>
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">Pilih Lapangan &amp; Waktu</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tentukan cabang olahraga (Futsal, Padel, Badminton), tanggal sewa, jam mulai main, dan durasi sewa yang Anda kehendaki.
            </p>
          </div>

          {/* Langkah 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative group hover:border-emerald-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-black text-xs flex items-center justify-center">
                02
              </span>
              <ShoppingBag className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">Pilih Add-on Produk UMKM</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Centang minuman isotonik, camilan energi, sewa raket, atau grip handuk batik yang ingin disediakan di bench lapangan.
            </p>
          </div>

          {/* Langkah 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative group hover:border-emerald-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-600 text-white font-black text-xs flex items-center justify-center">
                03
              </span>
              <QrCode className="w-5 h-5 text-cyan-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">Bayar &amp; Dapatkan E-Tiket</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Selesaikan pembayaran praktis via QRIS atau transfer bank. Tunjukkan ID booking di meja resepsionis saat tiba di lokasi.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/50 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs text-slate-700">
              <strong>Butuh panduan lebih detail atau ingin tahu ketentuan reschedule?</strong> Kunjungi halaman panduan komprehensif kami.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('panduan')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1 shrink-0"
          >
            Buka Panduan Lengkap &rarr;
          </button>
        </div>
      </div>

      {/* Bagian Lokasi & Kontak Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Lokasi */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Lokasi Marba Jasmine Residence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Kunjungi Arena Kami
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
              Arena olahraga modern dan sentra minimarket kreatif berlokasi strategis di Jakarta Timur, Pondok Bambu, mudah diakses kendaraan pribadi maupun transportasi umum.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-xs text-slate-900">Alamat Lengkap:</div>
                  <p className="text-xs text-slate-600 mt-0.5">{fullAddress}</p>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:border-emerald-500 text-xs text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Salin Alamat"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs text-slate-900">Jam Operasional:</div>
                    <p className="text-xs text-slate-600 mt-0.5">Senin - Minggu (07.00 - 22.00 WIB)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <Navigation className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs text-slate-900">Akses Parkir:</div>
                    <p className="text-xs text-slate-600 mt-0.5">Parkir 50+ mobil &amp; 150+ motor (CCTV 24 Jam)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500">Koordinat GPS: -6.2449333,106.9071275,18.61</span>
            <a
              href="https://www.google.com/maps/place/Marba+Jasmine+Residence/@-6.2445873,106.9076905,18.79z/data=!4m9!1m2!2m1!1s-6.2449333,106.9071275,18.61!3m5!1s0x2e69f3c4d4a2eed1:0xc8e130fc7eb76d9!8m2!3d-6.245274!4d106.9074804!16s%2Fg%2F11hh5z50r_?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Buka Petunjuk Arah Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Kolom Kontak & Customer Service */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 mb-3">
              <Phone className="w-3.5 h-3.5" />
              <span>Layanan Pelanggan &amp; Bantuan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Kontak Kami
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              Tim resepsionis dan customer care siap membantu proses booking lapangan, reservasi event komunitas, maupun info kemitraan produk UMKM.
            </p>

            <div className="space-y-3.5 mb-6">
              {/* WhatsApp Button Card */}
              <a
                href="https://wa.me/6281315746759"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold transition-all group cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 fill-slate-950" />
                  <div>
                    <div className="text-xs uppercase tracking-wider font-extrabold opacity-90">WhatsApp Hotline CS</div>
                    <div className="text-sm font-black">+62 813-1574-6759</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Telepon Kantor */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold">Telepon Kantor Arena</div>
                    <div className="text-xs font-bold text-white">(0818) 747-742</div>
                  </div>
                </div>
                <a
                  href="tel:0818747742"
                  className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-white font-medium"
                >
                  Hubungi
                </a>
              </div>

              {/* Email Resmi */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold">Email Resmi</div>
                    <div className="text-xs font-bold text-white">adamsodais6@gmail.com</div>
                  </div>
                </div>
                <a
                  href="sodais:adamsodais6@gmail.com"
                  className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-white font-medium"
                >
                  Kirim Email
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('panduan')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Buka Formulir Pesan &amp; Tanya CS Lengkap &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
