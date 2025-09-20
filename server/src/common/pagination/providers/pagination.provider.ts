import { Inject, Injectable } from "@nestjs/common"
import { PaginationQueryDto } from "../dtos/pagination-query.dto"
import { ObjectLiteral, Repository } from "typeorm"
import type { Request } from "express"
import { REQUEST } from "@nestjs/core"
import { Paginated } from "../interfaces/paginated.interface"
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from "../constants"

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repo: Repository<T>,
  ): Promise<Paginated<T>> {
    const { limit = DEFAULT_PAGINATION_LIMIT, page = DEFAULT_PAGINATION_PAGE } =
      paginationQueryDto

    const items = await repo.find({
      take: limit,
      skip: (page - 1) * limit,
    })

    // Create the request urls
    const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`
    const newUrl = new URL(this.request.url, baseUrl)

    // Calculating page number
    const totalItems = await repo.count()
    const totalPages = Math.ceil(totalItems / limit)

    const isFirstPage = page === 1
    const isLastPage = page === totalPages

    const hasPreviousPage = page > 1
    const hasNextPage = page < totalPages

    const previousPage = hasPreviousPage ? page - 1 : 1
    const nextPage = hasNextPage ? page + 1 : totalPages

    const finalResponse: Paginated<T> = {
      data: items,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage: page,
        totalPages,
        hasPreviousPage,
        hasNextPage,
        isFirstPage,
        isLastPage,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${previousPage}`,
      },
    }

    return finalResponse
  }
}
