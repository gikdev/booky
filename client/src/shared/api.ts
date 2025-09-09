import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export function parseError(error: unknown, msg?: string) {
  if (typeof error === "string") {
    try {
      const parsed = JSON.parse(error)

      if (typeof parsed === "object" && parsed !== null) {
        if ("msg" in parsed && typeof parsed.msg === "string") return parsed.msg
        if ("message" in parsed && typeof parsed.message === "string")
          return parsed.message
        if ("name" in parsed && typeof parsed.name === "string")
          return parsed.name
        if ("title" in parsed && typeof parsed.title === "string")
          return parsed.title
        if ("status" in parsed && typeof parsed.status === "number") {
          if (parsed.status === 401)
            return "دسترسی نامعتبر هست، لطفا از حساب خارج شده و دوباره وارد شوید"
        }
      }
    } catch {
      return error
    }
  }

  if (typeof error === "object" && error !== null) {
    if ("msg" in error && typeof error.msg === "string") return error.msg
    if ("message" in error && typeof error.message === "string")
      return error.message
    if ("name" in error && typeof error.name === "string") return error.name
    if ("title" in error && typeof error.title === "string") return error.title
    if ("status" in error && typeof error.status === "number") {
      if (error.status === 401)
        return "دسترسی نامعتبر هست، لطفا از حساب خارج شده و دوباره وارد شوید"
    }
  }

  return msg || "خطایی رخ داد!"
}
