import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);

  const port = configService.get<number>("app.port", { infer: true });
  const isDev = configService.get<boolean>("app.isDev");

  if (isDev) {
    const logger = app.get(Logger);
    logger.log(`Running in development mode. Port: ${port}`);
  }

  await app.listen(port);
}

bootstrap();
