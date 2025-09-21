import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AccessTokenGuard } from "../access-token/access-token.guard"
import { AUTH_TYPE_KEY } from "src/auth/constants"
import { AuthType } from "src/auth/types/auth-type.type"

type AuthTypeGuardMap = Record<AuthType, CanActivate | CanActivate[]>

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const defaultAuthType: AuthType = "bearer"

    const authTypeGuardMap: AuthTypeGuardMap = {
      bearer: this.accessTokenGuard,
      none: { canActivate: () => true },
    }

    const authTypes: AuthType[] = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [ctx.getHandler(), ctx.getClass()],
    ) ?? [defaultAuthType]

    const guards = authTypes?.map?.(t => authTypeGuardMap[t]).flat() ?? []
    const error = new UnauthorizedException()

    for (const guard of guards) {
      if (!guard) throw error

      const canActivate = await Promise.resolve(guard.canActivate(ctx))

      if (canActivate) return true
    }

    throw error
  }
}
