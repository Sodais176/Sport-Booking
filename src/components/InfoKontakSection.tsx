import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  MessageCircle, 
  HelpCircle, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Send,
  Navigation,
  Check,
  CreditCard,
  QrCode
} from 'lucide-react';
import { MinimarketProduct } from '../types';

interface InfoKontakSectionProps {
  products?: MinimarketProduct[];
  setActiveTab: (tab: string) => void;
  initialSubTab?: 'produk' | 'panduan' | 'lokasi' | 'kontak';
}

export const InfoKontakSection: React.FC<InfoKontakSectionProps> = ({
  products = [],
  setActiveTab,
  initialSubTab = 'panduan'
}) => {
  const [subTab, setSubTab] = useState<'produk' | 'panduan' | 'lokasi' | 'kontak'>(initialSubTab);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    subject: 'Pertanyaan Booking & Produk',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);

  // Address and contact details
  const fullAddress = "Marba Jasmine Residence, Jl. Masjid Al-Wustho kav. 10, RT.17/RW.7, Pd. Bambu, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13430";
  const phoneNumber = "+62 813-1574-6759";
  const officePhone = "+62 818-747-742";
  const emailAddress = "adamsodais6@gmail.com";

  const handleCopy = (text: string, type: 'address' | 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'address') {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;
    setFormSent(true);
    setTimeout(() => {
      setContactForm({
        name: '',
        phone: '',
        subject: 'Pertanyaan Booking & Produk',
        message: ''
      });
      setFormSent(false);
    }, 4000);
  };

  // Curated Featured Products
  const featuredProductsList = products.length > 0 
    ? products.slice(0, 6)
    : [
        {
          id: 'feat-1',
          name: 'Isotonik Herbal Citrus 500ml',
          category: 'Minuman Sehat',
          price: 15000,
          umkmName: 'UMKM Jamu Lestari Jogja',
          badge: 'Best Seller Hidrasi',
          rating: 4.9,
          description: 'Elektrolit alami kelapa muda segar, jeruk nipis, dan ekstrak jahe merah tanpa pemanis buatan.'
        },
        {
          id: 'feat-2',
          name: 'Grip Raket Kriya Motif Batik Jogja',
          category: 'Merchandise & Kriya',
          price: 25000,
          umkmName: 'Studio Kriya Sporty Batik',
          badge: 'Produk Seni Kreatif',
          rating: 5.0,
          description: 'Grip raket anti-slip kain berdaya serap keringat tinggi dengan corak batik parang khas pengrajin lokal.'
        },
        {
          id: 'feat-3',
          name: 'Energy Bar Pisang & Madu Hutan',
          category: 'Snack Energi',
          price: 14000,
          umkmName: 'UMKM NutriSnack Nusantara',
          badge: 'Booster Stamina',
          rating: 4.7,
          description: 'Camilan padat gizi dari oats organik, pisang sale lokal, dan madu hutan murni Sumbawa.'
        },
        {
          id: 'feat-4',
          name: 'Shuttlecock Tabung (Isi 12) Point Spin',
          category: 'Perlengkapan Olahraga',
          price: 75000,
          umkmName: 'Koperasi Pengrajin Kok Tegal',
          badge: 'Standar PBSI',
          rating: 4.9,
          description: 'Kok badminton bulu angsa asli hasil buatan tangan pengrajin lokal dengan kestabilan putaran teruji.'
        },
        {
          id: 'feat-5',
          name: 'Roti Gandum Bakar Coklat Pisang',
          category: 'Snack Energi',
          price: 18000,
          umkmName: 'Dapur Roti Kreatif Bu Endang',
          badge: 'Segar Dipanggang',
          rating: 4.9,
          description: 'Roti gandum utuh panggang hangat dengan isian pisang raja karamel dan cokelat rendah kalori.'
        },
        {
          id: 'feat-6',
          name: 'Jersey Dry-Fit Custom Sablon Kreatif',
          category: 'Merchandise & Kriya',
          price: 85000,
          umkmName: 'Creative Apparel Sablon Sport',
          badge: 'Desain Kreatif',
          rating: 4.8,
          description: 'Jersey olahraga berpori mikro yang nyaman menyerap keringat dengan sentuhan grafis buatan desainer muda.'
        }
      ];

  const orderingSteps = [
    {
      step: '01',
      title: 'Pilih Cabang & Lapangan Olahraga',
      desc: 'Buka menu Lapangan untuk melihat spesifikasi detail arena: Futsal Rumput Sintetis/Interlock, Padel Court Dinding Kaca Panoramik, atau Badminton Karpet Vinyl Standar BWF.',
      icon: Calendar,
      actionText: 'Lihat Lapangan',
      actionTab: 'lapangan'
    },
    {
      step: '02',
      title: 'Tentukan Jadwal & Durasi Main',
      desc: 'Tentukan tanggal main, jam mulai (misal: 19.00 WIB), dan durasi bermain (1 - 4 jam). Sistem akan secara otomatis menghitung total tarif sewa secara transparan.',
      icon: Clock,
      actionText: 'Mulai Booking',
      actionTab: 'booking'
    },
    {
      step: '03',
      title: 'Pilih Produk Unggulan UMKM (Add-on)',
      desc: 'Tambahkan produk hidrasi dingin, snack nutrisi, sewa raket, atau grip handuk batik pada formulir booking. Pesanan akan disiapkan langsung di bench pemain saat Anda tiba tanpa perlu mengantre.',
      icon: ShoppingBag,
      actionText: 'Buka Katalog UMKM',
      actionTab: 'minimarket'
    },
    {
      step: '04',
      title: 'Isi Data Diri & Konfirmasi',
      desc: 'Lengkapi nama pemesan, nomor WhatsApp aktif (untuk konfirmasi e-tiket otomatis), dan nama tim atau komunitas olahraga Anda.',
      icon: ShieldCheck,
      actionText: 'Formulir Pemesanan',
      actionTab: 'booking'
    },
    {
      step: '05',
      title: 'Pembayaran Digital Cepat (QRIS / Transfer)',
      desc: 'Bayar gabungan sewa lapangan & pesanan minimarket dalam satu tagihan melalui QRIS Nasional (bebas biaya admin), E-Wallet (GoPay, OVO, Dana, ShopeePay), atau Transfer Bank.',
      icon: QrCode,
      actionText: 'Menu Pembayaran',
      actionTab: 'payment'
    },
    {
      step: '06',
      title: 'Tiba di Lokasi & Nikmati Pertandingan',
      desc: 'Tunjukkan kode ID Booking di meja resepsionis arena. Lapangan Anda siap digunakan dan paket belanja UMKM sudah tersedia di bench lapangan!',
      icon: CheckCircle2,
      actionText: 'Cek Status Booking',
      actionTab: 'payment'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pusat Informasi &amp; Layanan Pelanggan Terpadu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Informasi Layanan, Pemesanan, Lokasi &amp; Kontak
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Temukan panduan lengkap cara melakukan reservasi lapangan, katalog produk unggulan binaan UMKM lokal, rute lokasi arena olahraga, hingga saluran komunikasi langsung dengan tim kami.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-slate-800/80">
          <button
            onClick={() => setSubTab('panduan')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              subTab === 'panduan'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Cara Pemesanan</span>
          </button>

          <button
            onClick={() => setSubTab('produk')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              subTab === 'produk'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Produk Unggulan UMKM</span>
          </button>

          <button
            onClick={() => setSubTab('lokasi')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              subTab === 'lokasi'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Lokasi &amp; Akses Arena</span>
          </button>

          <button
            onClick={() => setSubTab('kontak')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              subTab === 'kontak'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Kontak &amp; Customer Care</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CARA PEMESANAN */}
      {subTab === 'panduan' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Alur Booking Cepat
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Panduan Langkah Pemesanan Lapangan &amp; UMKM
              </h2>
              <p className="text-slate-600 text-sm mt-1.5">
                Ikuti 6 langkah mudah berikut untuk mengamankan jadwal bermain dan pre-order kebutuhan hidrasi Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderingSteps.map((s, idx) => {
                const IconComp = s.icon;
                return (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-sm">
                          LANGKAH {s.step}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-2">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {s.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab(s.actionTab)}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{s.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Syarat & Ketentuan Singkat */}
            <div className="mt-8 p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
              <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ketentuan Penting Reservasi &amp; Pembatalan</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>Harap hadir minimal 10 menit sebelum jam mulai sewa untuk registrasi ulang.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>Reschedule jadwal dapat dilakukan maksimal 6 jam sebelum waktu bermain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>Wajib menggunakan sepatu olahraga yang sesuai dengan jenis permukaan lapangan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>Produk minimarket yang telah dibayar akan ditaruh di loker/bench nomor lapangan Anda.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: PRODUK UNGGULAN */}
      {subTab === 'produk' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Etalase Kreatif
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  Produk Unggulan Binaan UMKM Arena
                </h2>
                <p className="text-slate-600 text-sm mt-1.5">
                  Produk pilihan bernilai tambah tinggi yang diproduksi oleh pengrajin dan pelaku usaha mikro sekitar gelanggang olahraga.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('minimarket')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lihat Semua di Minimarket</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProductsList.map((prod: any) => (
                <div
                  key={prod.id}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                        {prod.badge || prod.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{prod.rating || '4.9'}</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base mt-1">
                      {prod.name}
                    </h3>
                    
                    <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                      Produsen: {prod.umkmName}
                    </p>

                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Harga UMKM</div>
                      <div className="text-base font-black text-slate-900">
                        Rp {Number(prod.price).toLocaleString('id-ID')}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('booking')}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Pre-Order</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Nilai Lebih Produk UMKM */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                  ✓
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Higienis &amp; Terverifikasi</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Seluruh produk makanan dan minuman memiliki izin edar higienis dan bahan alami segar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                  ❤
                </div>
                <h4 className="font-bold text-slate-900 text-sm">100% Karya Lokal</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Langsung memberdayakan pengrajin, petani jeruk/kelapa, dan UMKM makanan rumahan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                  ⚡
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Layanan Antar ke Bench</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Barang siap dinikmati di tepi lapangan tanpa repot mengantre di kasir.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: LOKASI & AKSES ARENA */}
      {subTab === 'lokasi' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Denah &amp; Aksesibilitas
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Lokasi Arena Olahraga &amp; Sentra UMKM
              </h2>
              <p className="text-slate-600 text-sm mt-1.5">
                Berlokasi strategis di pusat kota dengan akses mudah, area parkir luas, dan fasilitas pendukung lengkap.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Detail Alamat & Jam Buka */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Alamat Lengkap</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {fullAddress}
                      </p>
                      <button
                        onClick={() => handleCopy(fullAddress, 'address')}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {copiedAddress ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Alamat Disalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Alamat</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Jam Operasional</h3>
                      <div className="text-xs text-slate-600 mt-1 space-y-1">
                        <p><strong>Senin - Jumat:</strong> 07.00 - 22.00 WIB</p>
                        <p><strong>Sabtu - Minggu:</strong> 07.00 - 22.00 WIB</p>
                        <p className="text-emerald-700 font-medium">Buka Setiap Hari (Kecuali Hari Libur Nasional)</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Rute &amp; Transportasi</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Kendaraan Pribadi (Mobil/Motor): Dari area Pondok Bambu, waktu tempuh sekitar 4 menit berkendara mengikuti arah menuju Jl. Masjid Al-Wustho. Anda dapat memantau rute secara langsung melalui Waze atau Google Maps.
                        
                        Transportasi Umum: Estimasi waktu tempuh sekitar 24–25 menit menggunakan kombinasi angkutan umum atau ojek online dari titik sekitar Pondok Bambu.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fasilitas Arena */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Fasilitas Penunjang di Lokasi:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Parkir 50+ Mobil</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Parkir 150+ Motor</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Shower Panas &amp; Dingin</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Loker Pemain Ber-Kunci</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Musholla Nyaman Ber-AC</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Free High-Speed Wi-Fi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Maps Card */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-100 flex-1 min-h-[340px] flex flex-col">
                  {/* Visual Map Representation */}
                  <div className="w-full h-72 sm:h-80 relative overflow-hidden bg-slate-200">
                    <iframe
                      title="Marba Jasmine Residence"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.140004033149!2d106.90490547523878!3d-6.245273993743081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3c4d4a2eed1%3A0xc8e130fc7eb76d9!2sMarba%20Jasmine%20Residence!5e0!3m2!1sen!2sid!4v1788591370032!5m2!1sen!2sid"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Titik Koordinat GPS: -6.245274,106.9049055,17
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Ketik "Marba Jasmine Residence" di aplikasi Maps Anda.
                      </div>
                    </div>

                    <a
                      href="https://www.google.com/maps/place/Marba+Jasmine+Residence/@-6.245274,106.9049055,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f3c4d4a2eed1:0xc8e130fc7eb76d9!8m2!3d-6.245274!4d106.9074804!16s%2Fg%2F11hh5z50r_?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Petunjuk Arah Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: KONTAK & CUSTOMER CARE */}
      {subTab === 'kontak' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Hubungi Kami
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Kontak &amp; Saluran Layanan Pelanggan
              </h2>
              <p className="text-slate-600 text-sm mt-1.5">
                Punya pertanyaan seputar jadwal sewa, kerjasama titip produk UMKM, atau butuh bantuan pembayaran? Hubungi kami langsung.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Direct Channels */}
              <div className="lg:col-span-5 space-y-4">
                {/* WhatsApp Card */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">WhatsApp Customer Service</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Respon cepat 7 hari seminggu (07.00 - 22.00 WIB)</p>
                      <p className="text-sm font-extrabold text-emerald-700 mt-1">{phoneNumber}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`https://wa.me/6281315746759`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp Sekarang</span>
                    </a>
                    <button
                      onClick={() => handleCopy(phoneNumber, 'phone')}
                      className="p-2 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-slate-700 transition-colors"
                      title="Salin Nomor WhatsApp"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Telepon Kantor */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Telepon Kantor Arena</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Front desk &amp; informasi operasional</p>
                      <p className="text-sm font-bold text-slate-800 mt-1">{officePhone}</p>
                    </div>
                  </div>
                  <a
                    href="tel:0818747742"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 text-xs font-semibold"
                  >
                    Telepon
                  </a>
                </div>

                {/* Email Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Email Resmi</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Kerjasama kemitraan &amp; bantuan teknis</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">{emailAddress}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(emailAddress, 'email')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    {copiedEmail ? 'Disalin' : 'Salin'}
                  </button>
                </div>
              </div>

              {/* Form Pesan Langsung */}
              <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  Kirim Pesan atau Pertanyaan Cepat
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Tinggalkan pesan Anda di sini, tim kami akan merespons melalui WhatsApp atau email dalam waktu maksimal 1x24 jam.
                </p>

                {formSent ? (
                  <div className="p-6 rounded-xl bg-emerald-100/80 border border-emerald-300 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-extrabold text-slate-900 text-base">Pesan Anda Berhasil Terkirim!</h4>
                    <p className="text-xs text-slate-600">
                      Terima kasih atas pesan Anda. Customer service kami akan segera menghubungi Anda.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Misal: Budi Santoso"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp / HP *</label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="0812xxxxxxxx"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Topik</label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Pertanyaan Booking & Lapangan">Pertanyaan Booking &amp; Lapangan</option>
                        <option value="Pre-Order Produk Minimarket UMKM">Pre-Order Produk Minimarket UMKM</option>
                        <option value="Kerjasama Titip Produk / Kemitraan UMKM">Kerjasama Titip Produk / Kemitraan UMKM</option>
                        <option value="Bantuan Pembayaran & Bukti Transfer">Bantuan Pembayaran &amp; Bukti Transfer</option>
                        <option value="Saran & Kritik Layanan Arena">Saran &amp; Kritik Layanan Arena</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Isi Pesan *</label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tuliskan detail pertanyaan atau kebutuhan Anda di sini..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Pesan ke Customer Service</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
