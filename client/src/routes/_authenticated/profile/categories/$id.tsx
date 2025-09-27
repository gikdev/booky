import { CaretLeftIcon, TrashIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { categoriesControllerGetCategoryByIdOptions } from "#/api-client"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"
import { CategoryForm } from "./-CategoryForm"
import { select } from "./-shared"
import { useState } from "react"
import { DeleteCategoryDialog } from "./-DeleteBookDialog"

export const Route = createFileRoute("/_authenticated/profile/categories/$id")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const categoryId = Number(id)

  const { data: category } = useCurrentCategory(categoryId)

  return (
    <div className={page()}>
      <NavBar
        title={`${t.c.sentence(t.category)}: ${category?.title || "..."}`}
        slotStart={<GoBackBtn />}
        slotEnd={<DeleteCategoryBtn />}
      />

      <CategoryForm
        mode="edit"
        categoryId={categoryId}
        defaultValues={category}
      />
    </div>
  )
}

function useCurrentCategory(categoryId: number) {
  return useQuery({
    ...categoriesControllerGetCategoryByIdOptions({ path: { id: categoryId } }),
    select,
  })
}

const GoBackBtn = () => (
  <Link
    to="/profile/categories"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <CaretLeftIcon mirrored={t.configIconMirror} />
  </Link>
)

function DeleteCategoryBtn() {
  const { id } = Route.useParams()
  const [isOpen, setOpen] = useState(false)
  const categoryId = Number(id)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={btn({ isIcon: true, size: "sm", mode: "text" })}
      >
        <TrashIcon />
      </button>

      {isOpen && (
        <DeleteCategoryDialog
          categoryId={categoryId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
