import { SignInIcon, UserPlusIcon } from "@phosphor-icons/react"
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router"
import { useMemo } from "react"
import { type TabItem, Tabs } from "#/components/Tabs"
import { t } from "#/i18n"

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex-1 flex flex-col py-4 gap-8 items-center overflow-y-auto">
      <img src="/images/logo-full.png" alt="" className="w-max" />

      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-bold text-gray-90 text-2xl">
          {t.c.capital(t.authWelcomeTitle)}
        </h1>
        <p>{t.c.sentence(t.authWelcomeDescription)}</p>
      </div>

      <AuthTabs />

      <Outlet />
    </div>
  )
}

function AuthTabs() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const items: TabItem[] = useMemo(
    () => [
      {
        id: "login",
        Icon: SignInIcon,
        title: t.c.capital(t.login),
        isActive: pathname === "/auth/login",
        onClick: () => navigate({ to: "/auth/login" }),
      },
      {
        id: "signup",
        Icon: UserPlusIcon,
        title: t.c.capital(t.register),
        isActive: pathname === "/auth/signup",
        onClick: () => navigate({ to: "/auth/signup" }),
      },
    ],
    [navigate, pathname],
  )

  return <Tabs items={items} />
}
