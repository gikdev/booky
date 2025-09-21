// import { useQuery } from "@tanstack/react-query"
import { create } from "zustand"

interface AuthStore {
  accessToken: string | null
  refreshToken: string | null
}

export const useAuthStore = create<AuthStore>()(() => ({
  accessToken: null,
  refreshToken: null,
}))

export function useCurrentUserQuery() {
  // return useQuery({
  //   queryKey: [],
  //   queryFn: () => {},
  // });
}
