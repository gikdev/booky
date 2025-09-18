import { Expose } from "class-transformer"

export class SignInResponseDto {
  @Expose()
  userId: number

  @Expose()
  accessToken: string
}
