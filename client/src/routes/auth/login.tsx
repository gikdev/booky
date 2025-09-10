import { SignInIcon } from "@phosphor-icons/react"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { z } from "zod"
import { useAppForm } from "#/forms"
import { btn } from "#/forms/skins"
import { useAuthStore } from "#/shared/auth"

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

  const form = useAppForm({
    defaultValues,
    validators: {
      // onChange: LoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      // pretending to submit...
      console.log(value)

      useAuthStore.setState({ isAuthenticated: true })
      router.history.push("/")
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
