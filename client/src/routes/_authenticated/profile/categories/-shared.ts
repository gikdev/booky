import type { CategoryResponseDto } from "#/api-client"
import z from "zod/v4"

export const colors = [
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

const CategoryFormSchema = z.object({
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
