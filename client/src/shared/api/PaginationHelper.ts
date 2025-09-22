interface PaginationMeta {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  totalPages: number
}

export class PaginationHelper {
  /** Pagination meta info from server */
  meta: PaginationMeta

  constructor(meta: PaginationMeta) {
    this.meta = meta
  }

  /** True if current page is even */
  get isEvenPage(): boolean {
    return this.meta.currentPage % 2 === 0
  }

  /** True if current page is odd */
  get isOddPage(): boolean {
    return this.meta.currentPage % 2 !== 0
  }

  /** True if current page is neither first nor last */
  get isMiddlePage(): boolean {
    return !this.isFirstPage && !this.isLastPage
  }

  /** 1-based index of first item on current page */
  get firstItemIndex(): number {
    if (this.totalItems === 0) return 0
    return (this.meta.currentPage - 1) * this.meta.itemsPerPage + 1
  }

  /** 1-based index of last item on current page */
  get lastItemIndex(): number {
    return this.firstItemIndex + this.itemsOnCurrentPage - 1
  }

  /** True if there are any items at all */
  get hasItems(): boolean {
    return this.totalItems > 0
  }

  /** True if current page has no items */
  get isEmptyPage(): boolean {
    return !this.hasItems
  }

  /** Number of items to skip (offset) */
  get offset(): number {
    return (this.meta.currentPage - 1) * this.meta.itemsPerPage
  }

  /** Items per page (limit) */
  get limit(): number {
    return this.meta.itemsPerPage
  }

  /** Alias for offset */
  get skip(): number {
    return this.offset
  }

  /** True if current page is within `count` pages from start */
  isNearStart(count = 2): boolean {
    return this.meta.currentPage <= count + 1
  }

  /** True if current page is within `count` pages from end */
  isNearEnd(count = 2): boolean {
    return this.meta.currentPage >= this.meta.totalPages - count
  }

  /** Returns array of all page numbers */
  allPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }

  /** Returns page numbers before current page */
  pagesBefore(): number[] {
    return this.allPages().filter(p => p < this.meta.currentPage)
  }

  /** Returns page numbers after current page */
  pagesAfter(): number[] {
    return this.allPages().filter(p => p > this.meta.currentPage)
  }

  /** Returns pages around current page within given range */
  nearbyPages(range = 2): number[] {
    const start = Math.max(1, this.meta.currentPage - range)
    const end = Math.min(this.meta.totalPages, this.meta.currentPage + range)
    return this.pageRange(start, end)
  }

  /** URL for next page based on base URL, or null if none */
  nextPageUrl(baseUrl: string): string | null {
    return this.hasNextPage ? `${baseUrl}?page=${this.nextPageNo}` : null
  }

  /** URL for previous page based on base URL, or null if none */
  previousPageUrl(baseUrl: string): string | null {
    return this.hasPreviousPage
      ? `${baseUrl}?page=${this.previousPageNo}`
      : null
  }

  /** Returns an array of page numbers in the range [start..end] */
  pageRange(start: number, end: number): number[] {
    const range: number[] = []
    for (let i = start; i <= end; i++) {
      range.push(i)
    }
    return range
  }

  /** True if current page is first page */
  get isFirstPage(): boolean {
    return this.meta.currentPage === 1
  }

  /** True if current page is last page */
  get isLastPage(): boolean {
    return this.meta.currentPage === this.meta.totalPages
  }

  /** True if there is a next page */
  get hasNextPage(): boolean {
    return this.meta.currentPage < this.meta.totalPages
  }

  /** True if there is a previous page */
  get hasPreviousPage(): boolean {
    return this.meta.currentPage > 1
  }

  /** Next page number or null */
  get nextPageNo(): number | null {
    return this.hasNextPage ? this.meta.currentPage + 1 : null
  }

  /** Previous page number or null */
  get previousPageNo(): number | null {
    return this.hasPreviousPage ? this.meta.currentPage - 1 : null
  }

  /** First page number */
  get firstPageNo(): number {
    return 1
  }

  /** Last page number */
  get lastPageNo(): number {
    return this.meta.totalPages
  }

  /** Number of items on current page */
  get itemsOnCurrentPage(): number {
    if (!this.isLastPage) return this.meta.itemsPerPage
    return (
      this.meta.totalItems - this.meta.itemsPerPage * (this.meta.totalPages - 1)
    )
  }

  /** Total number of items */
  get totalItems(): number {
    return this.meta.totalItems
  }

  /** Total number of pages */
  get totalPages(): number {
    return this.meta.totalPages
  }

  /** True if current page matches given page number */
  isPage(page: number): boolean {
    return this.meta.currentPage === page
  }
}
