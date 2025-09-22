import { Inject, Injectable } from "@nestjs/common"
import type { ConfigType } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { jwtConfig } from "../config/jwt.config"
import { User } from "src/users/user.entity"
import { ActiveUserData } from "../interfaces/active-user-data.interface"

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signToken<T extends Record<string, unknown>>(
    userId: number,
    expiresIn: string,
    payload?: T,
  ) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    )
  }

  async generateTokens(user: User) {
    const accessToken = await this.signToken<Partial<ActiveUserData>>(
      user.id,
      this.jwtConfiguration.accessTokenTtl,
      { email: user.email },
    )
    const refreshToken = await this.signToken<Partial<ActiveUserData>>(
      user.id,
      this.jwtConfiguration.refreshTokenTtl,
    )
    return { accessToken, refreshToken }
  }
}
