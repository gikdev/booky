import { useAuthStore } from "#/shared/auth"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad({ location }) {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function RouteComponent() {
  return <div>Hello "/"!</div>
}
