import { t, useI18nStore } from "#/i18n"

export function getLanguageByCode(langCode: string) {
  if (langCode === "fa") return t.c.capital(t.languagesName.fa)
  if (langCode === "en") return t.c.capital(t.languagesName.en)
  if (langCode === "ar") return t.c.capital(t.languagesName.ar)
  if (langCode === "jp") return t.c.capital(t.languagesName.jp)
  if (langCode === "fr") return t.c.capital(t.languagesName.fr)
  return langCode
}

function convertToPersianDigits(input: string): string {
  return input
    .replaceAll("0", "۰")
    .replaceAll("1", "۱")
    .replaceAll("2", "۲")
    .replaceAll("3", "۳")
    .replaceAll("4", "۴")
    .replaceAll("5", "۵")
    .replaceAll("6", "۶")
    .replaceAll("7", "۷")
    .replaceAll("8", "۸")
    .replaceAll("9", "۹")
}

export function convertToPersianDigitsIfPersian(input: string): string {
  if (useI18nStore.getState().currentLang !== "fa") return input
  return convertToPersianDigits(input)
}
