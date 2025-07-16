import { LoggerModule } from "@app/common/logger";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [LoggerModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
