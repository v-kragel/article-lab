import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, "query" | "info" | "warn" | "error">
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @InjectPinoLogger(PrismaService.name)
    private readonly logger: PinoLogger,
  ) {
    super({
      log: [
        { level: "query", emit: "event" },
        { level: "info", emit: "event" },
        { level: "warn", emit: "event" },
        { level: "error", emit: "event" },
      ],
    });

    this.$on("query", (event: Prisma.QueryEvent) => {
      this.logger.debug({
        message: `Prisma SQL Query (${event.duration}ms)`,
        query: event.query,
        params: event.params,
      });
    });

    this.$on("info", (event: Prisma.LogEvent) => {
      this.logger.info({
        message: `Prisma Info - ${event.message}`,
        target: event.target,
      });
    });

    this.$on("warn", (event: Prisma.LogEvent) => {
      this.logger.warn({
        message: `Prisma Warning - ${event.message}`,
        target: event.target,
      });
    });

    this.$on("error", (event: Prisma.LogEvent) => {
      this.logger.error({
        message: `Prisma Error - ${event.message}`,
        target: event.target,
      });
    });
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
