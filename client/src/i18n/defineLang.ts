function capitalCase(str: string) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

function sentenceCase(str: string) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const casings = {
  capital: capitalCase,
  sentence: sentenceCase,
}

interface FinalLanguageObject extends LanguageConfig {
  c: typeof casings
}

export function defineLang(langConfig: LanguageConfig): FinalLanguageObject {
  return { ...langConfig, c: casings }
}

interface LanguageConfig {
  aboutApp: string
  aboutDeveloper: string
  appIntroDescription: string
  appTagline: string
  areYouSure: string
  author: string
  authWelcomeDescription: string
  authWelcomeTitle: string
  bio: string
  birthdate: string
  bookManagementApp: string
  books: string
  categories: string
  category: string
  choose: string
  color: string
  configDir: "ltr" | "rtl"
  configIconMirror: boolean
  configListItemSeparator: string
  correct: string
  darkTheme: string
  deleteBook: string
  description: string
  details: string
  developerIntro: string
  developerName: string
  doneSuccessfully: string
  editBook: string
  email: string
  fieldIsRequired: string
  firstName: string
  goalOfApp: string
  language: string
  lastName: string
  loading: string
  login: string
  manageCategories: string
  name: string
  newBook: string
  newCategory: string
  nPages: (n: number) => string
  numberOfPages: string
  optional: string
  password: string
  passwordRepeat: string
  passwordsDoNotMatch: string
  pleaseTryAgain: string
  profile: string
  reading: string
  register: string
  residencePlace: string
  settings: string
  shouldBeValidEmail: string
  start: string
  thisActionIsIrreversible: string
  title: string
  usedTechnologies: string
  validatingMsg: string
  version: string
  visitDeveloperWebsite: string
  generalErrorMsg: string
  unAuthorizedErrorMsg: string
  noBooksSectionTitle: string
  noBooksSectionDescription: string
  noCategoriesSectionTitle: string
  noCategoriesSectionDescription: string
  btns: {
    cancel: string
    create: string
    edit: string
    close: string
    delete: string
    ok: string
  }
  languagesName: {
    fa: string
    en: string
    ar: string
    jp: string
    fr: string
  }
  settingsPage: {
    languageChangeWarning: string
  }
  thingShouldBeAtLeastNCharacters: (thing: string, n: number | string) => string
  fieldLabel: {
    required: (label: string) => string
    optional: (label: string) => string
  }
}
