import { IntersectionType } from "@nestjs/swagger"
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto"

class BaseBooksQueryDto {}

export class BooksQueryDto extends IntersectionType(
  BaseBooksQueryDto,
  PaginationQueryDto,
) {}
