import { Injectable } from "@nestjs/common"
import { SignInDto } from "../dtos/sign-in.dto"
import { SignInProvider } from "./sign-in.provider"
import { RefreshTokensProvider } from "./refresh-tokens.provider"
import { RefreshTokenDto } from "../dtos/refresh-token.dto"
import { CreateUserDto } from "src/users/dtos/create-user.dto"
import { SignUpProvider } from "./sign-up.provider"

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
    private readonly signUpProvider: SignUpProvider,
  ) {}

  signUp(createUserDto: CreateUserDto) {
    return this.signUpProvider.signUp(createUserDto)
  }

  signIn(signInDto: SignInDto) {
    return this.signInProvider.signin(signInDto)
  }

  refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensProvider.refreshTokens(refreshTokenDto)
  }
}
