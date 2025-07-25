import { LoggerModule } from "@app/infra/logger";
import { ArticleFieldValueModule } from "@app/modules/articleFieldValue";
import { TemplateModule } from "@app/modules/template";
import { PrismaModule } from "@app/prisma";
import { Module } from "@nestjs/common";
import { ArticleService } from "../application";
import { ArticleController } from "./article.controller";
import { ArticleRepository } from "./article.repository";

@Module({
  imports: [LoggerModule, PrismaModule, ArticleFieldValueModule, TemplateModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
  exports: [ArticleService],
})
export class ArticleModule {}
