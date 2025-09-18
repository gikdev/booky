export interface Paginated<T> {
  data: T[]
  meta: {
    itemsPerPage: number
    totalItems: number
    currentPage: number
    totalPages: number
    isFirstPage: boolean
    isLastPage: boolean
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  links: {
    first: string
    last: string
    current: string
    next: string
    previous: string
  }
}
