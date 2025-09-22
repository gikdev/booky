import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./providers/auth.service"
import { plainToInstance } from "class-transformer"
import { ApiOperation } from "@nestjs/swagger"
import { SignInDto } from "./dtos/sign-in.dto"
import { SignInResponseDto } from "./dtos/sign-in-response.dto"
import { Auth } from "./decorators/auth.decorator"
import { RefreshTokenDto } from "./dtos/refresh-token.dto"
import { SignUpDto } from "./dtos/sign-up.dto"
import { SignUpResponseDto } from "./dtos/sign-up-response.dto"

@Controller("auth")
@Auth("none")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Sign a user up" })
  @HttpCode(HttpStatus.OK)
  @Post("sign-up")
  async signUp(@Body() signUpDto: SignUpDto) {
    const result = await this.authService.signUp(signUpDto)

    return plainToInstance(SignUpResponseDto, result, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Sign a user in" })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto)

    return plainToInstance(SignInResponseDto, result, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Refresh some tokens" })
  @HttpCode(HttpStatus.OK)
  @Post("refresh-tokens")
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    const result = await this.authService.refreshTokens(refreshTokenDto)

    return plainToInstance(SignInResponseDto, result, {
      excludeExtraneousValues: true,
    })
  }
}
