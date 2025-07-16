import { ENV } from "@app/constants";
import { registerAs } from "@nestjs/config";

export const appConfig = registerAs("app", () => {
  return {
    env: process.env.NODE_ENV || ENV.DEVELOPMENT,
    port: parseInt(process.env.APP_PORT ?? ENV.PORT, 10),
    isDev: process.env.NODE_ENV === ENV.DEVELOPMENT,
    isProd: process.env.NODE_ENV === ENV.PRODUCTION,
  };
});
