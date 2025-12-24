import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/api/baseQuery";
import type { FilterParams } from "../model/types";
import type { Product } from "../../../entities/product/model/types";

export const filterApi = createApi({
  reducerPath: "filterApi",
  baseQuery: baseQuery,
  tagTypes: ['Filter'],
  endpoints: (builder) => ({
    getFilteredProducts: builder.query<Product[], FilterParams>({
      query: (filterParams) => ({
        url: "/products",
        params: {
          ...filterParams,
          limit: 100, 
          skip: 0,
        },
      }),
      transformResponse: (response: Product[]) => {
        console.log("Filtered products response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("Filter API Error:", response);
        return response;
      },
      providesTags: ['Filter'],
    }),
    
    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
      transformResponse: (response: string[]) => {
        console.log("Categories response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("Categories API Error:", response);
        return response;
      },
      providesTags: ['Filter'],
    }),

    getBrands: builder.query<string[], void>({
      query: () => ({
        url: "/products",
        params: {
          limit: 100,
          skip: 0,
        },
      }),
      transformResponse: (response: Product[]) => {
        const brands = [...new Set(response.map(product => product.brand))];
        console.log("Brands response:", brands);
        return brands;
      },
      transformErrorResponse: (response) => {
        console.error("Brands API Error:", response);
        return response;
      },
      providesTags: ['Filter'],
    }),
  }),
});

export const { 
  useGetFilteredProductsQuery, 
  useGetCategoriesQuery, 
  useGetBrandsQuery 
} = filterApi;
