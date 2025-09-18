import { z } from "zod/v4"
import type { BookResponseDto } from "#/api-client"
import { t } from "#/i18n"

export const BookFormSchema = z.object({
  title: z.string().min(1, t.fieldIsRequired.sentence()),
  author: z.string().min(1, t.fieldIsRequired.sentence()),
  description: z.string(),
  color: z
    .string()
    .min(6, t.fieldIsRequired.sentence())
    .max(6, t.fieldIsRequired.sentence()),
  language: z
    .string()
    .min(2, t.fieldIsRequired.sentence())
    .max(2, t.fieldIsRequired.sentence()),
  pages: z.number(),
  categoryIds: z.number().array(),
})
export type BookFormValues = z.infer<typeof BookFormSchema>
export const defaultValues: BookFormValues = {
  title: "",
  color: "000000",
  description: "",
  author: "",
  language: "fa",
  pages: 0,
  categoryIds: [],
}

type SelectFn = (book: BookResponseDto) => BookFormValues
export const select: SelectFn = b => ({
  title: b.title,
  color: b.color || defaultValues.color,
  description: b.description || defaultValues.description,
  author: b.author,
  categoryIds: b.categories.map(c => c.id),
  language: b.language || defaultValues.language,
  pages: b.pages || defaultValues.pages,
})
