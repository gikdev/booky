import { Module } from "@nestjs/common"
import { BooksController } from "./books.controller"
import { BooksService } from "./providers/books.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Book } from "./book.entity"
import { CategoriesModule } from "src/categories/categories.module"
import { UsersModule } from "src/users/users.module"
import { PaginationModule } from "src/common/pagination/pagination.module"

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
  imports: [
    TypeOrmModule.forFeature([Book]),
    CategoriesModule,
    UsersModule,
    PaginationModule,
  ],
})
export class BooksModule {}
