export type SportType = 'Padel' | 'Futsal' | 'Badminton';

export interface Court {
  id: string;
  name: string;
  sport: SportType;
  pricePerHour: number;
  description: string;
  facilities: string[];
  imageUrl: string;
  availableHours: string;
  surface: string;
}

export interface MinimarketProduct {
  id: string;
  name: string;
  category: 'Minuman Sehat' | 'Snack Energi' | 'Merchandise & Kriya' | 'Perlengkapan Olahraga';
  price: number;
  umkmName: string;
  umkmOwner: string;
  description: string;
  badge?: string;
  stock: number;
  rating: number;
  imageUrl: string;
}

export interface Booking {
  id: string;
  nama: string;
  email: string;
  sport: SportType;
  courtName: string;
  tanggal: string;
  jamMulai: string;
  jamSelesai: string;
  durasi: number;
  fasilitasTambahan: string[];
  minimarketItems?: { product: MinimarketProduct; quantity: number }[];
  catatan: string;
  totalHargaNumber: number;
  total: string;
  statusPembayaran: 'Success' | 'Pending' | 'Failed';
  metodePembayaran?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  namaLengkap: string;
  metode: 'QRIS' | 'E-Wallet' | 'Transfer Bank';
  bankOrWallet?: string;
  nominal: number;
  status: 'Success' | 'Pending' | 'Failed';
  buktiUrl?: string;
  catatan?: string;
  tanggal: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: '⭐' | '⭐⭐' | '⭐⭐⭐' | '⭐⭐⭐⭐' | '⭐⭐⭐⭐⭐';
  date: string;
  sport: SportType;
}
