import { configureStore } from "@reduxjs/toolkit";

import { fieldSlice } from "@/entities/field";
import { baseApi } from "@/shared/api";

export const store = configureStore({
  reducer: {
    // API
    [baseApi.reducerPath]: baseApi.reducer,
    // MODULES
    [fieldSlice.name]: fieldSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
