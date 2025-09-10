import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../model/types";
import { baseQuery } from "../../../shared/api/baseQuery";



export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  tagTypes: ['Product'], // Добавляем тип тега для кеширования
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: Product[]) => {
        console.log("Raw API response:", response);
        return response;
      },
      // Добавляем обработку ошибок
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return response;
      },
      providesTags: ['Product'], // Кеширование
    }),

    getProductById: builder.query<Product, string>({
      query: (id: string) => `/products/${id}`,
      transformResponse: (response: Product) => {
        console.log("Raw API response:", response);
        return response;
      },
      // Добавляем обработку ошибок
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return response;
      },
      providesTags: ['Product'], // Кеширование
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;