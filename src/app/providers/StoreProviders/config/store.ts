import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../../../../entities/product/api/productApi";
import { cartApi } from "../../../../entities/cart/api/cartApi";
import { cartApiFeature } from "../../../../feature/cart/useAddProduct/api/useAddProuct";
import { authApiFeature } from "../../../../feature/auth/model/authApi";
import authReducer from "../../../../entities/auth/model/authSlice"; 
import { filterApi } from "../../../../feature/filter/api/filterApi";


export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [cartApiFeature.reducerPath]: cartApiFeature.reducer,
    [authApiFeature.reducerPath]: authApiFeature.reducer, 
    [filterApi.reducerPath]: filterApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      cartApi.middleware,
      cartApiFeature.middleware,
      authApiFeature.middleware,
      filterApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
