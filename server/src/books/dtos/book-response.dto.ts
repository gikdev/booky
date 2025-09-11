import { Expose } from "class-transformer"

export class BookResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  author: string

  @Expose()
  description?: string | null

  @Expose()
  language?: string | null

  @Expose()
  pages?: number | null

  @Expose()
  color?: string | null
}
