import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { User } from "../user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { plainToInstance } from "class-transformer"
import { UserResponseDto } from "../dtos/user-response.dto"
import { CreateUserDto } from "../dtos/create-user.dto"
import { UserWithProfileResponseDto } from "../dtos/user-with-profile-response.dto"

interface FindAllProps {
  includeProfile?: boolean
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll({ includeProfile = false }: FindAllProps) {
    const allUsers = await this.usersRepo.find({
      relations: {
        profile: includeProfile,
      },
    })

    return plainToInstance(
      includeProfile ? UserWithProfileResponseDto : UserResponseDto,
      allUsers,
      {
        excludeExtraneousValues: true,
      },
    )
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepo.create(createUserDto)
    await this.usersRepo.save(newUser)
    return plainToInstance(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    })
  }
}
