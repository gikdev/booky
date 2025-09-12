import { RequestTimeoutException } from "@nestjs/common"

export function throwConnectToDbException(): never {
  throw new RequestTimeoutException(
    "Unable to process your request at the moment, please try later",
    { description: "Error connecting to the database" },
  )
}
