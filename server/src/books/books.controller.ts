import { Body, Controller, Get, Post } from "@nestjs/common"
import { BooksService } from "./providers/books.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateBookDto } from "./dtos/create-book.dto";
import { plainToInstance } from "class-transformer";
import { BookResponseDto } from "./dtos/book-response.dto";

@Controller("books")
export class BooksController {
  constructor(
    private readonly booksService: BooksService
  ) {}

  @ApiOperation({summary:"Get all books"})
  @Get()
  async getAllBooks() {
    const allBooks= await this.booksService.findAll()
    return plainToInstance(BookResponseDto, allBooks, {excludeExtraneousValues:true})
  }

  @ApiOperation({summary:"Create a book"})
  @Post()
  async createNewBook(@Body() createBookDto: CreateBookDto) {
    const newBook = await this.booksService.create(createBookDto)
    return plainToInstance(BookResponseDto, newBook, {excludeExtraneousValues:true})
  }
}
