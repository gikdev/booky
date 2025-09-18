import { useQuery } from "@tanstack/react-query"
import { create } from "zustand"
import {
  type UserWithProfileResponseDto,
  usersControllerGetUserByIdOptions,
} from "#/api-client"

interface AuthStore {
  accessToken: string | null
  userId: UserWithProfileResponseDto["id"] | null
  setUserId: (userId: UserWithProfileResponseDto["id"] | null) => void
}

export const useAuthStore = create<AuthStore>()(set => ({
  accessToken: null,
  userId: null,
  setUserId: userId => set({ userId }),
}))

export function useIsUserAuthenticated() {
  const userId = useAuthStore(s => s.userId)
  return typeof userId === "number"
}

export function useCurrentUserQuery() {
  const userId = useAuthStore(s => s.userId)
  return useQuery({
    // biome-ignore lint/style/noNonNullAssertion: the `enabled` property makes sure that userId is a NUMBER!
    ...usersControllerGetUserByIdOptions({ path: { id: userId! } }),
    enabled: typeof userId === "number",
  })
}
