import { cased, defineLang } from "./defineLang.js"

export const en = defineLang({
  appIntroDescription: cased(
    "With Booky, you’ll never lose track of your books again! Ready to get started?",
  ),
  appTagline: cased("easily manage your books!"),
  authWelcomeDescription: cased("login or register right now to start."),
  authWelcomeTitle: cased("welcome to booky!"),
  bio: cased("bio"),
  birthdate: cased("birthdate"),
  configDir: "ltr",
  configIconMirror: false,
  correct: cased("correct"),
  validatingMsg: cased("validating"),
  darkTheme: cased("dark theme"),
  email: cased("email"),
  fieldIsRequired: cased("this field is required"),
  firstName: cased("first name"),
  language: cased("language"),
  lastName: cased("last name"),
  login: cased("login"),
  optional: cased("optional"),
  password: cased("password"),
  passwordRepeat: cased("password repeat"),
  passwordsDoNotMatch: cased("passwords do not match!"),
  settingsPage: {
    languageChangeWarning: cased(
      "After changing language, you must re run the app.",
    ),
  },
  pleaseTryAgain: cased("please try again"),
  register: cased("register"),
  residencePlace: cased("place of residence"),
  settings: cased("settings"),
  shouldBeValidEmail: cased("please enter a valid email"),
  start: cased("start"),
  thingShouldBeAtLeastNCharacters: (thing, n) =>
    cased(`${thing} must be at least ${n} character(s) long.`),
  fieldLabel: {
    required: label => cased(`${label}:`),
    optional: label => cased(`${label} (${en.optional()}):`),
  },
})
