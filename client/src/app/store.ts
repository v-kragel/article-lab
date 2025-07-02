import { configureStore } from "@reduxjs/toolkit";

import { fieldSlice } from "@/entities/field";

export const store = configureStore({
  reducer: {
    [fieldSlice.name]: fieldSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
