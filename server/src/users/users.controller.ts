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
import { UserWithProfileResponseDto } from "./dtos/user-with-profile-response.dto"
import { ApiBearerAuth, ApiOperation, ApiParam } from "@nestjs/swagger"
import { User } from "./user.entity"
import { ActiveUser } from "src/auth/decorators/active-user.decorator"
import type { ActiveUserData } from "src/auth/interfaces/active-user-data.interface"
import { plainToInstance } from "class-transformer"
import { getDefaultClassTransformOptions } from "src/shared/utils"

@Controller("users")
@ApiBearerAuth("bearer")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @Get()
  async getUsers() {
    const users = await this.usersService.findAll()

    return plainToInstance(
      UserWithProfileResponseDto,
      users,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Get the current user" })
  @Get("me")
  async getCurrentUser(@ActiveUser() userData: ActiveUserData) {
    const user = await this.usersService.findOneById(userData.sub)

    return plainToInstance(
      UserWithProfileResponseDto,
      user,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", required: true, type: Number })
  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) id: User["id"]) {
    const user = await this.usersService.findOneById(id)

    return plainToInstance(
      UserWithProfileResponseDto,
      user,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiOperation({ summary: "Create a user" })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto)

    return plainToInstance(
      UserWithProfileResponseDto,
      newUser,
      getDefaultClassTransformOptions(),
    )
  }
}
