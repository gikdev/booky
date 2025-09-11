import { Injectable } from "@nestjs/common"
import { In, Repository } from "typeorm"
import { Category } from "../category.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateCategoryDto } from "../dtos/create-category.dto"

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoriesRepo.find()
  }

  async findMultipleById(ids: Category["id"][]) {
    return await this.categoriesRepo.find({
      where: { id: In(ids) },
    })
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoriesRepo.create(createCategoryDto)
    await this.categoriesRepo.save(newCategory)
    return newCategory
  }
}
