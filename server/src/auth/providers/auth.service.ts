import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { SignInDto } from "../dtos/sign-in.dto"
import { SignInProvider } from "./sign-in.provider"
import { RefreshTokensProvider } from "./refresh-tokens.provider"
import { RefreshTokenDto } from "../dtos/refresh-token.dto"
import { SignUpDto } from "../dtos/sign-up.dto"
import { UsersService } from "src/users/providers/users.service"

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  async signUp({ createUserDto }: SignUpDto) {
    const user = await this.usersService.create(createUserDto)

    const tokens = await this.signInProvider.signin({
      email: createUserDto.email,
      password: createUserDto.password,
    })

    return { user, tokens }
  }

  signIn(signInDto: SignInDto) {
    return this.signInProvider.signin(signInDto)
  }

  refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensProvider.refreshTokens(refreshTokenDto)
  }
}
