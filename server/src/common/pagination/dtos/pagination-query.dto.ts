import { Type } from "class-transformer"
import { IsOptional, IsPositive, Max } from "class-validator"

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(100)
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number
}
