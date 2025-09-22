import { Expose, Type } from "class-transformer"
import { UserWithProfileResponseDto } from "src/users/dtos/user-with-profile-response.dto"
import { TokensResponseDto } from "./tokens-response.dto"

export class UserAuthResponseDto {
  @Expose()
  @Type(() => UserWithProfileResponseDto)
  user: UserWithProfileResponseDto

  @Expose()
  @Type(() => TokensResponseDto)
  tokens: TokensResponseDto
}
