import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../model/types";
import { baseQuery } from "../../../shared/api/baseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  tagTypes: ['Product'], 
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/properties",
      transformResponse: (response: Product[]) => {
        console.log("Raw API response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return response;
      },
      providesTags: ['Product'], 
    }),

    getProductById: builder.query<Product, string>({
      query: (id: string) => `/properties/${id}`,
      transformResponse: (response: Product) => {
        console.log("Raw API response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return response;
      },
      providesTags: ['Product'], 
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi; 