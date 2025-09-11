export function getLanguageByCode(langCode: string) {
  if (langCode === "fa") return "فارسی"
  if (langCode === "en") return "انگلیسی"
  if (langCode === "ar") return "عربی"
  if (langCode === "jp") return "ژاپنی"
  if (langCode === "fr") return "فرانسوی"
  return langCode
}

export function convertToPersianDigits(input: string): string {
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
