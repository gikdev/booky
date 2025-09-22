import { useQuery } from "@tanstack/react-query"
import { create } from "zustand"
import {
  type UserAuthResponseDto,
  usersControllerGetCurrentUserOptions,
} from "#/api-client"

interface AuthStore {
  accessToken: UserAuthResponseDto["tokens"]["accessToken"] | null
  refreshToken: UserAuthResponseDto["tokens"]["refreshToken"] | null
  userId: UserAuthResponseDto["user"]["id"] | null
}

export const useAuthStore = create<AuthStore>()(() => ({
  accessToken: null,
  refreshToken: null,
  userId: null,
}))

export const getAccessToken = () => useAuthStore.getState().accessToken

export const useCurrentUserQuery = () =>
  useQuery(usersControllerGetCurrentUserOptions())
