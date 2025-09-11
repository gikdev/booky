import { forwardRef, Module } from "@nestjs/common"
import { BooksController } from "./books.controller"
import { BooksService } from "./providers/books.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Book } from "./book.entity"
import { CategoriesModule } from "src/categories/categories.module"
import { UsersModule } from "src/users/users.module"

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => CategoriesModule),
    UsersModule,
  ],
  exports: [BooksService],
})
export class BooksModule {}
