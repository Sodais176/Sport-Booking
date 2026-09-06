import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Play, 
  ShoppingBag, 
  Calendar, 
  ShieldCheck, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Court, SportType } from '../types';

interface CourtsSectionProps {
  courts?: Court[];
  onSelectSport?: (sport: SportType) => void;
  onSelectCourt?: (courtId: string) => void;
  setActiveTab?: (tab: string) => void;
}

export const CourtsSection: React.FC<CourtsSectionProps> = ({
  courts = [],
  onSelectSport,
  onSelectCourt,
  setActiveTab
}) => {
  const [filterSport, setFilterSport] = useState<string>('Semua');
  const [selectedVideoSport, setSelectedVideoSport] = useState<SportType | null>(null);

  const handleBookingClick = (court: Court) => {
    if (onSelectCourt) {
      onSelectCourt(court.id);
    } else if (onSelectSport) {
      onSelectSport(court.sport);
    }
    if (setActiveTab) {
      setActiveTab('booking');
    }
  };

  const handlePreorderClick = (court: Court) => {
    if (onSelectSport) {
      onSelectSport(court.sport);
    }
    if (setActiveTab) {
      setActiveTab('minimarket');
    }
  };

  const handleVideoBooking = (sport: SportType) => {
    if (onSelectSport) {
      onSelectSport(sport);
    }
    if (setActiveTab) {
      setActiveTab('booking');
    }
  };

  const filteredCourts = filterSport === 'Semua' 
    ? courts 
    : courts.filter(c => c.sport === filterSport);

  const videoShowcases = [
    {
      sport: 'Badminton' as SportType,
      title: 'Tutorial Teknik Dasar Drive Badminton',
      description: 'Panduan teknik drive cepat, posisi pegangan raket, dan latihan kelincahan kaki di lapangan vinyl BWF.',
      duration: '0:56 min',
      tag: 'Skill Drill & Warming Up',
      sourceNote: 'Dipandu pelatih profesional di arena'
    },
    {
      sport: 'Padel' as SportType,
      title: 'Aksi Cepat Rally Padel Match',
      description: 'Kombinasi pantulan dinding kaca panoramik, volley net, dan smash dinamis di lapangan Padel berkarpet turf.',
      duration: '1:16 min',
      tag: 'Pro Match Highlight',
      sourceNote: 'World Padel Tour Action'
    },
    {
      sport: 'Futsal' as SportType,
      title: 'Highlight Tanding Futsal Internasional',
      description: 'Kecepatan umpan satu-dua, pressing ketat, dan gol spektakuler di lapangan futsal indoor berstandar dunia.',
      duration: '2:10 min',
      tag: 'Competitive Match',
      sourceNote: 'FIFA Futsal World Cup Highlight'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fasilitas Resmi &amp; Terawat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Daftar Lapangan Olahraga
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Pilih gelanggang olahraga favorit Anda. Seluruh arena terhubung langsung dengan fasilitas pendukung &amp; minimarket UMKM.
          </p>
        </div>

        {/* Filter Buttons matching the user's project: Semua Padel Futsal Badminton */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start md:self-auto">
          {['Semua', 'Padel', 'Futsal', 'Badminton'].map((sport) => (
            <button
              key={sport}
              onClick={() => setFilterSport(sport)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterSport === sport
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredCourts.map((court) => (
          <div
            key={court.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500/80 hover:shadow-2xl transition-all duration-300 flex flex-col group"
          >
            {/* Court Image Banner */}
            <div className="relative h-60 overflow-hidden bg-slate-900">
              <img
                src={court.imageUrl}
                alt={court.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-slate-900/90 text-white border border-slate-700 backdrop-blur-md">
                  {court.sport}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500 text-slate-950">
                  Tersedia
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-xs text-slate-300">Biaya Sewa</div>
                  <div className="text-xl font-black text-white">
                    Rp {court.pricePerHour.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-slate-300">/ jam</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {court.availableHours}
                </div>
              </div>
            </div>

            {/* Court Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  {court.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {court.description}
                </p>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Spesifikasi Lantai:</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
                    {court.surface}
                  </div>
                </div>

                {/* Facilities List */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Fasilitas &amp; Akses UMKM:
                  </div>
                  {court.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleBookingClick(court)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Booking {court.name}</span>
                </button>

                <button
                  onClick={() => handlePreorderClick(court)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pre-order Snack &amp; Minuman Lapangan</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video & Media Showcase Section (from uploaded user videos!) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Preview Media &amp; Cuplikan Lapangan
          </span>
          <h3 className="text-2xl font-black mt-3">
            Cuplikan Aksi &amp; Standar Permainan di Arena Kami
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Lihat bagaimana pemain menikmati suasana kompetitif dan latihan di lapangan Padel, Futsal, dan Badminton.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoShowcases.map((vid, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between hover:border-emerald-500/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {vid.sport}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {vid.duration}
                  </span>
                </div>

                <h4 className="font-bold text-base text-white mb-1.5 flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
                  <span>{vid.title}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {vid.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{vid.sourceNote}</span>
                <button
                  onClick={() => handleVideoBooking(vid.sport)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                >
                  Sewa Lapangan Ini &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box: Keamanan & Kenyamanan */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex flex-col sm:flex-row items-center gap-3 text-xs text-slate-300">
          <Info className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Setiap lapangan dibersihkan dan disanitasi secara berkala setelah tiap sesi permainan. Minuman &amp; handuk yang dipesan melalui minimarket UMKM arena akan diantarkan langsung ke bench sebelum jam mulai.
          </span>
        </div>
      </div>
    </div>
  );
};
