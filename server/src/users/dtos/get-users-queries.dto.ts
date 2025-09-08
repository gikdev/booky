import { Type } from "class-transformer"
import { IsBoolean, IsOptional } from "class-validator"

export class GetUsersQueriesDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  includeProfile?: boolean
}
