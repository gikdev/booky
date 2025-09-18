import { page } from "#/shared/skins"
import { createFileRoute, Link } from "@tanstack/react-router"
import { NavBar } from "../-Navbar"
import { CaretLeftIcon } from "@phosphor-icons/react"
import { btn } from "#/forms/skins"
import { BookForm } from "./-BookForm"
import { t } from "#/i18n"

export const Route = createFileRoute("/_authenticated/books/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <NavBar slotStart={<GoBackBtn />} title={t.newBook.capital()} />

      <BookForm mode="create" />
    </div>
  )
}

const GoBackBtn = () => (
  <Link to="/books" className={btn({ isIcon: true, size: "sm", mode: "text" })}>
    <CaretLeftIcon mirrored={t.configIconMirror} />
  </Link>
)
