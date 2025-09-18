import { QueryClient } from "@tanstack/react-query"
import { t } from "#/i18n"

export const queryClient = new QueryClient()

export function parseError(error: unknown, msg?: string): string {
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
          if (parsed.status === 401) return t.unAuthorizedErrorMsg()
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
    if ("message" in error && Array.isArray(error.message))
      return error.message[0]
    if ("name" in error && typeof error.name === "string") return error.name
    if ("title" in error && typeof error.title === "string") return error.title
    if ("status" in error && typeof error.status === "number") {
      if (error.status === 401) return t.unAuthorizedErrorMsg()
    }
  }

  return msg || t.generalErrorMsg.sentence()
}

export const colors = [
  "ef4444",
  "f97316",
  "f59e0b",
  "eab308",
  "84cc16",
  "22c55e",
  "10b981",
  "14b8a6",
  "06b6d4",
  "0ea5e9",
  "3b82f6",
  "6366f1",
  "8b5cf6",
  "a855f7",
  "d946ef",
  "ec4899",
  "f43f5e",
]
