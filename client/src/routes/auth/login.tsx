import { SignInIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { z } from "zod/v4"
import { authControllerSignInMutation } from "#/api-client"
import { useAppForm } from "#/forms"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { parseError } from "#/shared/api"
import { useAuthStore } from "#/shared/auth"

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
})

const LoginFormSchema = z.object({
  email: z.email(t.shouldBeValidEmail.sentence()),
  password: z.string().min(1, t.fieldIsRequired.sentence()),
})
type LoginFormValues = z.infer<typeof LoginFormSchema>

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
}

function RouteComponent() {
  const router = useRouter()

  const { mutate: signIn } = useMutation({
    ...authControllerSignInMutation(),
    onError: err => toast.error(parseError(err.message)),
    onSuccess: data => {
      console.log(data)
      useAuthStore.setState({})
      router.history.push("/books")
    },
  })

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: LoginFormSchema,
    },
    onSubmit: ({ value }) => {
      signIn({
        body: {
          email: value.email,
          password: value.password,
        },
      })
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
