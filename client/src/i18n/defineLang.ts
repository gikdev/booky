function capitalCase(str: string) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

function sentenceCase(str: string) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/** Creates a SuperString */
export function ss(str: string) {
  const fn = () => str
  fn.capital = () => capitalCase(str)
  fn.sentence = () => sentenceCase(str)
  return fn
}

type SuperString = ReturnType<typeof ss>

export function defineLang(langConfig: LanguageConfig) {
  return langConfig
}

interface LanguageConfig {
  aboutApp: SuperString
  aboutDeveloper: SuperString
  appIntroDescription: SuperString
  appTagline: SuperString
  areYouSure: SuperString
  author: SuperString
  authWelcomeDescription: SuperString
  authWelcomeTitle: SuperString
  bio: SuperString
  birthdate: SuperString
  bookManagementApp: SuperString
  books: SuperString
  categories: SuperString
  category: SuperString
  choose: SuperString
  color: SuperString
  configDir: "ltr" | "rtl"
  configIconMirror: boolean
  configListItemSeparator: string
  correct: SuperString
  darkTheme: SuperString
  deleteBook: SuperString
  description: SuperString
  details: SuperString
  developerIntro: SuperString
  developerName: SuperString
  doneSuccessfully: SuperString
  editBook: SuperString
  email: SuperString
  fieldIsRequired: SuperString
  firstName: SuperString
  goalOfApp: SuperString
  language: SuperString
  lastName: SuperString
  loading: SuperString
  login: SuperString
  manageCategories: SuperString
  name: SuperString
  newBook: SuperString
  newCategory: SuperString
  nPages: (n: number) => SuperString
  numberOfPages: SuperString
  optional: SuperString
  password: SuperString
  passwordRepeat: SuperString
  passwordsDoNotMatch: SuperString
  pleaseTryAgain: SuperString
  profile: SuperString
  reading: SuperString
  register: SuperString
  residencePlace: SuperString
  settings: SuperString
  shouldBeValidEmail: SuperString
  start: SuperString
  thisActionIsIrreversible: SuperString
  title: SuperString
  usedTechnologies: SuperString
  validatingMsg: SuperString
  version: SuperString
  visitDeveloperWebsite: SuperString
  generalErrorMsg: SuperString
  unAuthorizedErrorMsg: SuperString
  btns: {
    cancel: SuperString
    create: SuperString
    edit: SuperString
    close: SuperString
    delete: SuperString
    ok: SuperString
  }
  languagesName: {
    fa: SuperString
    en: SuperString
    ar: SuperString
    jp: SuperString
    fr: SuperString
  }
  settingsPage: {
    languageChangeWarning: SuperString
  }
  thingShouldBeAtLeastNCharacters: (
    thing: string,
    n: number | string,
  ) => SuperString
  fieldLabel: {
    required: (label: string) => SuperString
    optional: (label: string) => SuperString
  }
}
