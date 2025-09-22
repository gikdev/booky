import { Injectable, NotFoundException } from "@nestjs/common"
import { In, Repository } from "typeorm"
import { Category } from "../category.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateCategoryDto } from "../dtos/create-category.dto"
import { UsersService } from "src/users/providers/users.service"
import { UpdateCategoryDto } from "../dtos/update-category.dto"
import { PatchCategoryDto } from "../dtos/patch-category.dto"

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
    private readonly usersService: UsersService,
  ) {}

  findAll() {
    return this.categoriesRepo.find()
  }

  async findOneById(id: number) {
    const category = await this.categoriesRepo.findOne({
      where: { id },
    })

    if (!category)
      throw new NotFoundException(`Category with ID: ${id} was not found!`)

    return category
  }

  async findOneByIdAndOwnerId(id: number, ownerId: number) {
    const category = await this.categoriesRepo.findOne({
      where: { id, owner: { id: ownerId } },
    })

    if (!category)
      throw new NotFoundException(
        `Category with ID: ${id} & owner ID: ${ownerId} was not found!`,
      )

    return category
  }

  findMultipleByIds(ids: number[]) {
    return this.categoriesRepo.find({
      where: { id: In(ids) },
    })
  }

  findMultipleByOwnerId(ownerId: number) {
    return this.categoriesRepo.find({
      where: { owner: { id: ownerId } },
    })
  }

  findMultipleByIdsAndOwnerId(ids: number[], ownerId: number) {
    return this.categoriesRepo.find({
      where: { id: In(ids), owner: { id: ownerId } },
    })
  }

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const owner = await this.usersService.findOneById(userId)
    const newCategory = this.categoriesRepo.create({
      ...createCategoryDto,
      owner,
    })

    await this.categoriesRepo.save(newCategory)
    return newCategory
  }

  async patch(id: Category["id"], patchCategoryDto: PatchCategoryDto) {
    const category = await this.findOneById(id)

    category.description = patchCategoryDto.description ?? category.description
    category.title = patchCategoryDto.title ?? category.title
    category.color = patchCategoryDto.color ?? category.color

    await this.categoriesRepo.save(category)
    return category
  }

  async update(id: Category["id"], updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOneById(id)

    category.description = updateCategoryDto.description
    category.title = updateCategoryDto.title
    category.color = updateCategoryDto.color

    await this.categoriesRepo.save(category)
    return category
  }

  async remove(id: Category["id"]) {
    const category = await this.findOneById(id)
    await this.categoriesRepo.remove(category)
    return category
  }
}
