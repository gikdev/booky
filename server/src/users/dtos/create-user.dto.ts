import { Type } from "class-transformer"
import {
  IsEmail,
  IsHash,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator"
import { CreateProfileDto } from "src/profiles/dtos/create-profile.dto"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  firstName: string

  @IsString()
  @IsOptional()
  @MaxLength(128)
  lastName?: string = ""

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(192)
  email: string

  @IsHash("sha512")
  @IsNotEmpty()
  password: string

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProfileDto)
  profile?: CreateProfileDto
}
