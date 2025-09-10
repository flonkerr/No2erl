import { API_BASE_URl } from "./base";

export const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URl,
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");

        return headers;
    }
})