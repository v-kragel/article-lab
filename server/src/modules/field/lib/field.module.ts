import { PrismaModule } from "@app/prisma";
import { Module } from "@nestjs/common";
import { FieldService } from "../application";
import { FieldController } from "./field.controller";
import { FieldRepository } from "./field.repository";

@Module({
  imports: [PrismaModule],
  controllers: [FieldController],
  providers: [FieldService, FieldRepository],
  exports: [FieldService],
})
export class FieldModule {}
