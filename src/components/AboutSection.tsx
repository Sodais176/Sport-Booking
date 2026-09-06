import React from 'react';
import { 
  Info, 
  Award, 
  CheckCircle2, 
  HeartHandshake,
  Cpu,
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  ShoppingBag,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    'Registrasi & Manajemen Data Pengguna',
    'Katalog Lapangan Lengkap (Padel, Futsal, Badminton)',
    'Filter Jenis Olahraga & Detail Spesifikasi Lantai',
    'Booking Lapangan Online Interaktif (Hitung Durasi Otomatis)',
    'Integrasi Pre-Order Minimarket & Produk Kreatif UMKM',
    'Multi-Channel Payment (QRIS, E-Wallet, Transfer Bank)',
    'Simulasi Verifikasi Bukti Struk Transfer (BCA, BSI BYOND, Mandiri)',
    'Preview Cuplikan Gambar & Video Lapangan Olahraga',
    'Dashboard Grafik Transaksi & Status Pembayaran Real-Time',
    'Sistem Ulasan Testimoni & Indeks Kepuasan Pengunjung Dinamis',
    'Responsive Design (Desktop, Tablet, Mobile Ready)',
    'Simulasi Perputaran Kas & Dampak Finansial UMKM Lokal'
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Informasi Proyek &amp; Tim Pengembang
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
          TENTANG SISTEM INFORMASI
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Sistem Informasi Booking Lapangan Olahraga Terintegrasi Pemberdayaan UMKM Ekonomi Kreatif.
        </p>
      </div>

      {/* Main About Description Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              Sport Booking System 2026
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              <strong>Sport Booking System</strong> adalah sistem informasi berbasis web modern yang dirancang untuk mempermudah masyarakat dalam melakukan pemesanan lapangan olahraga secara online, cepat, dan transparan, sekaligus mengintegrasikan para pelaku <strong>UMKM ekonomi kreatif</strong> (seperti minimarket arena, penyedia hidrasi sehat alami, serta kriya perlengkapan olahraga) dalam satu ekosistem transaksi digital yang saling menguntungkan.
            </p>
          </div>
        </div>

        {/* Tujuan Sistem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <h4 className="font-extrabold text-base text-slate-900 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Tujuan Sistem Olahraga</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mempermudah proses reservasi lapangan olahraga secara cepat, aman, dan efisien tanpa harus datang langsung ke lokasi fisik, serta memberikan transparansi jadwal dan tarif sewa.
            </p>
          </div>

          <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200/80">
            <h4 className="font-extrabold text-base text-emerald-950 mb-2 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
              <span>Tujuan Pemberdayaan UMKM</span>
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Membuka akses pasar yang pasti (captive market) bagi pedagang minimarket dan pengrajin ekonomi kreatif sekitar arena melalui fitur pre-order produk hidrasi dan snack nutrisi terintegrasi.
            </p>
          </div>
        </div>

        {/* Fitur Utama */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-extrabold text-base text-slate-900 mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>Fitur-Fitur Unggulan Sistem:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-150 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Lokasi, Jam Buka & Kontak */}
        <div className="pt-6 border-t border-slate-100">
          <h4 className="font-extrabold text-base text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Informasi Lokasi &amp; Kontak Resmi Arena</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Lokasi Arena</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Marba &amp; Jasmine Residence, Jl. Masjid Al-Wustho No.10, RT.17/RW.7, Pondok Bambu, Duren Sawit, East Jakarta City, Jakarta 13430.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Jam Operasional</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap Hari: 07.00 - 22.00 WIB (Senin s.d. Minggu &amp; Kecuali Hari Libur Nasional).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>Layanan Kontak</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                WhatsApp: +62 813-1574-6759 <br />
                Kantor: (0818) 747-742 | Email: adamsodais6@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
