import { IsOptional, IsString, MaxLength } from "class-validator"

export class CreateCategoryDto {
  @IsString()
  @MaxLength(256)
  title: string

  @IsString()
  @IsOptional()
  @MaxLength(512)
  description?: string
}
