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
import { PaginationControls } from "#/components/PaginationControls"
import { t } from "#/i18n"
import { PaginationHelper } from "#/shared/api/PaginationHelper"
import { contentContainer, page as pageSkin } from "#/shared/skins"
import { AppBottomTabs } from "../-AppBottomTabs"
import { NavBar } from "../-Navbar"
import { btn } from "#/forms/skins"
import { ErrorCard } from "#/components/ErrorCard"
import { NoXYZSection } from "#/components/sections/NoXYZSection"

export const Route = createFileRoute("/_authenticated/books/")({
  component: RouteComponent,
})

const per_page = 15

function useBooks(page: number, prefetchNextPage = false) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!prefetchNextPage) return
    queryClient.prefetchQuery(
      booksControllerGetAllBooksOptions({
        query: { per_page, page: page + 1 },
      }),
    )
  }, [queryClient, page, prefetchNextPage])

  return useQuery({
    ...booksControllerGetAllBooksOptions({ query: { per_page, page } }),
    placeholderData: previousData => previousData,
  })
}

function RouteComponent() {
  const [page, setPage] = useState(1)
  const {
    data,
    isSuccess,
    isPending,
    isPlaceholderData,
    isError,
    error,
    refetch,
  } = useBooks(page)

  const booksListSectionStyle = contentContainer({
    className: [isPlaceholderData && "animate-pulse"],
  })

  return (
    <div className={pageSkin()}>
      <NavBar title={t.c.capital(t.books)} />

      <div
        className={contentContainer({
          className: [
            "relative",
            isPlaceholderData && "opacity-50",
            isError && "bg-danger-10",
          ],
        })}
      >
        {isPending && (
          <div className={booksListSectionStyle}>
            <LoadingBookItem />
            <LoadingBookItem />
            <LoadingBookItem />
            <LoadingBookItem />
            <LoadingBookItem />
          </div>
        )}

        {isSuccess && data.meta.totalItems !== 0 && (
          <div className={booksListSectionStyle}>
            {data.data.map(b => (
              <BookItem
                key={b.id}
                bookId={b.id}
                title={b.title}
                color={b.color}
              />
            ))}
          </div>
        )}

        {isSuccess && data.meta.totalItems === 0 && (
          <NoXYZSection
            Icon={BooksIcon}
            title={t.c.capital(t.noBooksSectionTitle)}
            description={t.noBooksSectionDescription}
          />
        )}

        {isError && (
          <div
            className={contentContainer({
              className: "items-center justify-center",
            })}
          >
            <ErrorCard error={error} handleRetry={() => refetch()} />
          </div>
        )}

        <NewCategoryBtn />
      </div>

      {isSuccess && data.meta.totalItems !== 0 && (
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

      <AppBottomTabs />
    </div>
  )
}

const NewCategoryBtn = () => (
  <Link
    to="/books/new"
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

const LoadingBookItem = () => (
  <div
    className="
      py-2 px-4 gap-4 flex justify-center
      items-center min-h-14 bg-gray-10
      animate-pulse text-gray-60
    "
  >
    <div
      className="
        flex justify-center items-center
        rounded-lg h-10 w-10 font-bold bg-gray-30
      "
    />

    <div className="me-auto rounded-sm bg-gray-30 h-4 w-24" />

    <CaretRightIcon size={24} mirrored={t.configIconMirror} />
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
