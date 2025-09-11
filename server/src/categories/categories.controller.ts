import { Body, Controller, Get, Post } from "@nestjs/common"
import { CategoriesService } from "./providers/categories.service"
import { plainToInstance } from "class-transformer"
import { CategoryResponseDto } from "./dtos/category-response.dto"
import { CreateCategoryDto } from "./dtos/create-category.dto"
import { ApiOperation } from "@nestjs/swagger"

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Get all categories" })
  @Get()
  async getAllCategories() {
    const allCategories = await this.categoriesService.findAll()
    return plainToInstance(CategoryResponseDto, allCategories, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Create a category" })
  @Post()
  async createNewCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoriesService.create(createCategoryDto)
    return plainToInstance(CategoryResponseDto, newCategory, {
      excludeExtraneousValues: true,
    })
  }
}
