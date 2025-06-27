import { PrismaModule } from "@app/prisma";
import { Module } from "@nestjs/common";
import { FieldController } from "./field.controller";
import { FieldService } from "./field.service";

@Module({
  imports: [PrismaModule],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
