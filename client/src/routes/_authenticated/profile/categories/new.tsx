import { page } from "#/shared/skins"
import { createFileRoute, Link } from "@tanstack/react-router"
import { NavBar } from "../../-Navbar"
import { btn } from "#/forms/skins"
import { CaretLeftIcon } from "@phosphor-icons/react"
import { CategoryForm } from "./-CategoryForm"

export const Route = createFileRoute("/_authenticated/profile/categories/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <NavBar title="دسته‌بندی جدید" slotStart={<GoBackBtn />} />

      <CategoryForm mode="create" />
    </div>
  )
}

const GoBackBtn = () => (
  <Link
    to="/profile/categories"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <CaretLeftIcon mirrored />
  </Link>
)
