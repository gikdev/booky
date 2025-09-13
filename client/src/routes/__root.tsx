import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRoute, Outlet } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { queryClient } from "../shared/api"
import { Toaster } from "react-hot-toast"

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
      <ReactQueryDevtools />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  )
}
