import { Court, MinimarketProduct, Booking, PaymentRecord, Testimonial } from '../types';

export const INITIAL_COURTS: Court[] = [
  {
    id: 'court-futsal-a',
    name: 'Lapangan Futsal A',
    sport: 'Futsal',
    pricePerHour: 150000,
    description: 'Lapangan futsal indoor dengan rumput sintetis berstandar nasional dan sistem pencahayaan LED premium tanpa silau.',
    facilities: ['Rumput Sintetis Monofilamen', 'Pencahayaan LED 500 Lux', 'Scoreboard Digital', 'Ruang Ganti & Shower', 'Pojok UMKM Minimarket'],
    imageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80',
    availableHours: '07:00 - 24:00 WIB',
    surface: 'Sintetis Monofilamen Grade A'
  },
  {
    id: 'court-padel-a',
    name: 'Lapangan Padel A',
    sport: 'Padel',
    pricePerHour: 120000,
    description: 'Lapangan padel modern dengan dinding kaca tempered 12mm, karpet texturised turf, serta area tunggu santai dekat minimarket.',
    facilities: ['Kaca Tempered Panoramik', 'Textured Turf Turfgrass', 'Net Tournament Grade', 'Lounge Pemain Ber-AC', 'Akses Cepat Kantin UMKM'],
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1000&q=80',
    availableHours: '06:00 - 23:00 WIB',
    surface: 'Synthetic Padel Turf + Sand Filled'
  },
  {
    id: 'court-badminton-a',
    name: 'Lapangan Badminton A',
    sport: 'Badminton',
    pricePerHour: 50000,
    description: 'Lapangan badminton indoor dengan lantai karpet vinyl / parket kayu berkualitas tinggi, sirkulasi udara sejuk, dan bebas hembusan angin.',
    facilities: ['Karpet Vinyl BWF Standard', 'Ventilasi Silang Alami', 'Kursi Wasit Resmi', 'Loker Penyimpanan Barang', 'Booth Minuman Dingin UMKM'],
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    availableHours: '08:00 - 23:00 WIB',
    surface: 'Vinyl Court Mat BWF Approved'
  }
];

export const INITIAL_PRODUCTS: MinimarketProduct[] = [
  {
    id: 'prod-1',
    name: 'Isotonik Herbal Citrus 500ml',
    category: 'Minuman Sehat',
    price: 15000,
    umkmName: 'UMKM Jamu Lestari Kreatif',
    umkmOwner: 'Ibu Ratna Dewi',
    description: 'Minuman hidrasi alami elektrolit kelapa murni, sari jeruk nipis, dan ekstrak jahe merah tanpa pemanis buatan.',
    badge: 'Best Seller Pemain',
    stock: 45,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-2',
    name: 'Cold Pressed Watermelon Booster',
    category: 'Minuman Sehat',
    price: 22000,
    umkmName: 'Juice Bar UMKM Segar Alami',
    umkmOwner: 'Mas Hendra',
    description: 'Sari semangka murni kaya L-citrulline untuk mencegah kram otot saat dan setelah bermain futsal atau badminton.',
    badge: 'Anti-Kram',
    stock: 28,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-3',
    name: 'Air Mineral Pegunungan Dingin 600ml',
    category: 'Minuman Sehat',
    price: 5000,
    umkmName: 'Koperasi Minimarket Arena',
    umkmOwner: 'Pak Bambang',
    description: 'Air mineral murni steril dalam kondisi dingin segar langsung dari pendingin minimarket arena.',
    badge: 'Esensial Olahraga',
    stock: 120,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1559839914-ba2a0f8b8981?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-4',
    name: 'Energy Bar Pisang & Madu Hutan',
    category: 'Snack Energi',
    price: 14000,
    umkmName: 'UMKM NutriSnack Nusantara',
    umkmOwner: 'Mbak Dinda',
    description: 'Snack padat gizi dari oats organik, pisang sale lokal, kacang almond, dan madu hutan murni Sumbawa.',
    badge: 'Energi Cepat',
    stock: 50,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-5',
    name: 'Roti Gandum Bakar Coklat Pisang',
    category: 'Snack Energi',
    price: 18000,
    umkmName: 'Dapur Roti Kreatif Bu Endang',
    umkmOwner: 'Ibu Endang W.',
    description: 'Roti gandum segar panggang hangat dengan isian pisang raja karamel dan selai coklat artisan rendah gula.',
    badge: 'Segar Dipanggang',
    stock: 20,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-6',
    name: 'Grip Raket Kriya Motif Batik Jogja',
    category: 'Merchandise & Kriya',
    price: 25000,
    umkmName: 'Studio Kriya Sporty Batik',
    umkmOwner: 'Mas Gilang',
    description: 'Grip raket badminton & padel anti-slip premium bercorak batik parang dan kawung khas pengrajin lokal.',
    badge: 'Produk Seni Kreatif',
    stock: 35,
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-7',
    name: 'Jersey Dry-Fit Custom Sablon Kreatif',
    category: 'Merchandise & Kriya',
    price: 85000,
    umkmName: 'Creative Apparel Sablon Sport',
    umkmOwner: 'Mas Fajar & Tim',
    description: 'Jersey olahraga berpori mikro menyerap keringat dengan sentuhan grafis tipografi karya desainer muda.',
    badge: 'Desain Kreatif',
    stock: 18,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-8',
    name: 'Shuttlecock Tabung (Isi 12) Point Spin',
    category: 'Perlengkapan Olahraga',
    price: 75000,
    umkmName: 'Koperasi Pengrajin Kok Tegal',
    umkmOwner: 'Pak Slamet',
    description: 'Kok badminton bulu angsa asli hasil kerajinan pengrajin Tegal dengan kestabilan putaran teruji.',
    badge: 'Standar PBSI',
    stock: 40,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-9',
    name: 'Minyak Balur Pemanas & Relaksasi Otot',
    category: 'Perlengkapan Olahraga',
    price: 35000,
    umkmName: 'UMKM Rempah Bugar Nusantara',
    umkmOwner: 'Ibu Siti Khodijah',
    description: 'Racikan minyak atsiri sereh wangi, cengkeh, dan kayu putih untuk pemanasan dan meredakan pegal usai tanding.',
    badge: '100% Herbal',
    stock: 22,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'B1',
    nama: 'Adamas Nizaroeddin',
    email: 'adamas@gmail.com',
    sport: 'Badminton',
    courtName: 'Lapangan Badminton A',
    tanggal: '2026-05-07',
    jamMulai: '18:00',
    jamSelesai: '20:00',
    durasi: 2,
    fasilitasTambahan: ['Shuttlecock / Bola', 'Sewa Raket'],
    catatan: 'Paket hidrasi dingin tolong disiapkan di loker nomor 3.',
    totalHargaNumber: 240000,
    total: 'Rp 240.000',
    statusPembayaran: 'Success',
    metodePembayaran: 'Transfer Bank (BSI BYOND)',
    createdAt: '2026-05-07 14:30'
  },
  {
    id: 'B2',
    nama: 'Pak Adam',
    email: 'adam.sport@yahoo.com',
    sport: 'Futsal',
    courtName: 'Lapangan Futsal A',
    tanggal: '2026-06-24',
    jamMulai: '19:00',
    jamSelesai: '22:00',
    durasi: 3,
    fasilitasTambahan: ['Shuttlecock / Bola', 'Sewa Jersey', 'Sewa Sepatu'],
    catatan: 'Pertandingan persahabatan antar kantor, pesan air mineral 1 kardus dari minimarket UMKM.',
    totalHargaNumber: 528000,
    total: 'Rp 528.000',
    statusPembayaran: 'Success',
    metodePembayaran: 'Transfer Bank (BCA)',
    createdAt: '2026-06-24 16:10'
  },
  {
    id: 'B3',
    nama: 'Yusup Setiawan',
    email: 'yusup.setiawan@gmail.com',
    sport: 'Padel',
    courtName: 'Lapangan Padel A',
    tanggal: '2026-06-25',
    jamMulai: '16:00',
    jamSelesai: '18:00',
    durasi: 2,
    fasilitasTambahan: ['Sewa Raket'],
    catatan: 'Booking padel sore + 2 botol isotonik jamu segar UMKM.',
    totalHargaNumber: 241500,
    total: 'Rp 241.500',
    statusPembayaran: 'Success',
    metodePembayaran: 'Transfer Bank (Mandiri)',
    createdAt: '2026-06-25 15:05'
  },
  {
    id: 'B4',
    nama: 'Rizky Pratama',
    email: 'rizky.pratama@gmail.com',
    sport: 'Futsal',
    courtName: 'Lapangan Futsal A',
    tanggal: '2026-09-05',
    jamMulai: '20:00',
    jamSelesai: '22:00',
    durasi: 2,
    fasilitasTambahan: ['Shuttlecock / Bola'],
    catatan: 'Latihan rutin komunitas pemuda sabtu malam.',
    totalHargaNumber: 300000,
    total: 'Rp 300.000',
    statusPembayaran: 'Pending',
    metodePembayaran: 'QRIS',
    createdAt: '2026-09-03 21:00'
  },
  {
    id: 'B5',
    nama: 'Clarissa Maharani',
    email: 'clarissa.m@outlook.com',
    sport: 'Padel',
    courtName: 'Lapangan Padel A',
    tanggal: '2026-09-06',
    jamMulai: '08:00',
    jamSelesai: '10:00',
    durasi: 2,
    fasilitasTambahan: ['Sewa Raket', 'Sewa Sepatu'],
    catatan: 'Padel pagi bersama teman komunitas arisan.',
    totalHargaNumber: 280000,
    total: 'Rp 280.000',
    statusPembayaran: 'Pending',
    metodePembayaran: 'E-Wallet',
    createdAt: '2026-09-03 22:15'
  },
  {
    id: 'B6',
    nama: 'Budi Darmawan',
    email: 'budidarma@gmail.com',
    sport: 'Badminton',
    courtName: 'Lapangan Badminton A',
    tanggal: '2026-09-07',
    jamMulai: '15:00',
    jamSelesai: '16:00',
    durasi: 1,
    fasilitasTambahan: [],
    catatan: 'Ganti jadwal batal',
    totalHargaNumber: 50000,
    total: 'Rp 50.000',
    statusPembayaran: 'Failed',
    metodePembayaran: 'Transfer Bank',
    createdAt: '2026-09-02 11:20'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-001',
    bookingId: 'B1',
    namaLengkap: 'Adamas Nizaroeddin',
    metode: 'Transfer Bank',
    bankOrWallet: 'Bank Syariah Indonesia (BSI) BYOND',
    nominal: 240000,
    status: 'Success',
    buktiUrl: 'BSI-BYOND',
    catatan: 'Transfer via BYOND BSI ref FT26127VRK15',
    tanggal: '07 Mei 2026 20:16'
  },
  {
    id: 'PAY-002',
    bookingId: 'B2',
    namaLengkap: 'Pak Adam',
    metode: 'Transfer Bank',
    bankOrWallet: 'BCA (Bank Central Asia)',
    nominal: 528000,
    status: 'Success',
    buktiUrl: 'BCA-528K',
    catatan: 'Transfer via BCA ref 973BB945-3423-4E82',
    tanggal: '24 Jun 2026 18:35'
  },
  {
    id: 'PAY-003',
    bookingId: 'B3',
    namaLengkap: 'Yusup Setiawan',
    metode: 'Transfer Bank',
    bankOrWallet: 'BCA ke Mandiri (BI FAST)',
    nominal: 241500,
    status: 'Success',
    buktiUrl: 'BCA-241K',
    catatan: 'Transfer BI Fast ref 20260625CENAIDJA',
    tanggal: '25 Jun 2026 18:12'
  },
  {
    id: 'PAY-004',
    bookingId: 'B4',
    namaLengkap: 'Rizky Pratama',
    metode: 'QRIS',
    bankOrWallet: 'QRIS Nasional Merchant Baso Jono / Arena Mart',
    nominal: 300000,
    status: 'Pending',
    catatan: 'Menunggu konfirmasi scan barcode QRIS',
    tanggal: '03 Sep 2026 21:05'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Bagus Setiawan',
    comment: 'Sistem bookingnya sangat praktis! Lapangan Futsal rumputnya empuk, dan yang paling keren bisa langsung pre-order minuman isotonik herbal dari minimarket UMKM di arena. Begitu selesai main, minuman dingin sudah siap di bench!',
    rating: '⭐⭐⭐⭐⭐',
    date: '28 Agu 2026',
    sport: 'Futsal'
  },
  {
    id: 'testi-2',
    name: 'Dr. Sarah Amalia',
    comment: 'Suka banget main Padel di sini. Lapangannya bersih, pencahayaannya bagus. Minimarket UMKM-nya menjual energy bar pisang madu buatan pengrajin lokal yang enak banget buat boost stamina sebelum tanding.',
    rating: '⭐⭐⭐⭐⭐',
    date: '01 Sep 2026',
    sport: 'Padel'
  },
  {
    id: 'testi-3',
    name: 'Hendra Wijaya',
    comment: 'Harga sewa lapangan badminton sangat terjangkau (Rp 50.000/jam). Saya beli grip raket motif batik buatan UMKM lokal di minimarketnya, kualitasnya empuk dan gak licin. Inovasi yang sangat membantu pedagang lokal!',
    rating: '⭐⭐⭐⭐⭐',
    date: '02 Sep 2026',
    sport: 'Badminton'
  },
  {
    id: 'testi-4',
    name: 'Doni Kurniawan',
    comment: 'Pembayaran pakai QRIS sangat mulus, sekali bayar sudah mencakup sewa lapangan plus snack minimarket. Semoga makin banyak UMKM kuliner dan suvenir olahraga yang digandeng di sport center ini.',
    rating: '⭐⭐⭐⭐',
    date: '03 Sep 2026',
    sport: 'Futsal'
  }
];

export const SYSTEM_TEAM_MEMBERS = [
  {
    name: 'Muhammad Sodais Adam',
    role: 'Koordinator & Lead Developer',
    responsibility: 'Arsitektur Sistem, Integrasi Pembayaran, Logika Booking & Hub UMKM',
    email: 'adamsodais6@gmail.com',
    phone: '+62 813-1574-6759',
    avatar: 'MSA'
  },
];
