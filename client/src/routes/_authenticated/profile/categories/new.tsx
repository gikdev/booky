import { contentContainer, page } from "#/shared/skins"
import { createFileRoute, Link } from "@tanstack/react-router"
import { NavBar } from "../../-Navbar"
import { btn } from "#/forms/skins"
import { CaretLeftIcon, FloppyDiskBackIcon } from "@phosphor-icons/react"
import { useAppForm } from "#/forms"
import { useMutation } from "@tanstack/react-query"
import { categoriesControllerCreateNewCategoryMutation } from "#/api-client"
import z from "zod/v4"

const colors = [
  "ef4444",
  "f97316",
  "f59e0b",
  "eab308",
  "84cc16",
  "22c55e",
  "10b981",
  "14b8a6",
  "06b6d4",
  "0ea5e9",
  "3b82f6",
  "6366f1",
  "8b5cf6",
  "a855f7",
  "d946ef",
  "ec4899",
  "f43f5e",
]

const CreateCategoryFormSchema = z.object({
  title: z.string().min(1, ""),
  color: z.string().min(6, "").max(6, ""),
  description: z.string(),
})

type CreateCategoryFormValues = z.infer<typeof CreateCategoryFormSchema>

const defaultValues: CreateCategoryFormValues = {
  title: "",
  color: "000000",
  description: "",
}

export const Route = createFileRoute("/_authenticated/profile/categories/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate } = useMutation({
    ...categoriesControllerCreateNewCategoryMutation(),
    onError: err => console.log(err),
    onSuccess: () => alert("با موفقیت انجام شد!"),
  })

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      mutate({
        body: {
          ...value,
          ownerId: 1,
        },
      })
    },
  })

  return (
    <div className={page()}>
      <NavBar title="دسته‌بندی جدید" slotStart={<GoBackBtn />} />

      <div className={contentContainer({ className: "p-4 gap-6" })}>
        <form.AppField name="title">
          {field => <field.SimpleText label="نام:" />}
        </form.AppField>

        <form.AppField name="color">
          {field => <field.Colors label="رنگ:" colors={colors} />}
        </form.AppField>

        <form.AppField name="description">
          {field => <field.SimpleText label="توضیحات (اختیاری):" isMultiline />}
        </form.AppField>

        <form.AppForm>
          <form.Btn
            title="ذخیره"
            iconStart={<FloppyDiskBackIcon weight="fill" />}
            className={btn({
              intent: "success",
              mode: "contained",
              className: "w-full mt-auto",
            })}
          />
        </form.AppForm>
      </div>
    </div>
  )
}

const GoBackBtn = () => (
  <Link
    to="/profile/categories"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <CaretLeftIcon mirrored />
  </Link>
)
