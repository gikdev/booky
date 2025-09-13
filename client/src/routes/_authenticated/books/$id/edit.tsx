import { btn } from "#/forms/skins"
import { page } from "#/shared/skins"
import { CaretLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { BookForm } from "../-BookForm"
import { NavBar } from "../../-Navbar"
import { useQuery } from "@tanstack/react-query"
import { booksControllerGetBookByIdOptions } from "#/api-client"
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
      <NavBar slotStart={<GoBackBtn />} title="کتاب جدید" />

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
      <CaretLeftIcon mirrored />
    </Link>
  )
}

function useBookByIdQuery(categoryId: number) {
  return useQuery({
    ...booksControllerGetBookByIdOptions({ path: { id: categoryId } }),
    select,
  })
}
