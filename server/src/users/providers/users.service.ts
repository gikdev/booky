import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common"
import { Repository } from "typeorm"
import { User } from "../user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserDto } from "../dtos/create-user.dto"
import { throwConnectToDbException } from "src/shared/exceptions"

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
    let user: User | null

    try {
      user = await this.usersRepo.findOneBy({ id })
    } catch {
      throwConnectToDbException()
    }

    if (!user) {
      throw new BadRequestException(`User with id ${id} doesn't exist`)
    }

    return user
  }

  async create(createUserDto: CreateUserDto) {
    let existingUser: User | null = null

    try {
      existingUser = await this.usersRepo.findOne({
        where: { email: createUserDto.email },
      })
    } catch {
      throwConnectToDbException()
    }

    if (existingUser) {
      throw new BadRequestException(
        "A user with the provided email exists. Please check your email",
      )
    }

    let newUser = this.usersRepo.create(createUserDto)

    try {
      newUser = await this.usersRepo.save(newUser)
    } catch {
      throwConnectToDbException()
    }

    return newUser
  }
}
