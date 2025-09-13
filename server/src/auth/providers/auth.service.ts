import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UsersService } from "src/users/providers/users.service"
import { LogInDto } from "../dtos/login.dto"

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(logInDto: LogInDto) {
    const user = await this.usersService.findOneByEmailOrNull(logInDto.email)
    if (!user || user.password !== logInDto.password)
      throw new UnauthorizedException("Invalid credentials")
    return user
  }
}
