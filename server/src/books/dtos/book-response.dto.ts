import { Expose, Type } from "class-transformer"
import { CategoryResponseDto } from "src/categories/dtos/category-response.dto"
import { UserResponseDto } from "src/users/dtos/user-response.dto"

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
  @Type(() => CategoryResponseDto)
  categories: CategoryResponseDto[]

  @Expose()
  @Type(() => UserResponseDto)
  owner: UserResponseDto
}
