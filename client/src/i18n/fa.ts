import { cased, defineLang } from "./defineLang"

export const fa = defineLang({
  appIntroDescription: cased(
    "با بوکی، دیگه خیالت از بابت کتاب‌هایی که داری راحت میشه! آماده هستی که شروع کنیم؟",
  ),
  appTagline: cased("کتاب‌هات رو خیلی راحت مدیریت کن!"),
  authWelcomeDescription: cased(
    "همین الان ثبت‌نام کن، یا وارد بشو تا شروع کنیم",
  ),
  authWelcomeTitle: cased("به بوکی خوش‌اومدی!"),
  bio: cased("بیوگرافی"),
  birthdate: cased("تاریخ تولد"),
  configDir: "rtl",
  correct: cased("صحیح"),
  validatingMsg: cased("در حال اعتبار سنجی"),
  configIconMirror: true,
  darkTheme: cased("تم تاریک"),
  email: cased("ایمیل"),
  fieldIsRequired: cased("این ورودی اجباری هست"),
  firstName: cased("نام"),
  language: cased("زبان"),
  lastName: cased("نام خانوادگی"),
  login: cased("ورود"),
  optional: cased("اختیاری"),
  password: cased("گذرواژه"),
  passwordRepeat: cased("تکرار رمز"),
  passwordsDoNotMatch: cased("رمز و تکرار اون یکی نیستن"),
  pleaseTryAgain: cased("لطفا دوباره امتحان کنید"),
  register: cased("ثبت‌نام"),
  residencePlace: cased("محل زندگی"),
  settings: cased("تنظیمات"),
  settingsPage: {
    languageChangeWarning: cased(
      "بعد از تغییر زبان، باید برنامه رو دوباره اجرا کنید!",
    ),
  },
  shouldBeValidEmail: cased("ایمیل باید صحیح باشد"),
  start: cased("شروع"),
  thingShouldBeAtLeastNCharacters: (thing, n) =>
    cased(`${thing} باید حداقل ${n} کاراکتر باشد!`),
  fieldLabel: {
    required: label => cased(`${label}:`),
    optional: label => cased(`${label} (${fa.optional()}):`),
  },
})
