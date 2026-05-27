export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'kukus' | 'goreng' | 'premium' | 'minuman';
  image: string;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  qty: number;
}

export type OrderType = 'dine-in' | 'takeaway';

export type Category = 'semua' | 'kukus' | 'goreng' | 'premium' | 'minuman';
