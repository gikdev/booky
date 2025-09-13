import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { booksControllerGetBookByIdOptions } from "#/api-client"
import { page } from "#/shared/skins"
import { BookDetails, BookDetailsLoading } from "./-BookDetails"
import { BookDetailsNavBar } from "./-NavBar"

export const Route = createFileRoute("/_authenticated/books/$id/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const bookId = Number(id)
  const {
    data: book,
    isSuccess,
    isPending,
  } = useQuery(booksControllerGetBookByIdOptions({ path: { id: bookId } }))

  return (
    <div className={page()}>
      <BookDetailsNavBar />
      {isPending && <BookDetailsLoading />}
      {isSuccess && <BookDetails book={book} />}
    </div>
  )
}
