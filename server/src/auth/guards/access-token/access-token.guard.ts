import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import type { ConfigType } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { jwtConfig } from "src/auth/config/jwt.config"
import { REQ_USER_KEY } from "src/auth/constants"
import { ActiveUserData } from "src/auth/interfaces/active-user-data.interface"

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = req.headers.authorization?.split(" ")?.[1]

    if (!token) throw new UnauthorizedException("No token!")

    const payload: ActiveUserData | undefined =
      await this.jwtService.verifyAsync<ActiveUserData>(
        token,
        this.jwtConfiguration,
      )

    if (!payload) throw new UnauthorizedException()

    req[REQ_USER_KEY] = payload

    return true
  }
}
