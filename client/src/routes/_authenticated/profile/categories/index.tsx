import {
  CaretLeftIcon,
  CaretRightIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { categoriesControllerGetAllCategoriesOptions } from "#/api-client"
import { contentContainer, iconItem, page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"
import { btn } from "#/forms/skins"

export const Route = createFileRoute("/_authenticated/profile/categories/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: categories = [] } = useQuery(
    categoriesControllerGetAllCategoriesOptions(),
  )

  return (
    <div className={page({ className: "relative" })}>
      <NavBar title="دسته‌بندی‌ها" slotStart={<GoBackBtn />} />

      <div className={contentContainer()}>
        {categories.map(c => (
          <Link
            key={c.id}
            className={iconItem()}
            to="/profile/categories/$id"
            params={{ id: c.id.toString() }}
          >
            <div
              className="h-6 w-6 rounded-2xl"
              style={{ backgroundColor: `#${c.color}` }}
            />
            <span>{c.title}</span>
            <CaretRightIcon mirrored />
          </Link>
        ))}
      </div>

      <NewCategoryBtn />
    </div>
  )
}

const GoBackBtn = () => (
  <Link
    to="/profile"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <CaretLeftIcon mirrored />
  </Link>
)

const NewCategoryBtn = () => (
  <Link
    to="/profile/categories/new"
    className={btn({
      intent: "brand",
      mode: "contained",
      isIcon: true,
      className: "absolute bottom-4 left-4",
    })}
  >
    <PlusCircleIcon weight="fill" />
  </Link>
)
