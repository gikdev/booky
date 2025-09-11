import { CaretLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { contentContainer, page } from "#/shared/skins"
import { AppBottomTabs } from "../-AppBottomTabs"
import { NavBar } from "../-Navbar"
import { useQuery } from "@tanstack/react-query"
import {
  booksControllerGetAllBooksOptions,
  type BookResponseDto,
} from "#/api-client"

export const Route = createFileRoute("/_authenticated/(books)/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: books = [], isSuccess } = useQuery(
    booksControllerGetAllBooksOptions(),
  )

  return (
    <div className={page()}>
      <NavBar title="کتب" />

      <div className={contentContainer()}>
        {isSuccess &&
          books.map(b => (
            <BookItem
              key={b.id}
              bookId={b.id}
              title={b.title}
              color={b.color}
            />
          ))}
      </div>

      <AppBottomTabs />
    </div>
  )
}

interface BookItemProps {
  bookId: number
  title: string
  color: BookResponseDto["color"]
}

function BookItem({ title, color }: BookItemProps) {
  color = color || "000000"

  return (
    <Link
      to="/"
      className="
        py-2 px-4 gap-4 flex justify-center
        items-center min-h-14 bg-stone-100
        hover:bg-stone-200 hover:text-stone-900
      "
    >
      <div
        className="flex justify-center items-center rounded-lg h-10 w-10 font-bold"
        style={{ color: `#${color}`, backgroundColor: `#${color}33` }}
      >
        {title[0]}
      </div>

      <p dir="auto" className="flex-1">
        {title}
      </p>

      <CaretLeftIcon size={24} />
    </Link>
  )
}
