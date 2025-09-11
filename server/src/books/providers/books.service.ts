import { Injectable, NotFoundException } from "@nestjs/common"
import { Repository } from "typeorm"
import { Book } from "../book.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateBookDto } from "../dtos/create-book.dto"
import { UpdateBookDto } from "../dtos/update-book.dto"
import { PatchBookDto } from "../dtos/patch-book.dto"
import { CategoriesService } from "src/categories/providers/categories.service"

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findAll() {
    return await this.booksRepo.find({
      relations: { categories: true },
    })
  }

  async findOneById(id: Book["id"]) {
    return await this.booksRepo.findOne({
      where: { id },
      relations: { categories: true },
    })
  }

  async create(createBookDto: CreateBookDto) {
    const newBook = this.booksRepo.create(createBookDto)

    if (createBookDto.categoryIds) {
      const categories = await this.categoriesService.findMultipleById(
        createBookDto.categoryIds,
      )
      newBook.categories = categories
    }

    await this.booksRepo.save(newBook)
    return newBook
  }

  async patch(id: Book["id"], patchBookDto: PatchBookDto) {
    const book = await this.booksRepo.findOneBy({ id })
    if (!book) throw new NotFoundException(`Book with ID: ${id} not found`)

    book.title = patchBookDto.title ?? book.title
    book.author = patchBookDto.author ?? book.author
    book.color = patchBookDto.color ?? book.color
    book.description = patchBookDto.description ?? book.description
    book.language = patchBookDto.language ?? book.language
    book.pages = patchBookDto.pages ?? book.pages

    if (patchBookDto.categoryIds) {
      const categories = await this.categoriesService.findMultipleById(
        patchBookDto.categoryIds,
      )
      book.categories = categories
    }

    await this.booksRepo.save(book)
    return book
  }

  async update(id: Book["id"], updateBookDto: UpdateBookDto) {
    const book = await this.booksRepo.findOneBy({ id })
    if (!book) throw new NotFoundException(`Book with ID: ${id} not found`)

    book.title = updateBookDto.title
    book.author = updateBookDto.author
    book.color = updateBookDto.color
    book.description = updateBookDto.description
    book.language = updateBookDto.language
    book.pages = updateBookDto.pages

    if (updateBookDto.categoryIds) {
      const categories = await this.categoriesService.findMultipleById(
        updateBookDto.categoryIds,
      )
      book.categories = categories
    }

    await this.booksRepo.save(book)
    return book
  }

  async remove(id: Book["id"]) {
    const book = await this.booksRepo.findOne({
      where: { id },
      relations: { categories: true },
    })
    if (!book) throw new NotFoundException(`Book with ID: ${id} not found`)

    await this.booksRepo.remove(book)
    return book
  }
}
