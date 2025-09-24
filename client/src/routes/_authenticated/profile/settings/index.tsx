import { CaretLeftIcon, WarningIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import type { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { Switch } from "#/components/Switch"
import {
  btn,
  fieldWithLabelContainer,
  inputField,
  smallMsg,
} from "#/forms/skins"
import { type Language, languages, t, useI18nStore } from "#/i18n"
import { contentContainer, page } from "#/shared/skins"
import { useThemeStore } from "#/shared/theme"
import { NavBar } from "../../-Navbar"

export const Route = createFileRoute("/_authenticated/profile/settings/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <NavBar title={t.c.sentence(t.settings)} slotStart={<GoBackBtn />} />

      <div className={contentContainer({ className: "gap-6 p-4" })}>
        <ThemeToggleField />
        <SelectLanguageField />
      </div>
    </div>
  )
}

function GoBackBtn() {
  return (
    <Link
      to="/profile"
      className={btn({ isIcon: true, size: "sm", mode: "text" })}
    >
      <CaretLeftIcon mirrored={t.configIconMirror} />
    </Link>
  )
}

function ThemeToggleField() {
  const theme = useThemeStore(s => s.theme)

  const toggleTheme = () => useThemeStore.getState().toggleTheme()

  return (
    <button
      type="button"
      className="flex items-center justify-between cursor-pointer min-h-14"
      onClick={toggleTheme}
    >
      <span>{t.c.sentence(t.darkTheme)}:</span>

      <Switch selected={theme === "dark"} />
    </button>
  )
}

function SelectLanguageField() {
  const currentLang = useI18nStore(s => s.currentLang)
  const setCurrentLang = useI18nStore(s => s.setCurrentLang)

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value

    if (languages.includes(newLang as Language)) {
      setCurrentLang(newLang as Language)
      location.reload()
    } else {
      toast("...")
    }
  }

  return (
    <label className={fieldWithLabelContainer()}>
      <p>{t.c.sentence(t.language)}:</p>

      <select
        className={inputField()}
        value={currentLang}
        onChange={handleChange}
      >
        <option value="fa">{t.c.capital(t.languagesName.fa)}</option>
        <option value="en">{t.c.capital(t.languagesName.en)}</option>
      </select>

      <p className={smallMsg({ intent: "warning" })}>
        <WarningIcon size={16} className="inline-block me-1" />
        <span>{t.c.sentence(t.settingsPage.languageChangeWarning)}</span>
      </p>
    </label>
  )
}
