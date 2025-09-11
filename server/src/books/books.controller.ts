import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from "@nestjs/common"
import { BooksService } from "./providers/books.service"
import { ApiOperation } from "@nestjs/swagger"
import { CreateBookDto } from "./dtos/create-book.dto"
import { plainToInstance } from "class-transformer"
import { BookResponseDto } from "./dtos/book-response.dto"
import { UpdateBookDto } from "./dtos/update-book.dto"
import { PatchBookDto } from "./dtos/patch-book.dto"

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: "Get all books" })
  @Get()
  async getAllBooks() {
    const allBooks = await this.booksService.findAll()
    return plainToInstance(BookResponseDto, allBooks, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Get a book by ID" })
  @Get("/:id")
  async getBookById(@Param("id", ParseIntPipe) id: number) {
    const book = await this.booksService.findOneById(id)
    return plainToInstance(BookResponseDto, book, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Create a book" })
  @Post()
  async createNewBook(@Body() createBookDto: CreateBookDto) {
    const newBook = await this.booksService.create(createBookDto)
    return plainToInstance(BookResponseDto, newBook, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Update a book by ID" })
  @Put()
  async updateBookById(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const editedBook = await this.booksService.update(id, updateBookDto)
    return plainToInstance(BookResponseDto, editedBook, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Patch a book by ID" })
  @Patch()
  async patchBookById(
    @Param("id", ParseIntPipe) id: number,
    @Body() patchBookDto: PatchBookDto,
  ) {
    const patchedBook = await this.booksService.patch(id, patchBookDto)
    return plainToInstance(BookResponseDto, patchedBook, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Delete a book by ID" })
  @Delete()
  async removeBookById(@Param("id", ParseIntPipe) id: number) {
    const removedBook = await this.booksService.remove(id)
    return plainToInstance(BookResponseDto, removedBook, {
      excludeExtraneousValues: true,
    })
  }
}
