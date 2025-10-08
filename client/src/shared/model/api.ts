export const API_URLS = {
  local: "http://localhost:4000",
};

export type Env = keyof typeof API_URLS;

export const apiMap = {
  getFields: "fields",
};
