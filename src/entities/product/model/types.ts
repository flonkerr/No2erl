// Типы для отзыва
interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// Типы для мета-данных
interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

// Типы для размеров
interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// Основной тип продукта
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
}

// Тип для ответа со списком продуктов
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}



////////////////////////////////////
// Тип для ответа с одним продуктом
interface SingleProductResponse extends Product {}

// Тип для создания продукта (все поля опциональны кроме title)
interface CreateProductRequest {
  title: string;
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Partial<Dimensions>;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Partial<Review>[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Partial<Meta>;
  thumbnail?: string;
  images?: string[];
}

// Тип для обновления продукта (все поля опциональны)
interface UpdateProductRequest extends Partial<CreateProductRequest> {}

// Тип для удаленного продукта
interface DeletedProductResponse extends Product {
  isDeleted: boolean;
  deletedOn: string;
}

// Тип для параметров запроса
interface ProductsQueryParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: keyof Product;
  order?: 'asc' | 'desc';
  q?: string;
  category?: string;
}

// Тип для категорий
interface CategoriesResponse {
  categories: string[];
}

// Пример использования
// const exampleProduct: Product = {
//   id: 1,
//   title: "Essence Mascara Lash Princess",
//   description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//   category: "beauty",
//   price: 9.99,
//   discountPercentage: 7.17,
//   rating: 4.94,
//   stock: 5,
//   tags: ["beauty", "mascara"],
//   brand: "Essence",
//   sku: "RCH45Q1A",
//   weight: 2,
//   dimensions: {
//     width: 23.17,
//     height: 14.43,
//     depth: 28.01
//   },
//   warrantyInformation: "1 month warranty",
//   shippingInformation: "Ships in 1 month",
//   availabilityStatus: "Low Stock",
//   reviews: [
//     {
//       rating: 2,
//       comment: "Very unhappy with my purchase!",
//       date: "2024-05-23T08:56:21.618Z",
//       reviewerName: "John Doe",
//       reviewerEmail: "john.doe@x.dummyjson.com"
//     }
//   ],
//   returnPolicy: "30 days return policy",
//   minimumOrderQuantity: 24,
//   meta: {
//     createdAt: "2024-05-23T08:56:21.618Z",
//     updatedAt: "2024-05-23T08:56:21.618Z",
//     barcode: "9164035109868",
//     qrCode: "..."
//   },
//   thumbnail: "...",
//   images: ["...", "...", "..."]
// };
