import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  ArrowRight, 
  Smartphone, 
  Building2, 
  Eye, 
  X,
  Sparkles
} from 'lucide-react';
import { Booking, PaymentRecord } from '../types';
import confetti from 'canvas-confetti';

interface PaymentSectionProps {
  bookings?: Booking[];
  payments?: PaymentRecord[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentRecord[]>>;
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  selectedBookingId?: string;
  setActiveTab?: (tab: string) => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  bookings = [],
  payments = [],
  setPayments,
  setBookings,
  selectedBookingId,
  setActiveTab
}) => {
  const safeBookings = bookings || [];
  const [bookingId, setBookingId] = useState(selectedBookingId || (safeBookings[0]?.id ?? 'B1'));
  const [namaLengkap, setNamaLengkap] = useState('');
  const [metode, setMetode] = useState<'QRIS' | 'E-Wallet' | 'Transfer Bank'>('QRIS');
  const [bankOrWallet, setBankOrWallet] = useState('QRIS Nasional');
  const [nominal, setNominal] = useState<number>(240000);
  const [catatan, setCatatan] = useState('');
  const [receiptFile, setReceiptFile] = useState<string | null>('BSI-BYOND');
  const [viewingReceipt, setViewingReceipt] = useState<PaymentRecord | null>(null);

  // When booking selection changes, auto-fill details
  const handleBookingChange = (id: string) => {
    setBookingId(id);
    const found = safeBookings.find(b => b.id === id);
    if (found) {
      setNamaLengkap(found.nama);
      setNominal(found.totalHargaNumber);
    }
  };

  const handleMetodeChange = (m: 'QRIS' | 'E-Wallet' | 'Transfer Bank') => {
    setMetode(m);
    if (m === 'QRIS') setBankOrWallet('QRIS Merchant Baso Jono / Arena Sport');
    if (m === 'E-Wallet') setBankOrWallet('GoPay / OVO / DANA (0813-1574-6759)');
    if (m === 'Transfer Bank') setBankOrWallet('BCA (528-091-8899) a.n Muhammad Sodais Adam');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!namaLengkap.trim()) {
      alert('Nama lengkap tidak boleh kosong!');
      return;
    }

    const newPayment: PaymentRecord = {
      id: 'PAY-00' + (payments.length + 1),
      bookingId,
      namaLengkap,
      metode,
      bankOrWallet,
      nominal: Number(nominal),
      status: 'Success',
      buktiUrl: receiptFile || 'Uploaded-File',
      catatan,
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    const updatedPayments = [newPayment, ...payments];
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));

    // Update corresponding booking status to 'Success'
    const updatedBookings = bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          statusPembayaran: 'Success' as const,
          metodePembayaran: `${metode} (${bankOrWallet})`
        };
      }
      return b;
    });
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (_) {}

    alert(`Pembayaran Berhasil Diverifikasi!\nID Pembayaran: ${newPayment.id}\nBooking ID: ${bookingId}\nStatus: Sukses. Lapangan dan paket minimarket UMKM telah terkonfirmasi.`);
  };

  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Portal Pembayaran Digital Terpadu
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
          PEMBAYARAN SPORT BOOKING &amp; UMKM
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Satu saluran pembayaran digital untuk sewa lapangan dan belanja minimarket UMKM ekonomi kreatif via QRIS, E-Wallet, atau Transfer Bank.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Upload & Konfirmasi */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-600" />
              <span>Upload &amp; Konfirmasi Pembayaran</span>
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
              Real-Time Verification
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pilih ID Booking */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Pilih ID Booking *
              </label>
              <select
                value={bookingId}
                onChange={(e) => handleBookingChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {bookings.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.id} - {b.nama} ({b.sport}, {b.total}, Status: {b.statusPembayaran})
                  </option>
                ))}
              </select>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nama Lengkap Pembayar *
              </label>
              <input
                type="text"
                required
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                placeholder="Nama sesuai rekening / e-wallet"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Metode Pembayaran Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Metode Pembayaran *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'QRIS', label: 'QRIS', icon: QrCode },
                  { id: 'E-Wallet', label: 'E-Wallet', icon: Smartphone },
                  { id: 'Transfer Bank', label: 'Transfer Bank', icon: Building2 },
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = metode === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleMetodeChange(item.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rekening Tujuan / Info Channel */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-600 block text-[11px] uppercase">
                Tujuan Pembayaran Terpilih:
              </span>
              <div className="font-mono font-bold text-emerald-800 text-sm">
                {bankOrWallet}
              </div>
              <p className="text-[11px] text-slate-500">
                Otomatis dialokasikan: Biaya operasional lapangan + bagi hasil UMKM minimarket arena.
              </p>
            </div>

            {/* Nominal Pembayaran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nominal Pembayaran (Rp) *
              </label>
              <input
                type="number"
                required
                value={nominal}
                onChange={(e) => setNominal(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Bukti Transfer Presets / File Simulation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Bukti Transfer / Struk Pembayaran
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                {[
                  { id: 'BSI-BYOND', label: 'BSI BYOND (Rp 240.000)', sub: 'Ref FT26127VRK15' },
                  { id: 'BCA-528K', label: 'BCA Mobile (Rp 528.000)', sub: 'Ref 973BB945' },
                  { id: 'BCA-241K', label: 'Mandiri BI Fast (Rp 241.500)', sub: 'Ref 20260625' },
                ].map(receipt => (
                  <button
                    type="button"
                    key={receipt.id}
                    onClick={() => setReceiptFile(receipt.id)}
                    className={`p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                      receiptFile === receipt.id
                        ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="truncate">{receipt.label}</div>
                    <div className="text-[10px] text-slate-400">{receipt.sub}</div>
                  </button>
                ))}
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-emerald-500 transition-colors bg-slate-50">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-700 block">
                  Pilih file bukti transfer dari perangkat (JPG, PNG, PDF)
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Maksimum 5MB • Terenkripsi aman
                </span>
              </div>
            </div>

            {/* Catatan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Catatan Tambahan
              </label>
              <textarea
                rows={2}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: Transfer atas nama Adamas untuk booking Futsal + Snack UMKM"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Konfirmasi &amp; Verifikasi Pembayaran</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: QRIS Display & Payment Guide */}
        <div className="lg:col-span-5 space-y-6">
          {/* QRIS Card with realistic layout */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-extrabold mb-4 uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>QRIS Standar Pembayaran Nasional</span>
            </div>

            <div className="text-base font-black text-slate-900 mb-1">
              BASO JONO / ARENA SPORT &amp; UMKM
            </div>
            <div className="text-xs text-slate-500 mb-4">
              NMID: ID1020038849201 • A01
            </div>

            {/* QRIS Graphic SVG */}
            <div className="mx-auto w-48 h-48 bg-white p-3 rounded-2xl border-2 border-slate-900 shadow-md flex items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Simulated high-fidelity QR Code blocks */}
                <rect width="100" height="100" fill="white" />
                {/* Corner Top-Left */}
                <rect x="5" y="5" width="28" height="28" fill="#0f172a" />
                <rect x="9" y="9" width="20" height="20" fill="white" />
                <rect x="13" y="13" width="12" height="12" fill="#0f172a" />
                {/* Corner Top-Right */}
                <rect x="67" y="5" width="28" height="28" fill="#0f172a" />
                <rect x="71" y="9" width="20" height="20" fill="white" />
                <rect x="75" y="13" width="12" height="12" fill="#0f172a" />
                {/* Corner Bottom-Left */}
                <rect x="5" y="67" width="28" height="28" fill="#0f172a" />
                <rect x="9" y="71" width="20" height="20" fill="white" />
                <rect x="13" y="75" width="12" height="12" fill="#0f172a" />
                {/* Data Patterns */}
                <rect x="38" y="8" width="8" height="8" fill="#0f172a" />
                <rect x="50" y="8" width="8" height="8" fill="#0f172a" />
                <rect x="38" y="20" width="8" height="8" fill="#0f172a" />
                <rect x="42" y="38" width="16" height="16" fill="#059669" />
                <rect x="10" y="38" width="6" height="6" fill="#0f172a" />
                <rect x="22" y="44" width="8" height="8" fill="#0f172a" />
                <rect x="66" y="38" width="8" height="8" fill="#0f172a" />
                <rect x="78" y="44" width="8" height="8" fill="#0f172a" />
                <rect x="38" y="66" width="8" height="8" fill="#0f172a" />
                <rect x="52" y="72" width="10" height="10" fill="#0f172a" />
                <rect x="70" y="70" width="8" height="8" fill="#0f172a" />
                <rect x="82" y="80" width="8" height="8" fill="#0f172a" />
                <circle cx="50" cy="46" r="4" fill="white" />
              </svg>
            </div>

            <div className="mt-4 text-xs font-semibold text-slate-700">
              Pindai dengan BCA Mobile, Livin Mandiri, BSI BYOND, GoPay, OVO, atau Dana
            </div>

            <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs text-emerald-900">
              <strong>Manfaat Digital UMKM:</strong> Tidak perlu uang kembalian tunai, transaksi tercatat otomatis ke pembukuan mitra minimarket, dan terhindar dari risiko uang palsu.
            </div>
          </div>

          {/* Panduan Rekening Transfer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-sm text-emerald-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Daftar Rekening Resmi Pengelola:</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex justify-between items-center">
                <div>
                  <span className="font-bold block text-white">Bank Central Asia (BCA)</span>
                  <span className="font-mono text-emerald-400">528-091-8899</span>
                </div>
                <span className="text-[11px] text-slate-400">a.n Muhammad Sodais Adam</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex justify-between items-center">
                <div>
                  <span className="font-bold block text-white">Bank Syariah Indonesia (BSI)</span>
                  <span className="font-mono text-emerald-400">719-204-1188</span>
                </div>
                <span className="text-[11px] text-slate-400">a.n Adam Sport Hub</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex justify-between items-center">
                <div>
                  <span className="font-bold block text-white">Bank Mandiri (BI Fast)</span>
                  <span className="font-mono text-emerald-400">127-00-9844512</span>
                </div>
                <span className="text-[11px] text-slate-400">a.n Sport Center Arena</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Pembayaran Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Riwayat Pembayaran Digital Terverifikasi
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar transaksi sewa lapangan &amp; belanja minimarket UMKM ({payments.length} transaksi)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                <th className="p-3.5">ID Bayar</th>
                <th className="p-3.5">ID Booking</th>
                <th className="p-3.5">Nama Pembayar</th>
                <th className="p-3.5">Metode</th>
                <th className="p-3.5">Kanal / Bank</th>
                <th className="p-3.5">Nominal</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Struk Bukti</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{p.id}</td>
                  <td className="p-3.5 font-bold text-emerald-600">{p.bookingId}</td>
                  <td className="p-3.5 font-semibold text-slate-800">{p.namaLengkap}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 font-bold text-[10px] text-slate-700">
                      {p.metode}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 truncate max-w-[160px]">{p.bankOrWallet || '-'}</td>
                  <td className="p-3.5 font-black text-emerald-600">
                    Rp {p.nominal.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 text-slate-500">{p.tanggal}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'Success' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => setViewingReceipt(p)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Lihat Struk</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal View Struk Pembayaran */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  Bukti Transaksi Sah
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Struk Pembayaran {viewingReceipt.id}
                </h3>
              </div>
              <button
                onClick={() => setViewingReceipt(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
              <div className="text-center pb-2 border-b border-dashed border-slate-300">
                <div className="font-extrabold text-sm text-slate-900">SPORT BOOKING &amp; UMKM ARENA</div>
                <div className="text-[10px] text-slate-500">Jakarta, Indonesia • Telp: +62 813-1574-6759</div>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Tanggal:</span>
                <span className="font-bold">{viewingReceipt.tanggal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ID Booking:</span>
                <span className="font-bold text-emerald-700">{viewingReceipt.bookingId}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pembayar:</span>
                <span className="font-bold">{viewingReceipt.namaLengkap}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Kanal Pembayaran:</span>
                <span className="font-bold">{viewingReceipt.metode}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Referensi:</span>
                <span className="text-[11px] truncate max-w-[150px]">{viewingReceipt.bankOrWallet}</span>
              </div>

              <div className="pt-2 border-t border-dashed border-slate-300 flex justify-between items-center text-sm">
                <span className="font-extrabold text-slate-900">TOTAL DIBAYAR:</span>
                <span className="font-black text-emerald-600">
                  Rp {viewingReceipt.nominal.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="text-center pt-2 text-[10px] text-emerald-700 font-sans font-semibold">
                ✓ Transaksi Sah &amp; Berkontribusi ke UMKM Ekonomi Kreatif
              </div>
            </div>

            <button
              onClick={() => setViewingReceipt(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
            >
              Tutup Struk
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
