import { API_URLS, type Env } from "../model";

const rawEnv = (import.meta.env.VITE_APP_ENV ?? "local") as Env;

const env: Env = rawEnv in API_URLS ? rawEnv : "local";

export const CURRENT_ENV = env;
export const BASE_API_URL = API_URLS[env];
