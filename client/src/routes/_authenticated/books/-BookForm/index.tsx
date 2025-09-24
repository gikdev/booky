import { FloppyDiskBackIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  booksControllerCreateNewBookMutation,
  booksControllerUpdateBookByIdMutation,
} from "#/api-client"
import { useAppForm } from "#/forms"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { colors, parseError } from "#/shared/api"
import { useAuthStore } from "#/shared/auth"
import { getLanguageByCode } from "#/shared/helpers"
import { contentContainer } from "#/shared/skins"
import {
  BookFormSchema,
  type BookFormValues,
  defaultValues as defaultDefaultValues,
} from "../-shared"
import { CategoryPickerField } from "./CategoryPickerField"

const onSuccess = () => toast.success(t.c.sentence(t.doneSuccessfully))
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

      if (mode === "create")
        createBook(
          {
            body: {
              author: value.author,
              title: value.title,
              categoryIds:
                value.categoryIds.length === 0 ? undefined : value.categoryIds,
              color: value.color,
              description: value.description || undefined,
              language: value.language,
              pages: value.pages || undefined,
            },
          },
          { onSuccess: () => form.reset() },
        )
      if (mode === "edit" && typeof bookId === "number") {
        updateBook(
          {
            path: { id: bookId },
            body: {
              author: value.author,
              title: value.title,
              categoryIds:
                value.categoryIds.length === 0 ? undefined : value.categoryIds,
              color: value.color,
              description: value.description || undefined,
              language: value.language,
              pages: value.pages || undefined,
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

      <form.AppField name="author">
        {field => (
          <field.SimpleText
            label={t.c.sentence(t.fieldLabel.required(t.author))}
          />
        )}
      </form.AppField>

      <form.AppField name="language">
        {field => (
          <field.SimpleSelect
            dir={t.configDir}
            label={t.c.sentence(t.fieldLabel.required(t.language))}
            items={languageOptions}
          />
        )}
      </form.AppField>

      <form.AppField name="pages">
        {field => (
          <field.SimpleNumber
            label={t.c.sentence(t.fieldLabel.required(t.numberOfPages))}
          />
        )}
      </form.AppField>

      <form.AppField name="color">
        {field => (
          <field.Colors
            colors={colors}
            label={t.c.sentence(t.fieldLabel.required(t.color))}
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
            label={t.c.sentence(t.fieldLabel.optional(t.description))}
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
