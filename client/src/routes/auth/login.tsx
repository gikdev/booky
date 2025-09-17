import { SignInIcon } from "@phosphor-icons/react"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { z } from "zod/v4"
import { useAppForm } from "#/forms"
import { btn } from "#/forms/skins"
import { useAuthStore } from "#/shared/auth"
import { useMutation } from "@tanstack/react-query"
import { authControllerLogInMutation } from "#/api-client"
import { sha512 } from "js-sha512"
import toast from "react-hot-toast"
import { parseError } from "#/shared/api"
import { useMemo } from "react"
import { t } from "#/i18n"

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
})

const LoginFormSchema = z.object({
  email: z.email(t.shouldBeValidEmail.sentence()),
  password: z.string().min(1, t.fieldIsRequired.sentence()),
})

function RouteComponent() {
  const router = useRouter()

  const { mutate: logIn } = useMutation(authControllerLogInMutation())

  type LoginFormValues = z.infer<typeof LoginFormSchema>

  const defaultValues: LoginFormValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    [],
  )

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: LoginFormSchema,
    },
    onSubmit: ({ value }) => {
      logIn(
        {
          body: {
            email: value.email,
            password: sha512(value.password),
          },
        },
        {
          onError: err => toast.error(parseError(err.message)),
          onSuccess: data => {
            const userId = data.id
            useAuthStore.setState({ userId })
            router.history.push("/books")
          },
        },
      )
    },
  })

  return (
    <div className="flex flex-col flex-1 w-full px-4  gap-6">
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

      <form.AppForm>
        <form.Btn
          title={t.login.capital()}
          iconEnd={<SignInIcon weight="fill" mirrored={t.configIconMirror} />}
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
