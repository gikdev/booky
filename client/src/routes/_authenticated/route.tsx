import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { useAuthStore } from "#/shared/auth"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad() {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({ to: "/intro" })
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
