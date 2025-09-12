import { forwardRef, Module } from "@nestjs/common"
import { CategoriesController } from "./categories.controller"
import { CategoriesService } from "./providers/categories.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Category } from "./category.entity"
import { UsersModule } from "src/users/users.module"
import { BooksModule } from "src/books/books.module"

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category]), UsersModule],
  exports: [CategoriesService],
})
export class CategoriesModule {}
