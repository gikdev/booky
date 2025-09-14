import { CaretLeftIcon, PlusCircleIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  type BookResponseDto,
  booksControllerGetAllBooksOptions,
} from "#/api-client"
import { contentContainer, page } from "#/shared/skins"
import { AppBottomTabs } from "../-AppBottomTabs"
import { NavBar } from "../-Navbar"
import { btn } from "#/forms/skins"

export const Route = createFileRoute("/_authenticated/books/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: books = [], isSuccess } = useQuery(
    booksControllerGetAllBooksOptions(),
  )

  return (
    <div className={page()}>
      <NavBar title="کتب" slotEnd={<NewBookBtn />} />

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

function BookItem({ title, color, bookId }: BookItemProps) {
  color = color || "000000"

  return (
    <Link
      to="/books/$id"
      params={{ id: bookId.toString() }}
      className="
        py-2 px-4 gap-4 flex justify-center
        items-center min-h-14 bg-gray-10
        hover:bg-gray-20 hover:text-gray-90
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

const NewBookBtn = () => (
  <Link
    to="/books/new"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <PlusCircleIcon />
  </Link>
)
