import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./providers/auth.service"
import { ApiOperation } from "@nestjs/swagger"
import { SignInDto } from "./dtos/sign-in.dto"
import { Auth } from "./decorators/auth.decorator"
import { RefreshTokenDto } from "./dtos/refresh-token.dto"
import { TokensResponseDto } from "./dtos/tokens-response.dto"
import { UserAuthResponseDto } from "./dtos/user-auth-response.dto"
import { CreateUserDto } from "src/users/dtos/create-user.dto"
import { toDto } from "src/shared/utils"

@Controller("auth")
@Auth("none")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Sign a user up" })
  @HttpCode(HttpStatus.OK)
  @Post("sign-up")
  async signUp(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.signUp(createUserDto)

    return toDto(UserAuthResponseDto, result)
  }

  @ApiOperation({ summary: "Sign a user in" })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto)

    return toDto(UserAuthResponseDto, result)
  }

  @ApiOperation({ summary: "Refresh some tokens" })
  @HttpCode(HttpStatus.OK)
  @Post("refresh-tokens")
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    const result = await this.authService.refreshTokens(refreshTokenDto)

    return toDto(TokensResponseDto, result)
  }
}
