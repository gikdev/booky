import { Request } from "express"
import { REQ_USER_KEY } from "../constants"
import { ActiveUserData } from "./active-user-data.interface"

export interface AuthenticatedRequest extends Request {
  [REQ_USER_KEY]?: ActiveUserData
}
