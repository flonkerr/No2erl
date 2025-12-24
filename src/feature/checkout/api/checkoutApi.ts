import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/api/baseQuery";
import type { OrderRequest, OrderResponse } from "../model/types";

export const cheakoutApiFeature = createApi({
    reducerPath: "orderApiFeature",
    baseQuery: baseQuery,
    tagTypes: ["checkout"],
    endpoints: (builder) => ({
        createOrder: builder.mutation<OrderResponse, OrderRequest>({
            query: (order) => ({
                url: `/checkout`,
                method: "POST",
                body: order,
            }),
            transformResponse: (response: OrderResponse) => {
                console.log("Raw API response:", response);
                return response;
            },
            transformErrorResponse: (response) => {
                console.error("API Error:", response);
                return response;
            },
            invalidatesTags: ["checkout"],
        }),
    }),
});

export const { useCreateOrderMutation } = cheakoutApiFeature;
