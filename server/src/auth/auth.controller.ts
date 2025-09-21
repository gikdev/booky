import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./providers/auth.service"
import { LogInDto } from "./dtos/login.dto"
import { plainToInstance } from "class-transformer"
import { ApiOperation } from "@nestjs/swagger"
import { UserWithProfileResponseDto } from "src/users/dtos/user-with-profile-response.dto"
import { SignInDto } from "./dtos/signin.dto"
import { SignInResponseDto } from "./dtos/signin-response.dto"
import { Auth } from "./decorators/auth.decorator"
import { AuthType } from "./enums/auth-type.enum"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Log a user in", deprecated: true })
  @Post("login")
  @Auth(AuthType.None)
  async logIn(@Body() logInDto: LogInDto) {
    const user = await this.authService.login(logInDto)
    return plainToInstance(UserWithProfileResponseDto, user, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Sign a user in" })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  @Auth(AuthType.None)
  async signin(@Body() signInDto: SignInDto) {
    const result = await this.authService.signin(signInDto)
    return plainToInstance(SignInResponseDto, result, {
      excludeExtraneousValues: true,
    })
  }
}
