import { CaretRightIcon } from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"
import { contentContainer, iconItem, page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"
import { useQuery } from "@tanstack/react-query"
import { categoriesControllerGetAllCategoriesOptions } from "#/api-client"

export const Route = createFileRoute("/_authenticated/profile/categories/")({
  component: RouteComponent,
})

function RouteComponent() {
  const {data:categories=[]} = useQuery(categoriesControllerGetAllCategoriesOptions())

  return (
    <div className={page()}>
      <NavBar title="دسته‌بندی‌ها" />

      <div className={contentContainer()}>
        {categories.map(c => (
          <button key={c.id} type="button" className={iconItem()}>
            <div className="h-6 w-6 bg-blue-500 rounded-full" />
            <span>{c.title}</span>
            <CaretRightIcon mirrored />
          </button>
        ))}
      </div>
    </div>
  )
}
