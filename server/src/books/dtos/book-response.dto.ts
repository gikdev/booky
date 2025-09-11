import { Expose, Type } from "class-transformer"
import { UserResponseDto } from "src/users/dtos/user-response.dto"
import { User } from "src/users/user.entity"

export class BookResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  author: string

  @Expose()
  description: string | null

  @Expose()
  language: string | null

  @Expose()
  pages: number | null

  @Expose()
  color: string | null

  @Expose()
  @Type(() => UserResponseDto)
  owner: UserResponseDto
}
