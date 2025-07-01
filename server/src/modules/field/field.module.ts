import { PrismaModule } from "@app/prisma";
import { Module } from "@nestjs/common";
import { FieldController } from "./field.controller";
import { FieldRepository } from "./field.repository";
import { FieldService } from "./field.service";

@Module({
  imports: [PrismaModule],
  controllers: [FieldController],
  providers: [FieldService, FieldRepository],
  exports: [FieldService, FieldRepository],
})
export class FieldModule {}
