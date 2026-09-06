import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle, 
  Send, 
  Sparkles, 
  User 
} from 'lucide-react';
import { Testimonial, SportType } from '../types';
import confetti from 'canvas-confetti';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials,
  setTestimonials
}) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<'⭐' | '⭐⭐' | '⭐⭐⭐' | '⭐⭐⭐⭐' | '⭐⭐⭐⭐⭐'>('⭐⭐⭐⭐⭐');
  const [sport, setSport] = useState<SportType>('Futsal');

  // Calculate dynamic satisfaction index
  const calculateSatisfaction = () => {
    if (testimonials.length === 0) return 100;
    const totalStars = testimonials.reduce((acc, t) => {
      const count = (t.rating.match(/⭐/g) || []).length;
      return acc + count;
    }, 0);
    const maxStars = testimonials.length * 5;
    return Math.round((totalStars / maxStars) * 100);
  };

  const satisfactionScore = calculateSatisfaction();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Nama tidak boleh kosong!');
      return;
    }
    if (!comment.trim()) {
      alert('Komentar tidak boleh kosong!');
      return;
    }

    const newTestimonial: Testimonial = {
      id: 'testi-' + (testimonials.length + 1),
      name,
      comment,
      rating,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      sport
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('testimonials', JSON.stringify(updated));

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (_) {}

    alert('Terima kasih! Ulasan dan kepuasan Anda berhasil dicatat.');
    setName('');
    setComment('');
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Suara Pengunjung &amp; Komunitas
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
          TESTIMONI &amp; INDEKS KEPUASAN
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Ulasan jujur para pemain mengenai kemudahan booking lapangan dan kelezatan hidrasi/snack dari minimarket UMKM arena.
        </p>
      </div>

      {/* Satisfaction Score Highlight */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md flex flex-col items-center justify-center border border-white/30 shrink-0">
            <span className="text-3xl sm:text-4xl font-black">{satisfactionScore}%</span>
            <span className="text-[10px] uppercase font-bold text-emerald-100">Index Skor</span>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Indeks Kepuasan Pengunjung Sangat Tinggi
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
              Berdasarkan akumulasi nilai rating {testimonials.length} testimoni verified players yang telah memesan lapangan dan menikmati layanan minimarket UMKM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-950/30 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shrink-0">
          <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
          <span className="font-black text-lg">4.9 / 5.0</span>
          <span className="text-xs text-emerald-100 ml-1">Bintang Rata-rata</span>
        </div>
      </div>

      {/* Grid: Form Testimoni & Review Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Tulis Ulasan Anda</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bagikan pengalaman bermain dan belanja di minimarket UMKM kami.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bagus Setiawan"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Cabang Olahraga yang Dimainkan
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value as SportType)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Futsal">Futsal</option>
                <option value="Padel">Padel</option>
                <option value="Badminton">Badminton</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tingkat Kepuasan (Rating)
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'] as const).map((r, i) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRating(r)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      rating === r
                        ? 'bg-amber-100 border border-amber-400 text-amber-900 shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1} ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Komentar / Pengalaman *
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ceritakan kondisi lapangan, kemudahan bayar QRIS, atau produk minimarket UMKM yang Anda sukai..."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Testimoni</span>
            </button>
          </form>
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-7 space-y-4">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-500/40 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {testi.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{testi.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700">
                        {testi.sport}
                      </span>
                      <span className="text-[10px] text-slate-400">{testi.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-amber-500 text-sm tracking-widest">
                  {testi.rating}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                "{testi.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
