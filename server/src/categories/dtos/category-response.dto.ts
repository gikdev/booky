import { Expose } from "class-transformer"

export class CategoryResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  description: string | null
}
