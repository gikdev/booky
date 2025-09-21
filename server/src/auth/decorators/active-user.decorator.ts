import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { ActiveUserData } from "../interfaces/active-user-data.interface"
import { REQ_USER_KEY } from "../constants"

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    const user: ActiveUserData = req[REQ_USER_KEY]
    return field ? user?.[field] : user
  },
)
