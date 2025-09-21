import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/api/baseQuery";
import { setToken } from "../../../shared/util/token";
import type { RegisterRequest, RegisterResponse } from "./type";


export const authApiFeature = createApi({
    reducerPath: "authApiFeature",
    baseQuery: baseQuery,
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (data) => ({
                url: `/auth/register`,
                method: "POST",
                body: data,
            }),

            transformResponse: (response: RegisterResponse) => {
                if (response.token) {
                    setToken(response.token)
                }
                return response;
            },

            transformErrorResponse: (response) => {
                console.error("API Error:", response);
                return response;
            },

            invalidatesTags: ["auth"], 
        }),
    }),
});

export const { useRegisterMutation } = authApiFeature;
