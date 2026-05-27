import type { MenuItem } from '../types';

export const menuData: MenuItem[] = [
  { id: 1, name: 'Hakau Udang', description: 'Dumpling kulit tipis isi udang segar, dikukus sempurna', price: 15000, category: 'kukus', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80', popular: true },
  { id: 2, name: 'Siomay Ayam', description: 'Siomay klasik isi ayam cincang pilihan dengan kulit wonton', price: 12000, category: 'kukus', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80', popular: true },
  { id: 3, name: 'Cheong Fun Udang', description: 'Gulungan beras lembut isi udang dengan saus spesial', price: 18000, category: 'kukus', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80' },
  { id: 4, name: 'Pao Daging Sapi', description: 'Bakpao kukus lembut isi daging sapi bumbu rempah', price: 10000, category: 'kukus', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80' },
  { id: 5, name: 'Lumpia Goreng', description: 'Lumpia crispy isi sayur dan ayam, renyah di luar lembut di dalam', price: 8000, category: 'goreng', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', popular: true },
  { id: 6, name: 'Siomay Goreng', description: 'Siomay digoreng golden brown, tekstur renyah dan gurih', price: 10000, category: 'goreng', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80' },
  { id: 7, name: 'Cakwe Goreng', description: 'Cakwe panjang renyah, enak dimakan dengan saus celup', price: 6000, category: 'goreng', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' },
  { id: 8, name: 'Wonton Goreng', description: 'Wonton crispy isi daging ayam dengan saus asam manis', price: 12000, category: 'goreng', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
  { id: 9, name: 'Paket Spesial Mr. San', description: 'Combo 4 jenis dimsum pilihan chef, porsi kenyang, harga bersahabat', price: 25000, category: 'premium', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400&q=80', popular: true },
  { id: 10, name: 'Dim Sum Platter Premium', description: 'Pilihan 6 pcs dimsum mix kukus dan goreng dengan saus spesial', price: 22000, category: 'premium', image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80' },
  { id: 11, name: 'Teh Panas', description: 'Teh hangat segar pelengkap dimsum, khas restoran Chinese', price: 5000, category: 'minuman', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
  { id: 12, name: 'Es Jeruk Segar', description: 'Perasan jeruk segar dengan es batu, menyegarkan', price: 8000, category: 'minuman', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80' },
];

export const categories = [
  { key: 'semua', label: 'Semua Menu', icon: 'fa-border-all' },
  { key: 'kukus', label: 'Kukus', icon: 'fa-wind' },
  { key: 'goreng', label: 'Goreng', icon: 'fa-fire' },
  { key: 'premium', label: 'Premium', icon: 'fa-crown' },
  { key: 'minuman', label: 'Minuman', icon: 'fa-mug-hot' },
];

export const testimonials = [
  { id: 1, name: 'Rina Kusuma', rating: 5, comment: 'Dimsum paling enak di Lamongan! Hakau udangnya fresh banget, kulitnya tipis dan isiannya banyak. Harga sangat terjangkau!', date: '2 hari lalu' },
  { id: 2, name: 'Budi Santoso', rating: 5, comment: 'Sudah langganan di sini bertahun-tahun. Paket Spesial Mr. San selalu jadi pilihan keluarga. Porsinya besar, rasanya konsisten enak!', date: '1 minggu lalu' },
  { id: 3, name: 'Dewi Anggraini', rating: 4, comment: 'Lumpia gorengnya crispy banget, tidak berminyak. Pelayanannya ramah dan cepat. Tempatnya juga bersih dan nyaman.', date: '2 minggu lalu' },
  { id: 4, name: 'Ahmad Fauzi', rating: 5, comment: 'Recommended banget! Cheong fun udangnya lembut, sausnya pas. Harga terjangkau untuk kualitas yang premium. Wajib coba!', date: '3 minggu lalu' },
];

export const faqs = [
  { q: 'Apakah bisa pesan bawa pulang?', a: 'Tentu! Kami melayani makan di tempat (dine-in) maupun bawa pulang (takeaway). Pesanan takeaway dikemas rapi dan higienis.' },
  { q: 'Berapa harga dimsum di Mr. San?', a: 'Harga dimsum Mr. San sangat terjangkau, mulai dari Rp 1.000 hingga Rp 25.000 per porsi. Dilaporkan oleh pelanggan setia kami.' },
  { q: 'Jam buka berapa?', a: 'Kami buka setiap hari dan tutup pukul 21.00 WIB. Jam buka mungkin berubah saat hari besar seperti Iduladha.' },
  { q: 'Apakah bisa pesan via WhatsApp?', a: 'Bisa! Anda bisa pilih menu di website ini, masukkan ke keranjang, lalu kirim pesanan langsung ke WhatsApp kami di +62 856-4834-3970.' },
];
