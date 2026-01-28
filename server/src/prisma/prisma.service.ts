import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly logger: PinoLogger,
    config: ConfigService,
  ) {
    const connectionUrl = config.get<string>("database.url");
    if (!connectionUrl) throw new Error("DATABASE_URL is not defined");

    const adapter = new PrismaPg({ connectionUrl });

    super({ adapter });
    this.logger.setContext(PrismaService.name);
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.info("Prisma connected");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.info("Prisma disconnected");
  }
}
