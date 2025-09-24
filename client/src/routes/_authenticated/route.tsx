import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { useEffect } from "react"
import { authControllerRefreshTokens, client } from "#/api-client"
import {
  getAccessToken,
  useAuthStore,
  useCurrentUserQuery,
} from "#/shared/auth"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  loader() {
    const authStoreState = useAuthStore.getState()

    const isAuthenticated =
      typeof authStoreState.userId === "number" &&
      typeof authStoreState.accessToken === "string" &&
      typeof authStoreState.refreshToken === "string"

    if (!isAuthenticated) throw redirect({ to: "/intro" })
  },
})

function RouteComponent() {
  return (
    <>
      <RefreshTokenManager />
      <FetchClientConfigurator />
      <UserFetcher />
      <Outlet />
    </>
  )
}

// It's a component so it'd NOT CAUSE ANY RE-RENDER when anything
// related to `useCurrentUserQuery()` changes
function UserFetcher() {
  useCurrentUserQuery()
  return null
}

function FetchClientConfigurator() {
  useEffect(() => {
    addAuth()
    return () => removeAuth()
  }, [])

  return null
}

function addAuth() {
  client.setConfig({
    auth: () => getAccessToken() ?? "",
  })
  client.interceptors.error.use(() => {})
}

function removeAuth() {
  client.setConfig({ auth: undefined })
}

function RefreshTokenManager() {
  useEffect(() => {
    const interceptorId = client.interceptors.response.use(
      refreshTokenInterceptor,
    )
    return () => client.interceptors.response.eject(interceptorId)
  }, [])

  return null
}

async function refreshTokenInterceptor(res: Response, req: Request) {
  if (res.status !== 401) return res

  try {
    const refreshToken = useAuthStore.getState().refreshToken

    if (!refreshToken) throw new Error("No refresh token")

    const { data } = await authControllerRefreshTokens({
      body: { refreshToken },
    })

    if (!data) throw new Error("Server did not send tokens back")

    useAuthStore.setState({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    })

    const retryRes = fetch(req.url, {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${data.accessToken}`,
      },
    })

    return retryRes
  } catch {
    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      userId: null,
    })

    throw redirect({ to: "/intro" })
  }
}
