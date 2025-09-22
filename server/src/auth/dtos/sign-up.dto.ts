import { Type } from "class-transformer"
import { IsNotEmpty, ValidateNested } from "class-validator"
import { CreateUserDto } from "src/users/dtos/create-user.dto"

export class SignUpDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  createUserDto: CreateUserDto
}
