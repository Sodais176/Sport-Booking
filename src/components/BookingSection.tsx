import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Search, 
  RotateCcw, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Plus, 
  AlertCircle, 
  ShoppingBag, 
  Sparkles,
  X,
  CreditCard
} from 'lucide-react';
import { Booking, SportType, MinimarketProduct, Court } from '../types';
import confetti from 'canvas-confetti';

interface BookingSectionProps {
  bookings?: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  selectedSportPreset?: SportType | string | null;
  initialSport?: SportType | string | null;
  availableProducts?: MinimarketProduct[];
  products?: MinimarketProduct[];
  courts?: Court[];
  setActiveTab?: (tab: string) => void;
  onProceedToPayment?: (bookingId: string) => void;
  setSelectedBookingForPayment?: (bookingId: string) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  bookings = [],
  setBookings,
  selectedSportPreset,
  initialSport,
  availableProducts,
  products,
  setActiveTab,
  onProceedToPayment,
  setSelectedBookingForPayment
}) => {
  const activeProducts = availableProducts || products || [];
  const presetSport = (selectedSportPreset || initialSport) as SportType | undefined;
  const navigateToPayment = onProceedToPayment || setSelectedBookingForPayment;

  // Form State
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [sport, setSport] = useState<SportType>(presetSport || 'Futsal');
  const [tanggal, setTanggal] = useState('2026-09-05');
  const [jamMulai, setJamMulai] = useState('19:00');
  const [jamSelesai, setJamSelesai] = useState('21:00');
  const [durasi, setDurasi] = useState<number>(2);
  const [fasilitas, setFasilitas] = useState<string[]>(['Shuttlecock / Bola']);
  const [selectedUmkmAddons, setSelectedUmkmAddons] = useState<string[]>(['prod-1']);
  const [catatan, setCatatan] = useState('');
  const [editIndex, setEditIndex] = useState<number>(-1);

  // Search & Filter
  const [searchKeyword, setSearchKeyword] = useState('');

  // Modal Detail
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  // Pricing constants (matching user project prompt)
  const sportPrices: Record<SportType, number> = {
    Padel: 120000,
    Futsal: 150000,
    Badminton: 50000
  };

  const facilityPrices: Record<string, number> = {
    'Shuttlecock / Bola': 20000,
    'Sewa Raket': 30000,
    'Sewa Sepatu': 25000,
    'Sewa Jersey': 20000
  };

  // Sync when selectedSportPreset changes
  useEffect(() => {
    if (presetSport) {
      setSport(presetSport);
    }
  }, [presetSport]);

  // Recalculate duration automatically when hours change
  const handleTimeChange = (start: string, end: string) => {
    setJamMulai(start);
    setJamSelesai(end);
    if (start && end) {
      const [sh, sm] = start.split(':').map(Number);
      const [eh, em] = end.split(':').map(Number);
      const diffHours = (eh + em / 60) - (sh + sm / 60);
      if (diffHours > 0) {
        setDurasi(Math.max(1, Math.round(diffHours)));
      }
    }
  };

  // Calculate Total
  const calculateTotal = (): number => {
    const basePrice = (sportPrices[sport] || 50000) * durasi;
    
    // Additional sport facilities
    const facilityTotal = fasilitas.reduce((acc, f) => acc + (facilityPrices[f] || 0), 0);

    // UMKM Minimarket pre-orders
    const umkmTotal = selectedUmkmAddons.reduce((acc, prodId) => {
      const prod = activeProducts.find(p => p.id === prodId);
      return acc + (prod ? prod.price : 0);
    }, 0);

    return basePrice + facilityTotal + umkmTotal;
  };

  const totalCalculated = calculateTotal();

  // Handle Facility Checkbox
  const toggleFacility = (item: string) => {
    setFasilitas(prev => 
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  // Handle UMKM Add-on Checkbox
  const toggleUmkmAddon = (prodId: string) => {
    setSelectedUmkmAddons(prev => 
      prev.includes(prodId) ? prev.filter(id => id !== prodId) : [...prev, prodId]
    );
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim()) {
      alert('Nama lengkap tidak boleh kosong!');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      alert('Format email tidak valid!');
      return;
    }

    if (durasi <= 0) {
      alert('Durasi booking minimal 1 jam!');
      return;
    }

    if (jamMulai >= jamSelesai) {
      alert('Jam selesai harus lebih besar dari jam mulai!');
      return;
    }

    const umkmItems = selectedUmkmAddons.map(id => {
      const prod = activeProducts.find(p => p.id === id);
      return prod ? { product: prod, quantity: 1 } : null;
    }).filter(Boolean) as { product: MinimarketProduct; quantity: number }[];

    const newBooking: Booking = {
      id: editIndex >= 0 ? bookings[editIndex].id : 'B' + (bookings.length + 1),
      nama,
      email,
      sport,
      courtName: `Lapangan ${sport} A`,
      tanggal,
      jamMulai,
      jamSelesai,
      durasi,
      fasilitasTambahan: fasilitas,
      minimarketItems: umkmItems,
      catatan,
      totalHargaNumber: totalCalculated,
      total: 'Rp ' + totalCalculated.toLocaleString('id-ID'),
      statusPembayaran: editIndex >= 0 ? bookings[editIndex].statusPembayaran : 'Pending',
      metodePembayaran: editIndex >= 0 ? bookings[editIndex].metodePembayaran : 'QRIS',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    let updatedList: Booking[];
    if (editIndex >= 0) {
      updatedList = [...bookings];
      updatedList[editIndex] = newBooking;
      setEditIndex(-1);
    } else {
      updatedList = [newBooking, ...bookings];
    }

    setBookings(updatedList);
    localStorage.setItem('bookings', JSON.stringify(updatedList));

    // Celebrate booking
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (_) {}

    alert(`Booking Berhasil Disimpan!\nID: ${newBooking.id}\nTotal: ${newBooking.total}\nSilakan lanjutkan pembayaran.`);

    // Reset Form
    setNama('');
    setEmail('');
    setCatatan('');
    setFasilitas(['Shuttlecock / Bola']);
    setSelectedUmkmAddons([]);
  };

  // Edit Booking
  const handleEdit = (index: number) => {
    const b = bookings[index];
    setNama(b.nama);
    setEmail(b.email);
    setSport(b.sport);
    setTanggal(b.tanggal);
    setJamMulai(b.jamMulai);
    setJamSelesai(b.jamSelesai);
    setDurasi(b.durasi);
    setFasilitas(b.fasilitasTambahan || []);
    if (b.minimarketItems) {
      setSelectedUmkmAddons(b.minimarketItems.map(m => m.product.id));
    }
    setCatatan(b.catatan || '');
    setEditIndex(index);

    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Delete Booking
  const handleDelete = (index: number) => {
    if (confirm('Yakin ingin menghapus data booking ini?')) {
      const updated = bookings.filter((_, i) => i !== index);
      setBookings(updated);
      localStorage.setItem('bookings', JSON.stringify(updated));
    }
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const q = searchKeyword.toLowerCase();
    return (
      b.id.toLowerCase().includes(q) ||
      b.nama.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.sport.toLowerCase().includes(q) ||
      b.tanggal.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Formulir Pemesanan Resmi
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
          FORM BOOKING LAPANGAN
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Reservasi lapangan Padel, Futsal, atau Badminton dilengkapi pilihan paket pre-order minimarket UMKM ekonomi kreatif.
        </p>
      </div>

      {/* Main Layout: Form & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Main Form Column */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>{editIndex >= 0 ? `Ubah Data Booking (${bookings[editIndex]?.id})` : 'Data Reservasi Pemain'}</span>
            </h3>
            {editIndex >= 0 && (
              <button 
                onClick={() => {
                  setEditIndex(-1);
                  setNama('');
                  setEmail('');
                  setCatatan('');
                }}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Batal Ubah
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Adamas Nizaroeddin"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Aktif *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: adamsodais6@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Jenis Olahraga (matching user prompt options: Padel, Futsal, Badminton) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Jenis Olahraga *
              </label>
              <select
                id="sportSelect"
                value={sport}
                onChange={(e) => setSport(e.target.value as SportType)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer"
              >
                <option value="Padel" data-price="120000">Padel - Rp 120.000 / jam</option>
                <option value="Futsal" data-price="150000">Futsal - Rp 150.000 / jam</option>
                <option value="Badminton" data-price="50000">Badminton - Rp 50.000 / jam</option>
              </select>
            </div>

            {/* Tanggal & Waktu */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tanggal Booking *
                </label>
                <input
                  type="date"
                  required
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Jam Mulai *
                </label>
                <input
                  type="time"
                  required
                  value={jamMulai}
                  onChange={(e) => handleTimeChange(e.target.value, jamSelesai)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Jam Selesai *
                </label>
                <input
                  type="time"
                  required
                  value={jamSelesai}
                  onChange={(e) => handleTimeChange(jamMulai, e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Durasi */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Durasi Booking (Jam)
                </label>
                <span className="text-xs font-semibold text-emerald-600">
                  {durasi} Jam Permainan
                </span>
              </div>
              <input
                id="durasi"
                type="number"
                min="1"
                max="12"
                value={durasi}
                onChange={(e) => setDurasi(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Fasilitas Tambahan (from user prompt: Shuttlecock/Bola, Sewa Raket, Sewa Sepatu, Sewa Jersey) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Fasilitas Olahraga Tambahan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Shuttlecock / Bola', price: 20000 },
                  { name: 'Sewa Raket', price: 30000 },
                  { name: 'Sewa Sepatu', price: 25000 },
                  { name: 'Sewa Jersey', price: 20000 },
                ].map((item) => (
                  <label
                    key={item.name}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      fasilitas.includes(item.name)
                        ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={fasilitas.includes(item.name)}
                        onChange={() => toggleFacility(item.name)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      +Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* INTEGRASI UMKM EKONOMI KREATIF (PRE-ORDER BUNDLE) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-300/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-extrabold text-slate-900 uppercase">
                    Pre-Order Minimarket &amp; Ekonomi Kreatif UMKM
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800">
                  Zero-Queue Loker
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Pesanan Anda akan langsung disiapkan di loker lapangan sebelum jam mulai main. Dukung ekonomi pelaku usaha mikro sekitar arena!
              </p>

              <div className="space-y-2">
                {activeProducts.slice(0, 4).map((prod) => (
                  <label
                    key={prod.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedUmkmAddons.includes(prod.id)
                        ? 'bg-white border-amber-400 text-slate-900 font-semibold shadow-xs'
                        : 'bg-white/60 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedUmkmAddons.includes(prod.id)}
                        onChange={() => toggleUmkmAddon(prod.id)}
                        className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{prod.name}</div>
                        <div className="text-[10px] text-slate-500">{prod.umkmName}</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-amber-700">
                      +Rp {prod.price.toLocaleString('id-ID')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Catatan Tambahan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Catatan Tambahan
              </label>
              <textarea
                rows={2}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: Tolong siapkan air mineral dingin di loker tim nomor 2."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Total Display & Submit */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">Total Estimasi Biaya</span>
                <span className="text-2xl font-black text-emerald-600">
                  Rp {totalCalculated.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Termasuk sewa {durasi} jam + fasilitas + belanja UMKM
                </span>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{editIndex >= 0 ? 'Simpan Perubahan' : 'Konfirmasi Booking'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right / Breakdown & Live Stats Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Order Summary Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-lg">
            <h3 className="font-extrabold text-base mb-4 flex items-center gap-2 text-emerald-400">
              <CreditCard className="w-4 h-4" />
              <span>Rincian Estimasi Booking</span>
            </h3>

            <div className="space-y-3 text-xs border-b border-slate-800 pb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Olahraga &amp; Durasi:</span>
                <span className="font-bold text-white">{sport} ({durasi} Jam)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tarif per Jam:</span>
                <span className="text-white">Rp {sportPrices[sport].toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sewa Lapangan Subtotal:</span>
                <span className="text-white">Rp {(sportPrices[sport] * durasi).toLocaleString('id-ID')}</span>
              </div>
              
              {fasilitas.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Fasilitas Tambahan:</span>
                  {fasilitas.map(f => (
                    <div key={f} className="flex justify-between text-[11px] text-slate-300">
                      <span>• {f}</span>
                      <span>+Rp {(facilityPrices[f] || 0).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedUmkmAddons.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Dukungan Produk UMKM:</span>
                  {selectedUmkmAddons.map(id => {
                    const prod = activeProducts.find(p => p.id === id);
                    if (!prod) return null;
                    return (
                      <div key={id} className="flex justify-between text-[11px] text-slate-300">
                        <span className="truncate max-w-[150px]">• {prod.name}</span>
                        <span className="text-amber-300">+Rp {prod.price.toLocaleString('id-ID')}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase">Total Akhir</span>
              <span className="text-xl font-black text-emerald-400">
                Rp {totalCalculated.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-400">
              💡 Pembayaran dapat dilakukan via <strong>QRIS</strong>, <strong>E-Wallet</strong>, atau <strong>Transfer Bank</strong> (BCA / BSI BYOND / Mandiri) di menu Pembayaran.
            </div>
          </div>

          {/* Quick Relevance Box */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
            <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dampak Ekonomi Nyata</span>
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Dengan mencentang produk UMKM di form ini, Anda menyumbang langsung pada perputaran modal <strong>Ibu Ratna Dewi</strong> (Jamu Lestari), <strong>Mas Gilang</strong> (Pengrajin Batik Grip), dan mitra kreatif lokal lainnya.
            </p>
          </div>
        </div>
      </div>

      {/* DATA BOOKING TABLE SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Data Booking Lapangan
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar reservasi tercatat dalam sistem ({filteredBookings.length} dari {bookings.length} booking)
            </p>
          </div>

          {/* Search and Reset */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="searchBooking"
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Cari ID, Nama, Olahraga..."
                className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 w-48 sm:w-64 transition-colors"
              />
            </div>
            <button
              id="resetSearch"
              onClick={() => setSearchKeyword('')}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table id="bookingTable" className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Nama</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Olahraga</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Jam Main</th>
                <th className="p-3.5">Total Biaya</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400 text-xs">
                    Tidak ditemukan data booking yang sesuai pencarian.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b, idx) => {
                  const originalIndex = bookings.findIndex(item => item.id === b.id);
                  return (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{b.id}</td>
                      <td className="p-3.5 font-semibold text-slate-900">{b.nama}</td>
                      <td className="p-3.5 text-slate-500">{b.email}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.sport === 'Padel' ? 'bg-amber-100 text-amber-800' :
                          b.sport === 'Futsal' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-cyan-100 text-cyan-800'
                        }`}>
                          {b.sport}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600">{b.tanggal}</td>
                      <td className="p-3.5 text-slate-600 font-mono">
                        {b.jamMulai} - {b.jamSelesai}
                      </td>
                      <td className="p-3.5 font-bold text-emerald-600">{b.total}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.statusPembayaran === 'Success' ? 'bg-emerald-100 text-emerald-800' :
                          b.statusPembayaran === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {b.statusPembayaran}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setViewingBooking(b)}
                            title="Lihat Detail"
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleEdit(originalIndex)}
                            title="Ubah Data"
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(originalIndex)}
                            title="Hapus"
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          {b.statusPembayaran !== 'Success' && (
                            <button
                              onClick={() => {
                                if (navigateToPayment) {
                                  navigateToPayment(b.id);
                                }
                                if (setActiveTab) {
                                  setActiveTab('payment');
                                }
                              }}
                              className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer"
                            >
                              Bayar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW BOOKING MODAL */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Detail Reservasi
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  ID: {viewingBooking.id}
                </h3>
              </div>
              <button
                onClick={() => setViewingBooking(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px]">Nama Pemesan</span>
                  <span className="font-bold text-slate-900">{viewingBooking.nama}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email</span>
                  <span className="font-semibold text-slate-800">{viewingBooking.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Cabang Olahraga</span>
                  <span className="font-bold text-emerald-600">{viewingBooking.sport}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Tanggal Main</span>
                  <span className="font-semibold text-slate-800">{viewingBooking.tanggal}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Waktu Permainan</span>
                  <span className="font-mono font-bold text-slate-900">{viewingBooking.jamMulai} - {viewingBooking.jamSelesai} ({viewingBooking.durasi} jam)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Status Pembayaran</span>
                  <span className="font-bold text-emerald-600">{viewingBooking.statusPembayaran}</span>
                </div>
              </div>

              {viewingBooking.fasilitasTambahan && viewingBooking.fasilitasTambahan.length > 0 && (
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Fasilitas Olahraga:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingBooking.fasilitasTambahan.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {viewingBooking.minimarketItems && viewingBooking.minimarketItems.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70">
                  <span className="font-bold text-amber-900 block mb-1">Pre-Order Minimarket UMKM:</span>
                  <div className="space-y-1">
                    {viewingBooking.minimarketItems.map((item, i) => (
                      <div key={i} className="flex justify-between text-[11px] text-amber-950">
                        <span>• {item.product.name} ({item.product.umkmName})</span>
                        <span className="font-semibold">Rp {item.product.price.toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewingBooking.catatan && (
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Catatan Khusus:</span>
                  <p className="p-2.5 rounded-lg bg-slate-100 text-slate-700 italic text-[11px]">
                    "{viewingBooking.catatan}"
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Pembayaran</span>
                <span className="text-xl font-black text-emerald-600">{viewingBooking.total}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setViewingBooking(null);
                  if (navigateToPayment) {
                    navigateToPayment(viewingBooking.id);
                  }
                  if (setActiveTab) {
                    setActiveTab('payment');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Buka Menu Pembayaran</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
