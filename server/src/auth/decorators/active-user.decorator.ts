import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common"
import { ActiveUserData } from "../interfaces/active-user-data.interface"
import { REQ_USER_KEY } from "../constants"
import { AuthenticatedRequest } from "../interfaces/authenticated-request.interface"

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>()
    const user = req[REQ_USER_KEY]
    if (!user) throw new UnauthorizedException()
    if (field) return user?.[field]
    return user
  },
)
