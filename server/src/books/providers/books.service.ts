import { Injectable, NotFoundException } from "@nestjs/common"
import { Repository } from "typeorm"
import { Book } from "../book.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateBookDto } from "../dtos/create-book.dto"
import { UpdateBookDto } from "../dtos/update-book.dto"
import { PatchBookDto } from "../dtos/patch-book.dto"
import { CategoriesService } from "src/categories/providers/categories.service"
import { UsersService } from "src/users/providers/users.service"
import { BooksQueryDto } from "../dtos/books-query.dto"
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider"
import { Paginated } from "src/common/pagination/interfaces/paginated.interface"
import { ActiveUserData } from "src/auth/interfaces/active-user-data.interface"

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UsersService,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async findAll(booksQueryDto: BooksQueryDto): Promise<Paginated<Book>> {
    const items = await this.paginationProvider.paginateQuery(
      { limit: booksQueryDto.limit, page: booksQueryDto.page },
      this.booksRepo,
    )

    return items
  }

  async findAllByOwnerId(
    booksQueryDto: BooksQueryDto,
    ownerId: number,
  ): Promise<Paginated<Book>> {
    const items = await this.paginationProvider.paginateQuery(
      { limit: booksQueryDto.limit, page: booksQueryDto.page },
      this.booksRepo,
      { owner: { id: ownerId } },
    )

    return items
  }

  async findOneById(id: Book["id"]) {
    const book = await this.booksRepo.findOne({
      where: { id },
      relations: { categories: true },
    })

    if (!book)
      throw new NotFoundException(`Book with ID of ${id} was not found`)

    return book
  }

  async findOneByIdAndOwnerId(id: Book["id"], ownerId: number) {
    const book = await this.booksRepo.findOne({
      relations: { categories: true },
      where: {
        id,
        owner: { id: ownerId },
      },
    })

    if (!book)
      throw new NotFoundException(
        `Book with (ID of ${id} && owner ID of ${ownerId}) was not found`,
      )

    return book
  }

  async create(createBookDto: CreateBookDto, user: ActiveUserData) {
    const newBook = this.booksRepo.create(createBookDto)

    if (createBookDto.categoryIds) {
      const categories = await this.categoriesService.findMultipleByIds(
        createBookDto.categoryIds,
      )
      newBook.categories = categories
    }

    const owner = await this.usersService.findOneById(user.sub)
    newBook.owner = owner

    await this.booksRepo.save(newBook)
    return newBook
  }

  async patch(id: Book["id"], patchBookDto: PatchBookDto) {
    const book = await this.findOneById(id)

    book.title = patchBookDto.title ?? book.title
    book.author = patchBookDto.author ?? book.author
    book.color = patchBookDto.color ?? book.color
    book.description = patchBookDto.description ?? book.description
    book.language = patchBookDto.language ?? book.language
    book.pages = patchBookDto.pages ?? book.pages

    if (patchBookDto.categoryIds) {
      const categories = await this.categoriesService.findMultipleByIds(
        patchBookDto.categoryIds,
      )
      book.categories = categories
    }

    await this.booksRepo.save(book)
    return book
  }

  async update(id: Book["id"], updateBookDto: UpdateBookDto) {
    const book = await this.findOneById(id)

    book.title = updateBookDto.title
    book.author = updateBookDto.author
    book.color = updateBookDto.color
    book.description = updateBookDto.description
    book.language = updateBookDto.language
    book.pages = updateBookDto.pages

    if (updateBookDto.categoryIds) {
      const categories = await this.categoriesService.findMultipleByIds(
        updateBookDto.categoryIds,
      )

      if (categories.length !== updateBookDto.categoryIds.length) {
        throw new NotFoundException(`Some categories not found`)
      }

      book.categories = categories
    }

    await this.booksRepo.save(book)
    return book
  }

  async remove(id: Book["id"]) {
    const book = await this.findOneById(id)

    await this.booksRepo.remove(book)
    return book
  }
}
