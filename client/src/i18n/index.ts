import { create } from "zustand"
import { persist } from "zustand/middleware"
import { fa } from "./fa"
import { en } from "./en"

export const languages = ["en", "fa"] as const
export type Language = (typeof languages)[number]

const defaultLang: Language = "en"

interface I18nStore {
  currentLang: Language
  setCurrentLang: (currentLang: Language) => void
}

export const useI18nStore = create<I18nStore>()(
  persist(
    set => ({
      currentLang: defaultLang,
      setCurrentLang: currentLang => set({ currentLang }),
    }),
    { name: "BOOKY_APP_LANG" },
  ),
)

export const t = (() => {
  const lang = useI18nStore.getState().currentLang
  if (lang === "en") return en
  if (lang === "fa") return fa
  return fa
})()
