import { CaretLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"
import { CategoryForm } from "./-CategoryForm"

export const Route = createFileRoute("/_authenticated/profile/categories/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <NavBar title={t.newCategory.capital()} slotStart={<GoBackBtn />} />

      <CategoryForm mode="create" />
    </div>
  )
}

const GoBackBtn = () => (
  <Link
    to="/profile/categories"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <CaretLeftIcon mirrored={t.configIconMirror} />
  </Link>
)
