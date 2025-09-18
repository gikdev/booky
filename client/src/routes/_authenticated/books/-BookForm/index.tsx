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
import { getLanguageByCode } from "#/shared/helpers"
import { useAuthStore } from "#/shared/auth"
import { t } from "#/i18n"

const onSuccess = () => toast.success(t.doneSuccessfully.sentence())
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

const languageOptions = [
  { id: "fa", value: "fa", title: getLanguageByCode("fa") },
  { id: "en", value: "en", title: getLanguageByCode("en") },
  { id: "ar", value: "ar", title: getLanguageByCode("ar") },
  { id: "jp", value: "jp", title: getLanguageByCode("jp") },
  { id: "fr", value: "fr", title: getLanguageByCode("fr") },
]

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
  const userId = useAuthStore(s => s.userId)
  const { mutate: createBook } = useCreateBookMutation()
  const { mutate: updateBook } = useUpdateBookMutation()

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: BookFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (typeof userId !== "number") return

      const body = {
        ...value,
        ownerId: userId,
      }

      if (mode === "create")
        createBook({ body }, { onSuccess: () => form.reset() })
      if (mode === "edit" && typeof bookId === "number") {
        updateBook(
          {
            path: { id: bookId },
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
        {field => (
          <field.SimpleText
            label={t.fieldLabel.required(t.name()).sentence()}
          />
        )}
      </form.AppField>

      <form.AppField name="author">
        {field => (
          <field.SimpleText
            label={t.fieldLabel.required(t.author()).sentence()}
          />
        )}
      </form.AppField>

      <form.AppField name="language">
        {field => (
          <field.SimpleSelect
            dir={t.configDir}
            label={t.fieldLabel.required(t.language()).sentence()}
            items={languageOptions}
          />
        )}
      </form.AppField>

      <form.AppField name="pages">
        {field => (
          <field.SimpleNumber
            label={t.fieldLabel.required(t.numberOfPages()).sentence()}
          />
        )}
      </form.AppField>

      <form.AppField name="color">
        {field => (
          <field.Colors
            colors={colors}
            label={t.fieldLabel.required(t.color()).sentence()}
          />
        )}
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
        {field => (
          <field.SimpleText
            isMultiline
            label={t.fieldLabel.optional(t.description()).sentence()}
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.Btn
          title={
            mode === "create" ? t.btns.create.capital() : t.btns.edit.capital()
          }
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
