import { bindActionCreators } from "@reduxjs/toolkit";

import { useMemo } from "react";

import { useAppDispatch } from "@/shared/hooks/useAppDispatch";

import { fieldSlice } from "../slice";

export const useFieldActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(fieldSlice.actions, dispatch), [dispatch]);
};
