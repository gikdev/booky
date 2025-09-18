import {
  categoriesControllerGetAllCategoriesOptions,
  type CategoryResponseDto,
} from "#/api-client"
import { useQuery } from "@tanstack/react-query"
import { CircleNotchIcon, EyedropperIcon } from "@phosphor-icons/react"
import { btn, fieldWithLabelContainer } from "#/forms/skins"
import { useState } from "react"
import { Sheet } from "#/components/Sheet"
import { Checkbox } from "#/components/Checkbox"
import { t } from "#/i18n"

interface CategoryPickerFieldProps {
  selectedIds: number[]
  onIdsChange: (ids: number[]) => void
}

export function CategoryPickerField({
  selectedIds,
  onIdsChange,
}: CategoryPickerFieldProps) {
  const [isOpen, setOpen] = useState(false)
  const { data: categories, status } = useQuery(
    categoriesControllerGetAllCategoriesOptions(),
  )
  const categoryIds = categories?.map(c => c.id)

  return (
    <div className={fieldWithLabelContainer()}>
      <p>{t.fieldLabel.optional(t.categories()).sentence()}</p>

      <button
        type="button"
        className={btn({ mode: "outline" })}
        onClick={() => setOpen(true)}
        disabled={status !== "success"}
      >
        {status === "pending" ? (
          <>
            <CircleNotchIcon className="animate-spin" />
            <span>{t.loading.sentence()}...</span>
          </>
        ) : (
          <>
            <EyedropperIcon />
            <span>{t.choose.capital()}</span>
          </>
        )}
      </button>

      {isOpen && status === "success" && categoryIds && (
        <CategoryPickerSheet
          selectedIds={selectedIds}
          onIdsChange={onIdsChange}
          categoryIds={categoryIds}
          onClose={() => setOpen(false)}
          categories={categories}
        />
      )}

      <p className="text-xs">
        {categories
          ?.filter(c => selectedIds.includes(c.id))
          .map(c => c.title)
          .join(`${t.configListItemSeparator} `)}
      </p>
    </div>
  )
}

interface CategoryPickerSheetProps {
  selectedIds: number[]
  onIdsChange: (ids: number[]) => void
  categoryIds: number[]
  onClose: () => void
  categories: CategoryResponseDto[]
}

function CategoryPickerSheet({
  selectedIds: ids,
  onIdsChange,
  onClose,
  categories,
  categoryIds,
}: CategoryPickerSheetProps) {
  return (
    <Sheet onClose={onClose} className="flex flex-col gap-4 py-4">
      <div className="flex flex-col px-4">
        {categoryIds.map(id => (
          <CategoryItem
            key={id}
            checked={ids.includes(id)}
            category={categories.find(c => c.id === id)}
            onClick={() => {
              const isChecked = ids.includes(id)
              const newIds = isChecked
                ? ids.filter(i => i !== id)
                : [...ids, id]
              onIdsChange(newIds)
            }}
          />
        ))}
      </div>

      <div className="flex flex-col px-4">
        <button
          type="button"
          onClick={onClose}
          className={btn({
            intent: "brand",
            mode: "contained",
            className: "w-full",
          })}
        >
          {t.btns.ok()}
        </button>
      </div>
    </Sheet>
  )
}

interface CategoryItemProps {
  checked: boolean
  category?: CategoryResponseDto
  onClick: () => void
}

function CategoryItem({ category, checked, onClick }: CategoryItemProps) {
  if (!category) return null

  return (
    <button
      type="button"
      className="flex items-center hover:bg-gray-20 cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <Checkbox checked={checked} />
      <span>{category.title}</span>
    </button>
  )
}
