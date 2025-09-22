import { Expose, Type } from "class-transformer"
import { ProfileResponseDto } from "src/profiles/dtos/profile-response.dto"
import { UserResponseDto } from "./user-response.dto"

export class UserWithProfileResponseDto extends UserResponseDto {
  @Expose()
  @Type(() => ProfileResponseDto)
  profile: ProfileResponseDto | null
}
