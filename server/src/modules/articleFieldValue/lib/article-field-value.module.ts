import { Module } from "@nestjs/common";
import { ArticleFieldValueService } from "../application";
import { ArticleFieldValueRepository } from "./article-field-value.repository";

@Module({
  providers: [ArticleFieldValueService, ArticleFieldValueRepository],
  exports: [ArticleFieldValueService],
})
export class ArticleFieldValueModule {}
