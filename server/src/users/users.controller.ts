import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UsersService } from "./providers/users.service"
import { plainToInstance } from "class-transformer"
import { UserWithProfileResponseDto } from "./dtos/user-with-profile-response.dto"
import { ApiOperation } from "@nestjs/swagger"
import { User } from "./user.entity"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @Get()
  async getUsers() {
    const users = await this.usersService.findAll()

    return plainToInstance(UserWithProfileResponseDto, users, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Get user by ID" })
  @Get("/:id")
  async getUserById(@Param("id", ParseIntPipe) id: User["id"]) {
    const user = await this.usersService.findOneById(id)

    return plainToInstance(UserWithProfileResponseDto, user, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Create a user" })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto)

    return plainToInstance(UserWithProfileResponseDto, newUser, {
      excludeExtraneousValues: true,
    })
  }
}
