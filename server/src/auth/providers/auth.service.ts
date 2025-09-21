import { Injectable } from "@nestjs/common"
import { SignInDto } from "../dtos/signin.dto"
import { SignInProvider } from "./sign-in.provider"
import { RefreshTokensProvider } from "./refresh-tokens.provider"
import { RefreshTokenDto } from "../dtos/refresh-token.dto"

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  signin(signInDto: SignInDto) {
    return this.signInProvider.signin(signInDto)
  }

  refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensProvider.refreshTokens(refreshTokenDto)
  }
}
