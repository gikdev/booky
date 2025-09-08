import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UsersService } from "./providers/users.service"
import { GetUsersQueriesDto } from "./dtos/get-users-queries.dto"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() getUsersQueriesDto: GetUsersQueriesDto) {
    return this.usersService.findAll({
      includeProfile: getUsersQueriesDto.includeProfile,
    })
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
