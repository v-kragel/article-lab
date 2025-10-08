import { baseApi } from "@/shared/api";
import { apiMap } from "@/shared/model";

import type { FieldObject } from "../model";

export const fieldApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFields: build.query<FieldObject[], void>({
      query: () => ({
        url: apiMap.getFields,
      }),
    }),
  }),
});

export const { useGetFieldsQuery } = fieldApi;
