import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../../shared/api/baseQuery";
import type { CartData } from "../../../../entities/cart/model/types";

export const cartApiFeature = createApi({
  reducerPath: "cartApiFeature",
  baseQuery: baseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    addProductToCart: builder.mutation<CartData, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "POST", 
      }),
      transformResponse: (response: CartData) => {
        console.log("Raw API response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return response;
      },
      invalidatesTags: ["Cart"], 
    }),
  }),
});

export const { useAddProductToCartMutation } = cartApiFeature;
