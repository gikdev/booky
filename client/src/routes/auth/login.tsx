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
import { useCreateSchema, useShouldMirror } from "#/i18n/helpers"
import { useMemo } from "react"
import { useI18nContext } from "#/i18n/i18n-react"

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
})

function RouteComponent() {
  const { LL } = useI18nContext()
  const shouldMirror = useShouldMirror()
  const router = useRouter()

  const { mutate: logIn } = useMutation(authControllerLogInMutation())

  const LoginFormSchema = useCreateSchema(LL =>
    z.object({
      email: z.email(LL.SHOULD_BE_VALID_EMAIL()),
      password: z.string().min(1, LL.FIELD_IS_REQUIRED()),
    }),
  )

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
        {field => <field.SimpleText label={LL.EMAIL()} type="email" />}
      </form.AppField>

      <form.AppField name="password">
        {field => <field.SimpleText label={LL.PASSWORD()} type="password" />}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          title={LL.LOGIN()}
          iconEnd={<SignInIcon weight="fill" mirrored={shouldMirror} />}
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
