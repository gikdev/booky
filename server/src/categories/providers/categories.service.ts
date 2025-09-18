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

  async findAll() {
    return await this.categoriesRepo.find({
      relations: { books: true, owner: true },
    })
  }

  async findOneById(id: Category["id"]) {
    return await this.categoriesRepo.findOne({
      where: { id },
      relations: { books: true, owner: true },
    })
  }

  async findMultipleById(ids: Category["id"][]) {
    return await this.categoriesRepo.find({
      where: { id: In(ids) },
    })
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const owner = await this.usersService.findOneById(createCategoryDto.ownerId)
    if (!owner)
      throw new NotFoundException(
        `No owner found: ${createCategoryDto.ownerId}`,
      )

    const newCategory = this.categoriesRepo.create({
      ...createCategoryDto,
      owner,
    })

    await this.categoriesRepo.save(newCategory)
    return newCategory
  }

  async patch(id: Category["id"], patchCategoryDto: PatchCategoryDto) {
    const category = await this.categoriesRepo.findOneBy({ id })
    if (!category)
      throw new NotFoundException(`Category with ID: ${id} not found!`)

    category.description = patchCategoryDto.description ?? category.description
    category.title = patchCategoryDto.title ?? category.title
    category.color = patchCategoryDto.color ?? category.color

    if (patchCategoryDto.ownerId) {
      const owner = await this.usersService.findOneById(
        patchCategoryDto.ownerId,
      )
      if (!owner)
        throw new NotFoundException(
          `User with ID: ${patchCategoryDto.ownerId} not found`,
        )
      category.owner = owner
    }

    await this.categoriesRepo.save(category)
    return category
  }

  async update(id: Category["id"], updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepo.findOneBy({ id })
    if (!category)
      throw new NotFoundException(`Category with ID: ${id} not found!`)

    category.description = updateCategoryDto.description
    category.title = updateCategoryDto.title
    category.color = updateCategoryDto.color

    const owner = await this.usersService.findOneById(updateCategoryDto.ownerId)
    if (!owner)
      throw new NotFoundException(
        `User with ID: ${updateCategoryDto.ownerId} not found`,
      )
    category.owner = owner

    await this.categoriesRepo.save(category)
    return category
  }

  async remove(id: Category["id"]) {
    const category = await this.categoriesRepo.findOne({
      where: { id },
      relations: { books: true, owner: true },
    })
    if (!category)
      throw new NotFoundException(`Category with ID: ${id} not found`)

    await this.categoriesRepo.remove(category)
    return category
  }
}
