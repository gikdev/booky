import { Injectable } from "@nestjs/common"
import { PaginationQueryDto } from "../dtos/pagination-query.dto"
import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm"
// import type { Request } from "express"
// import { REQUEST } from "@nestjs/core"
import { Paginated } from "../interfaces/paginated.interface"
import {
  DEFAULT_PAGINATION_PER_PAGE,
  DEFAULT_PAGINATION_PAGE,
} from "../constants"

@Injectable()
export class PaginationProvider {
  // @Inject(REQUEST)
  // private readonly request: Request,
  // constructor() {}

  async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repo: Repository<T>,
    where?: FindOptionsWhere<T>,
  ): Promise<Paginated<T>> {
    const {
      per_page = DEFAULT_PAGINATION_PER_PAGE,
      page = DEFAULT_PAGINATION_PAGE,
    } = paginationQueryDto

    const items = await repo.find({
      take: per_page,
      skip: (page - 1) * per_page,
      where,
    })

    // const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`
    // const newUrl = new URL(this.request.url, baseUrl)

    // Calculating page number
    const totalItems = await repo.count({ where })
    const totalPages = Math.ceil(totalItems / per_page)

    const finalResponse: Paginated<T> = {
      data: items,
      meta: {
        itemsPerPage: per_page,
        totalItems,
        currentPage: page,
        totalPages,
      },
      // links: {
      //   first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
      //   last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
      //   current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
      //   next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
      //   previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${previousPage}`,
      // },
    }

    return finalResponse
  }
}
