// Типизация данных формы адреса
export interface CheckoutFormData {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    city: string;
    country: string;
    region: string;
    address: string;
  }
  
  // Типизация данных карты
  export interface CardData {
    cardNumber: string;
    expiry: string;
    cvv: string;
  }

// features/checkout/model/types.ts
export interface OrderRequest {
    customer: {
      email: string;
      firstName: string;
      lastName: string;
    };
    shippingAddress: {
      country: string;
      region: string;
      city: string;
      address: string;
      postalCode?: string;
      company?: string;
    };
    items: {
      productId: string;
      quantity: number;
      price: number; // на случай пересчёта на бэке
    }[];
    payment: {
      method: "card" | "paypal" | "cod"; // тип оплаты
      cardNumber?: string; // если method = "card"
      expiry?: string;
      cvv?: string;
    };
    notes?: string; // комментарий к заказу
  }
  

// entities/order/model/types.ts
export interface OrderResponse {
    orderId: string;
    status: "pending" | "paid" | "failed" | "shipped" | "delivered";
    totalPrice: number;
    createdAt: string;
    estimatedDelivery?: string;
    payment: {
      method: "card" | "paypal" | "cod";
      status: "pending" | "paid" | "failed";
      transactionId?: string;
    };
    customer: {
      email: string;
      firstName: string;
      lastName: string;
    };
    items: {
      productId: string;
      name: string;
      quantity: number;
      price: number;
    }[];
  }
  