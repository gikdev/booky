import { UserPlusIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { z } from "zod/v4"
import { authControllerSignUpMutation } from "#/api-client"
import { useAppForm } from "#/forms"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { parseError } from "#/shared/api"
import { useAuthStore } from "#/shared/auth"

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
})

const SignupFormSchema = z
  .object({
    firstName: z.string().min(1, t.fieldIsRequired.sentence()),
    lastName: z.string(),
    email: z.email(t.shouldBeValidEmail.sentence()),
    password: z
      .string()
      .min(8, t.thingShouldBeAtLeastNCharacters(t.password(), 8).sentence()),
    passwordRepeat: z.string().min(1, t.fieldIsRequired.sentence()),
    location: z.string(),
    birthdate: z.date().nullable(),
    bio: z.string(),
  })
  .refine(val => val.password === val.passwordRepeat, {
    error: t.passwordsDoNotMatch.sentence(),
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
  birthdate: null,
}

function RouteComponent() {
  const router = useRouter()

  const { mutate: signUp } = useMutation({
    ...authControllerSignUpMutation(),
    onSuccess(data) {
      useAuthStore.setState({
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
        userId: data.user.id,
      })
      toast.success(t.doneSuccessfully.sentence())
      router.history.push("/books")
    },
    onError(err) {
      toast.error(parseError(err))
    },
  })

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: SignupFormSchema,
    },
    onSubmit: async ({ value }) => {
      signUp({
        body: {
          email: value.email,
          firstName: value.firstName,
          password: value.password,
          lastName: value.lastName || undefined,
          profile: {
            bio: value.bio || undefined,
            birthdate: value.birthdate
              ? value.birthdate.toISOString()
              : undefined,
            location: value.location || undefined,
          },
        },
      })
    },
  })

  return (
    <div className="flex flex-col flex-1 w-full px-4 gap-6">
      <form.AppField name="firstName">
        {field => (
          <field.SimpleText
            label={t.fieldLabel.required(t.firstName()).sentence()}
          />
        )}
      </form.AppField>

      <form.AppField name="lastName">
        {field => (
          <field.SimpleText
            label={t.fieldLabel.optional(t.lastName()).sentence()}
          />
        )}
      </form.AppField>

      <form.AppField name="email">
        {field => (
          <field.SimpleText
            label={t.fieldLabel.required(t.email()).sentence()}
            type="email"
          />
        )}
      </form.AppField>

      <form.AppField name="password">
        {field => (
          <field.SimpleText
            label={t.fieldLabel.required(t.password()).sentence()}
            type="password"
          />
        )}
      </form.AppField>

      <form.AppField name="passwordRepeat">
        {field => (
          <field.SimpleText
            label={t.fieldLabel.required(t.passwordRepeat()).sentence()}
            type="password"
          />
        )}
      </form.AppField>

      <form.AppField name="location">
        {field => (
          <field.SimpleText
            label={t.fieldLabel.optional(t.residencePlace()).sentence()}
          />
        )}
      </form.AppField>

      <form.AppField name="birthdate">
        {field => (
          <field.SimpleDate
            required={false}
            label={t.fieldLabel.optional(t.birthdate()).sentence()}
          />
        )}
      </form.AppField>

      <form.AppField name="bio">
        {field => (
          <field.SimpleText
            label={t.fieldLabel.optional(t.bio()).sentence()}
            isMultiline
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          title={t.register.capital()}
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
