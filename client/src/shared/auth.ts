import { useQuery } from "@tanstack/react-query"
import { create } from "zustand"
import {
  type UserWithProfileResponseDto,
  usersControllerGetUserByIdOptions,
} from "#/api-client"

interface AuthStore {
  userId: UserWithProfileResponseDto["id"] | null
  setUserId: (userId: UserWithProfileResponseDto["id"] | null) => void
}

export const useAuthStore = create<AuthStore>()(set => ({
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
    ...usersControllerGetUserByIdOptions({ path: { id: userId! } }),
    enabled: typeof userId === "number",
  })
}
