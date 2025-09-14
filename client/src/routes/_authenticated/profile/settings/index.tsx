import { CaretLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { contentContainer, page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"
import { btn } from "#/forms/skins"
import { Switch } from "#/components/Switch"
import { useThemeStore } from "#/shared/theme"

export const Route = createFileRoute("/_authenticated/profile/settings/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <NavBar title="تنظیمات" slotStart={<GoBackBtn />} />

      <div className={contentContainer({ className: "gap-6 p-4" })}>
        <ThemeToggleField />
      </div>
    </div>
  )
}

const GoBackBtn = () => (
  <Link
    to="/profile"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <CaretLeftIcon mirrored />
  </Link>
)

function ThemeToggleField() {
  const theme = useThemeStore(s => s.theme)

  const toggleTheme = () => useThemeStore.getState().toggleTheme()

  return (
    <button
      type="button"
      className="flex items-center justify-between cursor-pointer min-h-14"
      onClick={toggleTheme}
    >
      <span>تم تاریک:</span>

      <Switch selected={theme === "dark"} />
    </button>
  )
}
