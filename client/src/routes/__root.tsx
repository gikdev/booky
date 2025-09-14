import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRoute, Outlet } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { parseError, queryClient } from "../shared/api"
import toast, { Toaster } from "react-hot-toast"
import { useEffect, useState, type PropsWithChildren } from "react"
import { useThemeStore } from "#/shared/theme"
import TypesafeI18n, { useI18nContext } from "#/i18n/i18n-react"
import { loadLocaleAsync } from "#/i18n/i18n-util.async"
import { detectLocale } from "#/i18n/i18n-util"
import { localStorageDetector } from "typesafe-i18n/detectors"

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeContainer>
          <Outlet />
        </ThemeContainer>
      </I18nProvider>
      {/* <TanStackRouterDevtools /> */}
      <ReactQueryDevtools />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  )
}

function ThemeContainer({ children }: PropsWithChildren) {
  const theme = useThemeStore(s => s.theme)
  const { locale, LL } = useI18nContext()

  return (
    <div
      className="font-main flex flex-col fixed inset-0 h-full w-full bg-gray-10 text-gray-60 leading-normal"
      data-theme={theme}
      dir={LL.CONFIG_DIR()}
      lang={locale}
    >
      {children}
    </div>
  )
}

const detectedLocale = detectLocale(localStorageDetector)

function I18nProvider({ children }: PropsWithChildren) {
  const [wasLoaded, setWasLoaded] = useState(false)

  useEffect(() => {
    loadLocaleAsync(detectedLocale)
      .then(() => setWasLoaded(true))
      .catch(err => toast.error(parseError(err)))
  }, [])

  if (!wasLoaded) return null

  return <TypesafeI18n locale={detectedLocale}>{children}</TypesafeI18n>
}
