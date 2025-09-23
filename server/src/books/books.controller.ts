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
  Query,
} from "@nestjs/common"
import { BooksService } from "./providers/books.service"
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { CreateBookDto } from "./dtos/create-book.dto"
import { BookResponseDto } from "./dtos/book-response.dto"
import { UpdateBookDto } from "./dtos/update-book.dto"
import { PatchBookDto } from "./dtos/patch-book.dto"
import { BooksQueryDto } from "./dtos/books-query.dto"
import { BooksResponseDto } from "./dtos/books-response.dto"
import { ActiveUser } from "src/auth/decorators/active-user.decorator"
import type { ActiveUserData } from "src/auth/interfaces/active-user-data.interface"
import { plainToInstance } from "class-transformer"
import { getDefaultClassTransformOptions } from "src/shared/utils"

@Controller("books")
@ApiBearerAuth("bearer")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: "Get your books" })
  @Get()
  async getAllBooks(
    @Query() booksQueryDto: BooksQueryDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const allBooks = await this.booksService.findAllByOwnerId(
      booksQueryDto,
      user.sub,
    )

    return plainToInstance(
      BooksResponseDto,
      allBooks,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Get your book by ID" })
  @Get("/:id")
  async getBookById(
    @Param("id", ParseIntPipe) id: number,
    @ActiveUser() user: ActiveUserData,
  ) {
    const book = await this.booksService.findOneByIdAndOwnerId(id, user.sub)

    return plainToInstance(
      BookResponseDto,
      book,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Create a book for yourself" })
  @Post()
  async createNewBook(
    @Body() createBookDto: CreateBookDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const newBook = await this.booksService.create(createBookDto, user)

    return plainToInstance(
      BookResponseDto,
      newBook,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Update book by ID" })
  @Put("/:id")
  async updateBookById(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const editedBook = await this.booksService.update(id, updateBookDto)

    return plainToInstance(
      BookResponseDto,
      editedBook,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Patch book by ID" })
  @Patch("/:id")
  async patchBookById(
    @Param("id", ParseIntPipe) id: number,
    @Body() patchBookDto: PatchBookDto,
  ) {
    const patchedBook = await this.booksService.patch(id, patchBookDto)

    return plainToInstance(
      BookResponseDto,
      patchedBook,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Delete book by ID" })
  @Delete("/:id")
  async removeBookById(@Param("id", ParseIntPipe) id: number) {
    const removedBook = await this.booksService.remove(id)

    return plainToInstance(
      BookResponseDto,
      removedBook,
      getDefaultClassTransformOptions(),
    )
  }
}
