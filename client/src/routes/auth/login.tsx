import { SignInIcon } from "@phosphor-icons/react"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { z } from "zod"
import { useAppForm } from "#/forms"
import { btn } from "#/forms/skins"
import { useAuthStore } from "#/shared/auth"
import { useMutation } from "@tanstack/react-query"
import { authControllerLogInMutation } from "#/api-client"
import { sha512 } from "js-sha512"
import toast from "react-hot-toast"
import { parseError } from "#/shared/api"

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
})

const LoginFormSchema = z.object({
  email: z.email("ایمیل باید صحیح باشه."),
  password: z.string().min(8, "رمز باید حداقل ۸ کاراکتر باشه"),
})

type LoginFormValues = z.infer<typeof LoginFormSchema>

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
}

function RouteComponent() {
  const router = useRouter()

  const { mutate: logIn } = useMutation(authControllerLogInMutation())

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
            console.log(userId)
            useAuthStore.setState({ userId })
            console.log(useAuthStore.getState())
            router.history.push("/books")
          },
        },
      )
    },
  })

  return (
    <div className="flex flex-col flex-1 w-full px-4  gap-6">
      <form.AppField name="email">
        {field => <field.SimpleText label="ایمیل:" type="email" />}
      </form.AppField>

      <form.AppField name="password">
        {field => <field.SimpleText label="رمز:" type="password" />}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          title="ورود"
          iconEnd={<SignInIcon weight="fill" mirrored />}
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
