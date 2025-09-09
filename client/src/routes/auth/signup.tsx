import { UserPlusIcon } from "@phosphor-icons/react"
import { createFileRoute, useLocation, useRouter } from "@tanstack/react-router"
import { z } from "zod"
import { useAppForm } from "#/forms"
import { btn } from "#/forms/skins"

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
})

const SignupFormSchema = z
  .object({
    firstName: z.string().min(1, "این ورودی اجباری است"),
    lastName: z.string(),
    email: z.email("ایمیل باید صحیح باشه."),
    password: z.string().min(8, "رمز باید حداقل ۸ کاراکتر باشه"),
    passwordRepeat: z.string().min(1, "این ورودی اجباری است"),
    location: z.string(),
    // birthdate: z.date(),
    bio: z.string(),
  })
  .refine(val => val.password === val.passwordRepeat, {
    error: "رمز و تکرار اون یکی نیستن",
    path: ["passwordRepeat"],
  })

type SignupFormValues = z.infer<typeof SignupFormSchema>

const defaultValues: SignupFormValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  passwordRepeat: "",
  location: "",
  bio: "",
  // birthdate: new Date(),
}

function RouteComponent() {
  const router = useRouter()
  const { search } = useLocation()

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: SignupFormSchema,
    },
    onSubmit: async ({ value }) => {
      // pretending to submit...
      console.log(value)

      if ("redirect" in search && typeof search.redirect === "string") {
        router.history.push(search.redirect)
      } else {
        router.history.push("/")
      }
    },
  })

  return (
    <div className="flex flex-col flex-1 w-full px-4 gap-6 overflow-y-auto">
      <form.AppField name="firstName">
        {field => <field.SimpleText label="نام:" />}
      </form.AppField>

      <form.AppField name="lastName">
        {field => <field.SimpleText label="نام خانوادگی (اختیاری):" />}
      </form.AppField>

      <form.AppField name="email">
        {field => <field.SimpleText label="ایمیل:" type="email" />}
      </form.AppField>

      <form.AppField name="password">
        {field => <field.SimpleText label="رمز:" type="password" />}
      </form.AppField>

      <form.AppField name="passwordRepeat">
        {field => <field.SimpleText label="تکرار رمز:" type="password" />}
      </form.AppField>

      <form.AppField name="location">
        {field => <field.SimpleText label="مکان زندگی (اختیاری):" />}
      </form.AppField>

      {/* <form.AppField name="birthdate">
        {field => <field.SimpleText label="تاریخ تولد (اختیاری):" />}
      </form.AppField> */}

      <form.AppField name="bio">
        {field => <field.SimpleText label="بیوگرافی (اختیاری):" isMultiline />}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          title="ثبت‌نام"
          iconEnd={<UserPlusIcon weight="fill" />}
          className={btn({
            size: "md",
            intent: "brand",
            mode: "contained",
            className: "justify-between w-full mt-auto",
          })}
        />
      </form.AppForm>
    </div>
  )
}
