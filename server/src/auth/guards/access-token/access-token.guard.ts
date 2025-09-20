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

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      )
      req[REQ_USER_KEY] = payload
    } catch {}

    return true
  }
}
