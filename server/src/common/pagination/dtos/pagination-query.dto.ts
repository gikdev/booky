import { Type } from "class-transformer"
import { IsOptional, IsPositive, Max } from "class-validator"
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from "../constants"

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(100)
  @Type(() => Number)
  limit?: number = DEFAULT_PAGINATION_LIMIT

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number = DEFAULT_PAGINATION_PAGE
}
