import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator"

export class BaseCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string

  @IsString()
  @IsOptional()
  @MaxLength(512)
  description?: string

  @IsString()
  @IsOptional()
  @Length(6, 6)
  color?: string

  @IsInt()
  @IsNotEmpty()
  ownerId: number
}
