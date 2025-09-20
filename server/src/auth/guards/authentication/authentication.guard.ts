import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AccessTokenGuard } from "../access-token/access-token.guard"
import { AuthType } from "src/auth/enums/auth-type.enum"
import { AUTH_TYPE_KEY } from "src/auth/constants"

type AuthTypeGuardMap = Record<AuthType, CanActivate | CanActivate[]>

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const authTypeGuardMap: AuthTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    }

    const authTypes: AuthType[] = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [ctx.getHandler(), ctx.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType]

    const guards = authTypes.map(t => authTypeGuardMap[t]).flat()

    for (const guard of guards) {
      const canActivate = await Promise.resolve(guard.canActivate(ctx)).catch(
        err => ({ error: err }),
      )

      if (!canActivate) throw new UnauthorizedException()
    }

    return true
  }
}
