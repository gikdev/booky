import { SetMetadata } from "@nestjs/common"
import { AUTH_TYPE_KEY } from "../constants"
import { AuthType } from "../types/auth-type.type"

export const Auth = (authType: AuthType) => SetMetadata(AUTH_TYPE_KEY, authType)
