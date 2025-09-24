import { FloppyDiskBackIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  categoriesControllerCreateNewCategoryMutation,
  categoriesControllerUpdateCategoryByIdMutation,
} from "#/api-client"
import { useAppForm } from "#/forms"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { colors, parseError } from "#/shared/api"
import { useAuthStore } from "#/shared/auth"
import { contentContainer } from "#/shared/skins"
import {
  CategoryFormSchema,
  type CategoryFormValues,
  defaultValues as defaultDefaultValues,
} from "./-shared"

const onSuccess = () => toast.success(t.c.sentence(t.doneSuccessfully))
const onError = (err: unknown) => toast.error(parseError(err))

const useCreateCategoryMutation = () =>
  useMutation({
    ...categoriesControllerCreateNewCategoryMutation(),
    onSuccess,
    onError,
  })

const useUpdateCategoryMutation = () =>
  useMutation({
    ...categoriesControllerUpdateCategoryByIdMutation(),
    onSuccess,
    onError,
  })

interface CategoryFormProps {
  mode: "create" | "edit"
  defaultValues?: CategoryFormValues
  categoryId?: number
}

export function CategoryForm({
  mode,
  defaultValues = defaultDefaultValues,
  categoryId,
}: CategoryFormProps) {
  const userId = useAuthStore(s => s.userId)
  const { mutate: createCategory } = useCreateCategoryMutation()
  const { mutate: updateCategory } = useUpdateCategoryMutation()

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: CategoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (typeof userId !== "number") return

      if (mode === "create")
        createCategory(
          {
            body: {
              title: value.title,
              color: value.color,
              description: value.description || undefined,
            },
          },
          { onSuccess: () => form.reset() },
        )
      if (mode === "edit" && typeof categoryId === "number") {
        updateCategory(
          {
            path: { id: categoryId },
            body: {
              title: value.title,
              color: value.color,
              description: value.description || undefined,
            },
          },
          { onSuccess: () => form.reset() },
        )
      }
    },
  })

  return (
    <div className={contentContainer({ className: "p-4 gap-6" })}>
      <form.AppField name="title">
        {field => (
          <field.SimpleText
            label={t.c.sentence(t.fieldLabel.required(t.name))}
          />
        )}
      </form.AppField>

      <form.AppField name="color">
        {field => (
          <field.Colors
            label={t.c.sentence(t.fieldLabel.required(t.color))}
            colors={colors}
          />
        )}
      </form.AppField>

      <form.AppField name="description">
        {field => (
          <field.SimpleText
            label={t.c.sentence(t.fieldLabel.optional(t.description))}
            isMultiline
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          title={t.c.capital(mode === "create" ? t.btns.create : t.btns.edit)}
          iconStart={<FloppyDiskBackIcon weight="fill" />}
          className={btn({
            intent: "brand",
            mode: "contained",
            className: "w-full mt-auto",
          })}
        />
      </form.AppForm>
    </div>
  )
}
