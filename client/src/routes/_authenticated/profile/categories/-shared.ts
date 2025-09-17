import type { CategoryResponseDto } from "#/api-client"
import { z } from "zod/v4"

export const CategoryFormSchema = z.object({
  title: z.string().min(1, ""),
  color: z.string().min(6, "").max(6, ""),
  description: z.string(),
})
export type CategoryFormValues = z.infer<typeof CategoryFormSchema>
export const defaultValues: CategoryFormValues = {
  title: "",
  color: "000000",
  description: "",
}

type SelectFn = (category: CategoryResponseDto) => CategoryFormValues
export const select: SelectFn = c => ({
  title: c.title,
  color: c.color || defaultValues.color,
  description: c.description || defaultValues.description,
})
