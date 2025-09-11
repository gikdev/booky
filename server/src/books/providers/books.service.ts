import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm";
import { Book } from "../book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBookDto } from "../dtos/create-book.dto";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>
  ) {}

  async findAll() {
    return await this.booksRepo.find()
  }

  async findOneById(id: Book['id']) {
    return await this.booksRepo.findOneBy({id})
  }

  async create(createBookDto: CreateBookDto) {
    const newBook = this.booksRepo.create(createBookDto)
    await this.booksRepo.save(newBook)
    return newBook
  }
}
