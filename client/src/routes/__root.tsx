import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRoute, Outlet } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { queryClient } from "../shared/api"
import { Toaster } from "react-hot-toast"
import type { PropsWithChildren } from "react"
import { useThemeStore } from "#/shared/theme"
import { t, useI18nStore } from "#/i18n"

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContainer>
        <Outlet />
      </ThemeContainer>
      {/* <TanStackRouterDevtools /> */}
      <ReactQueryDevtools />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  )
}

function ThemeContainer({ children }: PropsWithChildren) {
  const theme = useThemeStore(s => s.theme)
  const lang = useI18nStore(s => s.currentLang)

  return (
    <div
      className="font-main flex flex-col fixed inset-0 h-full w-full bg-gray-10 text-gray-60 leading-normal"
      data-theme={theme}
      dir={t.configDir}
      lang={lang}
    >
      {children}
    </div>
  )
}
