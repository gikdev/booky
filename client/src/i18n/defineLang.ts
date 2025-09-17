function capitalCase(str: string) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

function sentenceCase(str: string) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function cased(str: string) {
  const fn = () => str
  fn.capital = () => capitalCase(str)
  fn.sentence = () => sentenceCase(str)
  return fn
}

type CasedString = ReturnType<typeof cased>

export function defineLang(langConfig: LanguageConfig) {
  return langConfig
}

interface LanguageConfig {
  appIntroDescription: CasedString
  appTagline: CasedString
  authWelcomeDescription: CasedString
  authWelcomeTitle: CasedString
  bio: CasedString
  birthdate: CasedString
  configDir: "ltr" | "rtl"
  configIconMirror: boolean
  darkTheme: CasedString
  email: CasedString
  fieldIsRequired: CasedString
  firstName: CasedString
  residencePlace: CasedString
  language: CasedString
  lastName: CasedString
  login: CasedString
  optional: CasedString
  password: CasedString
  passwordRepeat: CasedString
  passwordsDoNotMatch: CasedString
  pleaseTryAgain: CasedString
  register: CasedString
  settings: CasedString
  shouldBeValidEmail: CasedString
  start: CasedString
  correct: CasedString
  validatingMsg: CasedString
  settingsPage: {
    languageChangeWarning: CasedString
  }
  thingShouldBeAtLeastNCharacters: (
    thing: string,
    n: number | string,
  ) => CasedString

  fieldLabel: {
    required: (label: string) => CasedString
    optional: (label: string) => CasedString
  }
}
