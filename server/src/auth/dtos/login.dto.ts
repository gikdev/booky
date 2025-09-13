import { IsEmail, IsHash, IsNotEmpty, MaxLength } from "class-validator"

export class LogInDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(192)
  email: string

  // @IsHash("sha512")
  @IsNotEmpty()
  password: string
}
