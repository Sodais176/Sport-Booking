import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  Award, 
  CheckCircle, 
  Plus, 
  Minus, 
  Star, 
  Store, 
  ArrowRight, 
  Truck, 
  QrCode,
  Tag
} from 'lucide-react';
import { MinimarketProduct } from '../types';
import confetti from 'canvas-confetti';

interface MinimarketSectionProps {
  products?: MinimarketProduct[];
  setActiveTab?: (tab: string) => void;
}

export const MinimarketSection: React.FC<MinimarketSectionProps> = ({
  products = [],
  setActiveTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [cart, setCart] = useState<Record<string, number>>({ 'prod-1': 2, 'prod-4': 1 });
  const [activePartnerModal, setActivePartnerModal] = useState<MinimarketProduct | null>(null);

  const categories = [
    'Semua',
    'Minuman Sehat',
    'Snack Energi',
    'Merchandise & Kriya',
    'Perlengkapan Olahraga'
  ];

  const safeProducts = products || [];

  const filteredProducts = selectedCategory === 'Semua'
    ? safeProducts
    : safeProducts.filter(p => p.category === selectedCategory);

  const addToCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const totalCartCount: number = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);
  const totalCartPrice: number = Object.entries(cart).reduce((sum: number, [id, qty]: [string, number]) => {
    const prod = safeProducts.find(p => p.id === id);
    return sum + (prod ? prod.price * qty : 0);
  }, 0);

  const handleCheckoutLocker = () => {
    if (totalCartCount === 0) return;
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (_) {}
    alert(`Pre-Order Minimarket Berhasil!\nTotal: Rp ${totalCartPrice.toLocaleString('id-ID')}\nPesanan Anda akan segera disiapkan oleh mitra UMKM dan diletakkan di Loker Arena sebelum jam mulai olahraga.`);
  };

  return (
    <div className="space-y-12">
      {/* Banner Hub UMKM */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-800/40 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4 border border-emerald-500/30">
            <Store className="w-3.5 h-3.5" />
            <span>Pojok Minimarket &amp; Ekonomi Kreatif Arena</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
            Dukung UMKM Lokal di Setiap Sesi Olahraga
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Minimarket arena ini dikelola dalam kemitraan inklusif dengan para pelaku UMKM ekonomi kreatif sekitar gelanggang. Mulai dari minuman isotonik herbal, snack energi bergizi, hingga apparel dan kriya kustom khas nusantara.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="text-emerald-400 font-black text-lg">100% Produk Lokal</div>
              <div className="text-xs text-slate-300">Bahan baku alami Nusantara</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="text-amber-400 font-black text-lg">Zero-Queue Pick Up</div>
              <div className="text-xs text-slate-300">Siap di loker &amp; bench pemain</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="text-cyan-300 font-black text-lg">Bagi Hasil Adil</div>
              <div className="text-xs text-slate-300">Langsung mengalir ke kas mitra UMKM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Cart Sticky Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Floating Quick Cart Indicator */}
        <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-xl self-end md:self-auto">
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          <div className="text-xs">
            <span className="font-bold">{totalCartCount} Item</span>
            <span className="text-slate-400 mx-1.5">|</span>
            <span className="text-emerald-400 font-black">
              Rp {totalCartPrice.toLocaleString('id-ID')}
            </span>
          </div>
          {totalCartCount > 0 && (
            <button
              onClick={handleCheckoutLocker}
              className="ml-2 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold cursor-pointer"
            >
              Pre-Order Sekarang
            </button>
          )}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const qtyInCart = cart[prod.id] || 0;
          return (
            <div
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-slate-900/80 backdrop-blur-xs text-white">
                      {prod.category}
                    </span>
                    {prod.badge && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950">
                        {prod.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-800 shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Store className="w-3 h-3 text-emerald-600" />
                    <span>{prod.umkmName}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base mb-1.5 line-clamp-1">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                    {prod.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] text-slate-600 mb-4">
                    <span>Produsen / Pengrajin:</span>
                    <span className="font-bold text-slate-800">{prod.umkmOwner}</span>
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart Controls */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Harga Satuan</span>
                    <span className="text-lg font-black text-emerald-600">
                      Rp {prod.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {qtyInCart === 0 ? (
                    <button
                      onClick={() => addToCart(prod.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-emerald-50 px-2 py-1 rounded-xl border border-emerald-200">
                      <button
                        onClick={() => removeFromCart(prod.id)}
                        className="w-6 h-6 rounded-lg bg-white text-emerald-700 flex items-center justify-center font-bold hover:bg-emerald-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-black text-xs text-emerald-950 px-1">
                        {qtyInCart}
                      </span>
                      <button
                        onClick={() => addToCart(prod.id)}
                        className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold hover:bg-emerald-500 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profil Mitra UMKM Kreatif */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Kemitraan Komunitas
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            Profil Mitra UMKM Ekonomi Kreatif Gelanggang Olahraga
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Mengenal para pelaku usaha mikro lokal yang menggerakkan rantai pasok kuliner sehat dan kriya di sport center kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg mb-4">
              RD
            </div>
            <h4 className="font-extrabold text-base text-slate-900">Ibu Ratna Dewi</h4>
            <div className="text-xs text-emerald-700 font-semibold mb-2">UMKM Jamu Lestari Kreatif</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memproduksi minuman isotonik herbal alami dari elektrolit kelapa hijau dan ekstrak temulawak. Bermitra sejak Januari 2026, penjualan meningkat 70% berkat sistem pre-order pemain futsal &amp; padel.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-black text-lg mb-4">
              MG
            </div>
            <h4 className="font-extrabold text-base text-slate-900">Mas Gilang</h4>
            <div className="text-xs text-cyan-700 font-semibold mb-2">Studio Kriya Sporty Jogja</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pengrajin grip handuk raket bermotif batik parang khas Jogja. Menyerap tenaga kerja 8 pemuda lokal untuk penenunan dan pewarnaan ramah lingkungan bagi komunitas badminton &amp; padel.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-lg mb-4">
              EW
            </div>
            <h4 className="font-extrabold text-base text-slate-900">Ibu Endang W.</h4>
            <div className="text-xs text-amber-700 font-semibold mb-2">Dapur Roti Kreatif &amp; Minimarket</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menyediakan roti gandum panggang segar, energy bar pisang madu, dan pasokan air mineral dingin. Seluruh transaksi terekam digital via QRIS bersama sewa lapangan olahraga.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-emerald-900">
            <strong>Apakah Anda pelaku UMKM ekonomi kreatif lokal?</strong> Buka kemitraan gerai di sport booking arena kami secara gratis tanpa biaya sewa tempat di muka!
          </div>
          <button
            onClick={() => setActiveTab('about')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 cursor-pointer"
          >
            Hubungi Tim Pengelola
          </button>
        </div>
      </div>
    </div>
  );
};
