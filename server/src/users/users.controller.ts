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
import { ApiOperation, ApiParam } from "@nestjs/swagger"
import { User } from "./user.entity"
import { Auth } from "src/auth/decorators/auth.decorator"
import { ActiveUser } from "src/auth/decorators/active-user.decorator"
import type { ActiveUserData } from "src/auth/interfaces/active-user-data.interface"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @Get()
  @Auth("none")
  async getUsers() {
    const users = await this.usersService.findAll()

    return plainToInstance(UserWithProfileResponseDto, users, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Get the current user" })
  @Get("me")
  async getCurrentUser(@ActiveUser() userData: ActiveUserData) {
    const user = await this.usersService.findOneById(userData.sub)

    return plainToInstance(UserWithProfileResponseDto, user, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", required: true, type: Number })
  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) id: User["id"]) {
    const user = await this.usersService.findOneById(id)

    return plainToInstance(UserWithProfileResponseDto, user, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Create a user" })
  @Post()
  @Auth("none")
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto)

    return plainToInstance(UserWithProfileResponseDto, newUser, {
      excludeExtraneousValues: true,
    })
  }
}
