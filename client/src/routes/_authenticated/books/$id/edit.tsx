import { CaretLeftIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { booksControllerGetBookByIdOptions } from "#/api-client"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"
import { BookForm } from "../-BookForm"
import { select } from "../-shared"

export const Route = createFileRoute("/_authenticated/books/$id/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const bookId = Number(id)

  const { data: book } = useBookByIdQuery(bookId)

  return (
    <div className={page()}>
      <NavBar slotStart={<GoBackBtn />} title={t.editBook.capital()} />

      <BookForm mode="edit" bookId={bookId} defaultValues={book} />
    </div>
  )
}

function GoBackBtn() {
  const { id } = Route.useParams()

  return (
    <Link
      to="/books/$id"
      params={{ id }}
      className={btn({ isIcon: true, size: "sm", mode: "text" })}
    >
      <CaretLeftIcon mirrored={t.configIconMirror} />
    </Link>
  )
}

function useBookByIdQuery(categoryId: number) {
  return useQuery({
    ...booksControllerGetBookByIdOptions({ path: { id: categoryId } }),
    select,
  })
}
