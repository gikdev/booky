import {
  BooksIcon,
  CaretRightIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import {
  type BookResponseDto,
  booksControllerGetAllBooksOptions,
} from "#/api-client"
import {
  LoadingPaginationControls,
  PaginationControls,
} from "#/components/PaginationControls"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { PaginationHelper } from "#/shared/api/PaginationHelper"
import { contentContainer, page as pageSkin } from "#/shared/skins"
import { AppBottomTabs } from "../-AppBottomTabs"
import { NavBar } from "../-Navbar"

export const Route = createFileRoute("/_authenticated/books/")({
  component: RouteComponent,
})

const limit = 10

function useBooks(page: number, prefetchNextPage = false) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!prefetchNextPage) return
    queryClient.prefetchQuery(
      booksControllerGetAllBooksOptions({ query: { limit, page: page + 1 } }),
    )
  }, [queryClient, page, prefetchNextPage])

  return useQuery({
    ...booksControllerGetAllBooksOptions({ query: { limit, page } }),
    placeholderData: previousData => previousData,
  })
}

function RouteComponent() {
  const [page, setPage] = useState(1)
  const { data, isSuccess, isPending, isPlaceholderData } = useBooks(page)

  const mainSectionStyle = contentContainer({
    className: isPlaceholderData && "opacity-50",
  })

  const booksListSectionStyle = contentContainer({
    className: isPlaceholderData && "animate-pulse",
  })

  return (
    <div className={pageSkin()}>
      <NavBar title={t.books.capital()} slotEnd={<NewBookBtn />} />

      <div className={mainSectionStyle}>
        {isSuccess &&
          (data.meta.totalItems === 0 ? (
            <NoBooksSection />
          ) : (
            <BooksList books={data.data} className={booksListSectionStyle} />
          ))}

        {/* TODO: Make a PowerfulPaginationControls which uses PaginationHelper */}

        {isSuccess && (
          <PaginationControls
            currentPage={page}
            disabled={isPlaceholderData}
            isFirstPage={new PaginationHelper(data.meta).isFirstPage}
            onFirstBtnClick={() => setPage(1)}
            hasPreviousPage={new PaginationHelper(data.meta).hasPreviousPage}
            onPreviousBtnClick={() => setPage(p => p - 1)}
            hasNextPage={new PaginationHelper(data.meta).hasNextPage}
            onNextBtnClick={() => setPage(p => p + 1)}
            isLastPage={new PaginationHelper(data.meta).isLastPage}
            onLastBtnClick={() => setPage(data.meta.totalPages)}
          />
        )}

        {isPending && <LoadingPaginationControls />}
      </div>

      <AppBottomTabs />
    </div>
  )
}

interface BooksListProps {
  className: string
  books: BookResponseDto[]
}

const BooksList = ({ books, className }: BooksListProps) => (
  <div className={className}>
    {books.map(b => (
      <BookItem key={b.id} bookId={b.id} title={b.title} color={b.color} />
    ))}
  </div>
)

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

      <CaretRightIcon size={24} mirrored={t.configIconMirror} />
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

const NoBooksSection = () => (
  <div
    className={contentContainer({ className: "items-center justify-center" })}
  >
    <div className="flex flex-col items-center p-4 gap-4 text-center">
      <BooksIcon size={160} weight="duotone" className="text-brand-50" />
      <p className="font-bold text-gray-90 text-2xl">
        {t.noBooksSectionTitle.capital()}
      </p>
      <p>{t.noBooksSectionDescription}</p>
    </div>
  </div>
)
