import { Expose, Type } from "class-transformer"
import { UserResponseDto } from "src/users/dtos/user-response.dto"

export class CategoryResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  description: string | null

  @Expose()
  color: string | null

  @Expose()
  @Type(() => UserResponseDto)
  owner: UserResponseDto
}
