import { registerAs } from "@nestjs/config";

export const databaseConfig = registerAs("database", () => {
  const host = process.env.DATABASE_HOST;
  const port = process.env.DATABASE_PORT;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const name = process.env.DATABASE_NAME;

  return {
    host,
    port,
    user,
    password,
    name,
    url: `postgresql://${user}:${password}@${host}:${port}/${name}`,
  };
});
