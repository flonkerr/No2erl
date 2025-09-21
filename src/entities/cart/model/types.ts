export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  discount: number; 
  totalPrice: number;
  stock: number;
  variant: string;
}

export interface CartData {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discountTotal: number;
  totalPrice: number;
  currency: string;
  deliveryPrice: number;
  couponCode?: string; 
}
