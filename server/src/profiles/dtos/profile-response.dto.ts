import { Expose } from "class-transformer"

export class ProfileResponseDto {
  @Expose()
  id: number

  @Expose()
  bio?: string | null

  @Expose()
  birthdate?: Date | null

  @Expose()
  location?: string | null

  @Expose()
  userId: number | null
}
