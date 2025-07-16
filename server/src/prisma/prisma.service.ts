import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly logger: PinoLogger) {
    super();
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
