import { Expose, Type } from "class-transformer"
import { Paginated } from "../interfaces/paginated.interface"

class PaginationMetaDto {
  @Expose()
  itemsPerPage: number

  @Expose()
  totalItems: number

  @Expose()
  currentPage: number

  @Expose()
  totalPages: number

  @Expose()
  hasPreviousPage: boolean

  @Expose()
  hasNextPage: boolean

  @Expose()
  isFirstPage: boolean

  @Expose()
  isLastPage: boolean
}

class PaginationLinksDto {
  @Expose()
  first: string

  @Expose()
  last: string

  @Expose()
  current: string

  @Expose()
  next: string

  @Expose()
  previous: string
}

export abstract class PaginatedResponseDto<T> implements Paginated<T> {
  @Expose()
  @Type(() => Object) // placeholder, will be replaced by the extender...
  abstract data: T[]

  @Expose()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto

  @Expose()
  @Type(() => PaginationLinksDto)
  links: PaginationLinksDto
}
