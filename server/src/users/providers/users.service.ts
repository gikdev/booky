import { Injectable } from "@nestjs/common"
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

  async findOneById(id: User['id']) {
    const user = await this.usersRepo.findOneBy({id})
    return user
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepo.create(createUserDto)
    await this.usersRepo.save(newUser)
    return newUser
  }
}
