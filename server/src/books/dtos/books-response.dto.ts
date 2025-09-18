import { PaginatedResponseDto } from "src/common/pagination/dtos/paginated-response.dto"
import { BookResponseDto } from "./book-response.dto"
import { Expose, Type } from "class-transformer"

export class BooksResponseDto extends PaginatedResponseDto<BookResponseDto> {
  @Expose()
  @Type(() => BookResponseDto)
  data: BookResponseDto[]
}
