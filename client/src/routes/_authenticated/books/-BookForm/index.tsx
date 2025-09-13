import {
  booksControllerCreateNewBookMutation,
  booksControllerUpdateBookByIdMutation,
} from "#/api-client"
import { useAppForm } from "#/forms"
import { colors, parseError } from "#/shared/api"
import { contentContainer } from "#/shared/skins"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  BookFormSchema,
  type BookFormValues,
  defaultValues as defaultDefaultValues,
} from "../-shared"
import { FloppyDiskBackIcon } from "@phosphor-icons/react"
import { btn } from "#/forms/skins"
import { CategoryPickerField } from "./CategoryPickerField"

const onSuccess = () => toast.success("با موفقیت انجام شد!")
const onError = (err: unknown) => toast.error(parseError(err))

const useCreateBookMutation = () =>
  useMutation({
    ...booksControllerCreateNewBookMutation(),
    onSuccess,
    onError,
  })

const useUpdateBookMutation = () =>
  useMutation({
    ...booksControllerUpdateBookByIdMutation(),
    onSuccess,
    onError,
  })

interface BookFormProps {
  mode: "create" | "edit"
  defaultValues?: BookFormValues
  bookId?: number
}

export function BookForm({
  mode,
  bookId,
  defaultValues = defaultDefaultValues,
}: BookFormProps) {
  const { mutate: createBook } = useCreateBookMutation()
  const { mutate: updateBook } = useUpdateBookMutation()

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: BookFormSchema,
    },
    onSubmit: async ({ value }) => {
      const body = {
        ...value,
        ownerId: 1,
      }

      if (mode === "create") createBook({ body })
      if (mode === "edit" && typeof bookId === "number") {
        updateBook({
          path: { id: bookId },
          body,
        })
      }
    },
  })

  return (
    <div className={contentContainer({ className: "p-4 gap-6" })}>
      <form.AppField name="title">
        {field => <field.SimpleText label="نام:" />}
      </form.AppField>

      <form.AppField name="author">
        {field => <field.SimpleText label="نویسنده:" />}
      </form.AppField>

      <form.AppField name="language">
        {field => <field.SimpleText label="زبان:" />}
      </form.AppField>

      <form.AppField name="pages">
        {field => <field.SimpleNumber label="تعداد صفحات:" />}
      </form.AppField>

      <form.AppField name="color">
        {field => <field.Colors colors={colors} label="رنگ:" />}
      </form.AppField>

      <form.Field name="categoryIds">
        {field => (
          <CategoryPickerField
            selectedIds={field.state.value}
            onIdsChange={ids => field.handleChange(ids)}
          />
        )}
      </form.Field>

      <form.AppField name="description">
        {field => <field.SimpleText isMultiline label="توضیحات (اختیاری):" />}
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
