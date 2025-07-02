import { createSlice } from "@reduxjs/toolkit";

import type { FieldObject } from "./types";

interface FieldState {
  fields: FieldObject[];
}

const initialState: FieldState = {
  fields: [],
};

export const fieldSlice = createSlice({
  name: "fieldSlice",
  initialState,
  reducers: {
    setFields: (state, action) => {
      state.fields = action.payload;
    },
  },
});

export const { setFields } = fieldSlice.actions;
export default fieldSlice.reducer;
