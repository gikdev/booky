import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import type { ConfigType } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { jwtConfig } from "../config/jwt.config"
import { ActiveUserData } from "../interfaces/active-user-data.interface"
import { AUTH_TYPE_KEY, REQ_USER_KEY } from "../constants"
import { AuthenticatedRequest } from "../interfaces/authenticated-request.interface"
import { Reflector } from "@nestjs/core"
import { AuthType } from "../types/auth-type.type"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const authType = this.getAuthType(ctx)

    if (authType === "none") return true
    if (authType === "bearer") await this.handleBearerAuth(ctx)

    throw new UnauthorizedException(`Unsupported auth type: ${authType}`)
  }

  private async handleBearerAuth(ctx: ExecutionContext) {
    const token = this.getToken(ctx)
    await this.setPayloadUp(ctx, token)
    return true
  }

  private getRequest(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>()
    return req
  }

  private getToken(ctx: ExecutionContext) {
    const req = this.getRequest(ctx)
    const [type, token] = req.headers.authorization?.split(" ") ?? []

    if (type !== "Bearer" || !token)
      throw new UnauthorizedException("Missing or malformed token")

    return token
  }

  private getAuthType(ctx: ExecutionContext): AuthType {
    const authType: AuthType =
      this.reflector.getAllAndOverride<AuthType>(AUTH_TYPE_KEY, [
        ctx.getHandler(),
        ctx.getClass(),
      ]) ?? "bearer"

    return authType
  }

  private async setPayloadUp(ctx: ExecutionContext, token: string) {
    const req = this.getRequest(ctx)

    try {
      const payload = await this.jwtService.verifyAsync<ActiveUserData>(token, {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
      })

      req[REQ_USER_KEY] = payload
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new UnauthorizedException("Token expired")
      }
      throw new UnauthorizedException("Invalid token")
    }
  }
}
