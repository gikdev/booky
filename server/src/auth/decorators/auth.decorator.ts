import { SetMetadata } from "@nestjs/common"
import { AUTH_TYPE_KEY } from "../constants"

type AuthType = "none" | "bearer"

export const Auth = (authType: AuthType) => SetMetadata(AUTH_TYPE_KEY, authType)
// export const Auth = (authType: AuthType) => SetMetadata(AUTH_TYPE_KEY, authType);
// export const Auth = (...authType: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, authType);
