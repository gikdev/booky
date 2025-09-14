import { CaretLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { contentContainer, page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"
import { btn, fieldWithLabelContainer, inputField } from "#/forms/skins"
import { Switch } from "#/components/Switch"
import { useThemeStore } from "#/shared/theme"
import { useI18nContext } from "#/i18n/i18n-react"
import type { Locales } from "#/i18n/i18n-types"
import { loadLocaleAsync } from "#/i18n/i18n-util.async"
import toast from "react-hot-toast"
import { parseError } from "#/shared/api"
import { useState, type ChangeEvent } from "react"
import { useShouldMirror } from "#/i18n/helpers"

export const Route = createFileRoute("/_authenticated/profile/settings/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { LL } = useI18nContext()

  return (
    <div className={page()}>
      <NavBar title={LL.SETTINGS()} slotStart={<GoBackBtn />} />

      <div className={contentContainer({ className: "gap-6 p-4" })}>
        <ThemeToggleField />
        <SelectLanguageField />
      </div>
    </div>
  )
}

function GoBackBtn() {
  const shouldMirror = useShouldMirror()

  return (
    <Link
      to="/profile"
      className={btn({ isIcon: true, size: "sm", mode: "text" })}
    >
      <CaretLeftIcon mirrored={shouldMirror} />
    </Link>
  )
}

function ThemeToggleField() {
  const { LL } = useI18nContext()
  const theme = useThemeStore(s => s.theme)

  const toggleTheme = () => useThemeStore.getState().toggleTheme()

  return (
    <button
      type="button"
      className="flex items-center justify-between cursor-pointer min-h-14"
      onClick={toggleTheme}
    >
      <span>{LL.DARK_THEME()}:</span>

      <Switch selected={theme === "dark"} />
    </button>
  )
}

function SelectLanguageField() {
  const { locale, setLocale, LL } = useI18nContext()
  const [isLoading, setLoading] = useState(false)

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locales

    try {
      setLoading(true)
      await loadLocaleAsync(newLocale)
      setLocale(newLocale)
    } catch (error) {
      toast.error(`${parseError(error)}. ${LL.PLEASE_TRY_AGAIN()}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <label className={fieldWithLabelContainer()}>
      <p>{LL.LANGUAGE()}:</p>

      <select
        className={inputField()}
        value={locale}
        disabled={isLoading}
        onChange={handleChange}
      >
        <option value="fa">فارسی</option>
        <option value="en">English</option>
      </select>

      <Link to="/auth/login">login</Link>
    </label>
  )
}
