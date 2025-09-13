import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { useAuthStore, useCurrentUserQuery } from "#/shared/auth"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  loader() {
    const isAuthenticated = typeof useAuthStore.getState().userId === "number"
    if (!isAuthenticated) throw redirect({ to: "/intro" })
  },
})

function RouteComponent() {
  return (
    <>
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
