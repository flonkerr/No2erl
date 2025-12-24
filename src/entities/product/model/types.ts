interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
  contact?: Contact;
}

export interface Property {
  id: number;
  title: string;                       
  description: string;                
  type: 
    | "apartment" 
    | "house" 
    | "villa" 
    | "land" 
    | "commercial" 
    | "office" 
    | "garage" 
    | "new_building" 
    | "secondary_housing";             

  price: number;                       
  currency: "AZN" | "USD" | "EUR";

  location: Location;
  
  area: number;                                    
  landArea?: number;                  

  rooms: number;                    
  floor?: number;                             

  buildYear?: number;            
  ceilingHeight?: number;            
  condition: "new" | "renovated" | "needs_repair";
  furnishing: "furnished" | "semi-furnished" | "unfurnished";

  ownership: "owner" | "agency";
  status: "available" | "sold" | "rented";

  amenities?: string[];             
  documents?: string[];     

  contact: Contact;
  views: number;                   
  postedDate: string;              

  thumbnail: string;               
  images: string[];               
}
  
export interface Location {
  city: string;                 
  district?: string;                 
  settlement?: string;               
  street?: string;
}

export interface Contact {
  name: string;
  phone: string;
  email?: string;
}
