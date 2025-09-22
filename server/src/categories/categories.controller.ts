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
import { CategoriesService } from "./providers/categories.service"
import { plainToInstance } from "class-transformer"
import { CategoryResponseDto } from "./dtos/category-response.dto"
import { CreateCategoryDto } from "./dtos/create-category.dto"
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { UpdateCategoryDto } from "./dtos/update-category.dto"
import { PatchCategoryDto } from "./dtos/patch-category.dto"
import { ActiveUser } from "src/auth/decorators/active-user.decorator"
import type { ActiveUserData } from "src/auth/interfaces/active-user-data.interface"

@Controller("categories")
@ApiBearerAuth("bearer")
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

  @ApiOperation({ summary: "Get category by ID" })
  @Get("/:id")
  async getCategoryById(@Param("id", ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOneById(id)
    return plainToInstance(CategoryResponseDto, category, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Create a category" })
  @Post()
  async createNewCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const newCategory = await this.categoriesService.create(
      createCategoryDto,
      user,
    )
    return plainToInstance(CategoryResponseDto, newCategory, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Update category by ID" })
  @Put("/:id")
  async updateCategoryById(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory = await this.categoriesService.update(
      id,
      updateCategoryDto,
    )
    return plainToInstance(CategoryResponseDto, updatedCategory, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Patch category by ID" })
  @Patch("/:id")
  async patchCategoryById(
    @Param("id", ParseIntPipe) id: number,
    @Body() patchCategoryDto: PatchCategoryDto,
  ) {
    const patchedCategory = await this.categoriesService.patch(
      id,
      patchCategoryDto,
    )
    return plainToInstance(CategoryResponseDto, patchedCategory, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Delete category by ID" })
  @Delete("/:id")
  async removeCategoryById(@Param("id", ParseIntPipe) id: number) {
    const removedCategory = await this.categoriesService.remove(id)
    return plainToInstance(CategoryResponseDto, removedCategory, {
      excludeExtraneousValues: true,
    })
  }
}
