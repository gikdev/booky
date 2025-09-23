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
import { CategoryResponseDto } from "./dtos/category-response.dto"
import { CreateCategoryDto } from "./dtos/create-category.dto"
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { UpdateCategoryDto } from "./dtos/update-category.dto"
import { PatchCategoryDto } from "./dtos/patch-category.dto"
import { ActiveUser } from "src/auth/decorators/active-user.decorator"
import type { ActiveUserData } from "src/auth/interfaces/active-user-data.interface"
import { plainToInstance } from "class-transformer"
import { getDefaultClassTransformOptions } from "src/shared/utils"

@Controller("categories")
@ApiBearerAuth("bearer")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Get all your categories" })
  @Get()
  async getAllCategories(@ActiveUser() user: ActiveUserData) {
    const allCategories = await this.categoriesService.findMultipleByOwnerId(
      user.sub,
    )

    return plainToInstance(
      CategoryResponseDto,
      allCategories,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Get your category by ID" })
  @Get("/:id")
  async getCategoryById(
    @Param("id", ParseIntPipe) id: number,
    @ActiveUser() user: ActiveUserData,
  ) {
    const category = await this.categoriesService.findOneByIdAndOwnerId(
      id,
      user.sub,
    )
    return plainToInstance(
      CategoryResponseDto,
      category,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Create a category for yourself" })
  @Post()
  async createNewCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const newCategory = await this.categoriesService.create(
      createCategoryDto,
      user.sub,
    )
    return plainToInstance(
      CategoryResponseDto,
      newCategory,
      getDefaultClassTransformOptions(),
    )
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
    return plainToInstance(
      CategoryResponseDto,
      updatedCategory,
      getDefaultClassTransformOptions(),
    )
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
    return plainToInstance(
      CategoryResponseDto,
      patchedCategory,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Delete category by ID" })
  @Delete("/:id")
  async removeCategoryById(@Param("id", ParseIntPipe) id: number) {
    const removedCategory = await this.categoriesService.remove(id)
    return plainToInstance(
      CategoryResponseDto,
      removedCategory,
      getDefaultClassTransformOptions(),
    )
  }
}
