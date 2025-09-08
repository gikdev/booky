import { IsISO8601, IsOptional, IsString } from "class-validator"

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  bio?: string

  @IsISO8601()
  @IsOptional()
  birthdate?: Date

  @IsString()
  @IsOptional()
  location?: string
}
