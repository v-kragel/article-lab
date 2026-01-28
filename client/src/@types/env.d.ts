interface ImportMetaEnv {
  readonly VITE_APP_ENV: "local" | "dev";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
