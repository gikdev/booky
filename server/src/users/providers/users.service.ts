import { BadRequestException, Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { User } from "../user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserDto } from "../dtos/create-user.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll() {
    const allUsers = await this.usersRepo.find({
      relations: { profile: true },
    })

    return allUsers
  }

  async findOneById(id: User["id"]) {
    const user = await this.usersRepo.findOneBy({ id })
    if (!user) throw new BadRequestException(`User with id ${id} doesn't exist`)

    return user
  }

  async findOneByEmailOrNull(email: User["email"]) {
    const user = await this.usersRepo.findOne({
      where: { email },
      relations: { profile: true },
    })

    return user
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepo.findOne({
      where: { email: createUserDto.email },
    })

    if (existingUser)
      throw new BadRequestException(
        "A user with the provided email exists. Please check your email",
      )

    let newUser = this.usersRepo.create(createUserDto)

    newUser = await this.usersRepo.save(newUser)

    return newUser
  }
}
