import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { RefreshTokenDto } from "../dtos/refresh-token.dto"
import type { ConfigType } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { jwtConfig } from "../config/jwt.config"
import { GenerateTokensProvider } from "./generate-tokens.provider"
import { UsersService } from "src/users/providers/users.service"
import { ActiveUserData } from "../interfaces/active-user-data.interface"

@Injectable()
export class RefreshTokensProvider {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly generateTokensProvider: GenerateTokensProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async refreshTokens({ refreshToken }: RefreshTokenDto) {
    const { sub } = await this.jwtService.verifyAsync<
      Pick<ActiveUserData, "sub">
    >(refreshToken, {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
    })

    const user = await this.usersService.findOneById(sub)
    return await this.generateTokensProvider.generateTokens(user)
  }
}
