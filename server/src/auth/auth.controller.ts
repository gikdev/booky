import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./providers/auth.service"
import { LogInDto } from "./dtos/login.dto"
import { plainToInstance } from "class-transformer"
import { ApiOperation } from "@nestjs/swagger"
import { UserWithProfileResponseDto } from "src/users/dtos/user-with-profile-response.dto"
import { SignInDto } from "./dtos/signin.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Log a user in", deprecated: true })
  @Post("login")
  async logIn(@Body() logInDto: LogInDto) {
    const user = await this.authService.login(logInDto)
    return plainToInstance(UserWithProfileResponseDto, user, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Sign a user in" })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signin(@Body() signInDto: SignInDto) {
    this.authService.signin(signInDto)
  }
}
