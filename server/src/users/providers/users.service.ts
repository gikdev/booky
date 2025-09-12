import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common"
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
    return user
  }

  async create(createUserDto: CreateUserDto) {
    let existingUser: User | null = null

    try {
      existingUser = await this.usersRepo.findOne({
        where: { email: createUserDto.email },
      })
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment, please try later",
        { description: "Error connecting to the database" },
      )
    }

    if (existingUser) {
      throw new BadRequestException(
        "A user with the provided email exists. Please check your email",
      )
    }

    const newUser = this.usersRepo.create(createUserDto)

    await this.usersRepo.save(newUser)

    return newUser
  }
}
