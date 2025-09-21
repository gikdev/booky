import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./providers/auth.service"
import { plainToInstance } from "class-transformer"
import { ApiOperation } from "@nestjs/swagger"
import { SignInDto } from "./dtos/signin.dto"
import { SignInResponseDto } from "./dtos/signin-response.dto"
import { Auth } from "./decorators/auth.decorator"
import { RefreshTokenDto } from "./dtos/refresh-token.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Sign a user in" })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  @Auth("none")
  async signin(@Body() signInDto: SignInDto) {
    const result = await this.authService.signin(signInDto)

    return plainToInstance(SignInResponseDto, result, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Refresh some tokens" })
  @HttpCode(HttpStatus.OK)
  @Post("refresh-tokens")
  @Auth("none")
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    const result = await this.authService.refreshTokens(refreshTokenDto)

    return plainToInstance(SignInResponseDto, result, {
      excludeExtraneousValues: true,
    })
  }
}
