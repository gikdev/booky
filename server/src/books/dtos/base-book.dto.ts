import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator"

export class BaseBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  author: string

  @IsString()
  @IsOptional()
  @MaxLength(512)
  description?: string

  @IsString()
  @IsOptional()
  @Length(2, 2)
  language?: string

  @IsInt()
  @IsOptional()
  pages?: number

  @IsString()
  @IsOptional()
  @Length(6, 6)
  color?: string

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categoryIds?: number[]
}
