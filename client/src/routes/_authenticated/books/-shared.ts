import type { BookResponseDto } from "#/api-client"
import z from "zod/v4"

export const BookFormSchema = z.object({
  title: z.string().min(1, "این ورودی اجباری هست"),
  author: z.string().min(1, "این ورودی اجباری هست"),
  description: z.string(),
  color: z
    .string()
    .min(6, "این ورودی اجباری هست")
    .max(6, "این ورودی اجباری هست"),
  language: z
    .string()
    .min(2, "این ورودی اجباری هست")
    .max(2, "این ورودی اجباری هست"),
  pages: z.number(),
  categoryIds: z.number().array(),
})
export type BookFormValues = z.infer<typeof BookFormSchema>
export const defaultValues: BookFormValues = {
  title: "",
  color: "000000",
  description: "",
  author: "",
  language: "",
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
