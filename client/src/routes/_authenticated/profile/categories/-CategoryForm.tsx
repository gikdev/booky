import { useAppForm } from "#/forms"
import { contentContainer } from "#/shared/skins"
import { FloppyDiskBackIcon } from "@phosphor-icons/react"
import { btn } from "#/forms/skins"
import {
  CategoryFormSchema,
  type CategoryFormValues,
  defaultValues as defaultDefaultValues,
} from "./-shared"
import { useMutation } from "@tanstack/react-query"
import {
  categoriesControllerCreateNewCategoryMutation,
  categoriesControllerUpdateCategoryByIdMutation,
} from "#/api-client"
import toast from "react-hot-toast"
import { colors, parseError } from "#/shared/api"

const onSuccess = () => toast.success("با موفقیت انجام شد!")
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
  const { mutate: createCategory } = useCreateCategoryMutation()
  const { mutate: updateCategory } = useUpdateCategoryMutation()

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: CategoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      const body = {
        ...value,
        ownerId: 1,
      }

      if (mode === "create")
        createCategory({ body }, { onSuccess: () => form.reset() })
      if (mode === "edit" && typeof categoryId === "number") {
        updateCategory(
          {
            path: { id: categoryId },
            body,
          },
          { onSuccess: () => form.reset() },
        )
      }
    },
  })

  return (
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
          title={mode === "create" ? "ایجاد" : "ویرایش"}
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
