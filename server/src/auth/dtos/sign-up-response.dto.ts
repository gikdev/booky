import { Expose } from "class-transformer"
import { SignInResponseDto } from "./sign-in-response.dto"
import { UserWithProfileResponseDto } from "src/users/dtos/user-with-profile-response.dto"

export class SignUpResponseDto {
  @Expose()
  user: UserWithProfileResponseDto

  @Expose()
  tokens: SignInResponseDto
}
