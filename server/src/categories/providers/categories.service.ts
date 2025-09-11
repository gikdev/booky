import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { In, Repository } from "typeorm"
import { Category } from "../category.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateCategoryDto } from "../dtos/create-category.dto"
import { BooksService } from "src/books/providers/books.service"
import { UsersService } from "src/users/providers/users.service"
import { UpdateCategoryDto } from "../dtos/update-category.dto"

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
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

  async update(id: Category["id"], updateCategoryDto: UpdateCategoryDto) {}

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
