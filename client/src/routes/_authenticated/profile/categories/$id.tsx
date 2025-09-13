import { page } from "#/shared/skins"
import { createFileRoute, Link } from "@tanstack/react-router"
import { NavBar } from "../../-Navbar"
import { btn } from "#/forms/skins"
import { CaretLeftIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { categoriesControllerGetCategoryByIdOptions } from "#/api-client"
import { select } from "./-shared"
import { CategoryForm } from "./-CategoryForm"

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
        title={`دسته‌بندی: ${category?.title || "..."}`}
        slotStart={<GoBackBtn />}
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
    <CaretLeftIcon mirrored />
  </Link>
)
