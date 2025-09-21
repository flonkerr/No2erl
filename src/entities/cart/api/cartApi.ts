import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/api/baseQuery";
import type { CartData } from "../model/types";


export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQuery,
  tagTypes: ['Cart'], 
  endpoints: (builder) => ({
    getCartData: builder.query<CartData, void>({
      query: () => "/cart",
      transformResponse: (response: CartData) => {
        console.log("Raw API response:", response);
        return response;
      },

      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return response;
      },
      providesTags: ['Cart'], 
    }),

 
  }),
});

export const { useGetCartDataQuery } = cartApi;