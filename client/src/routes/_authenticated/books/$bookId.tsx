import {
  CaretLeftIcon,
  CircleNotchIcon,
  FileIcon,
  HeartIcon,
  TranslateIcon,
} from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import {
  type BookResponseDto,
  booksControllerGetBookByIdOptions,
} from "#/api-client"
import { btn } from "#/forms/skins"
import { convertToPersianDigits, getLanguageByCode } from "#/shared/helpers"
import { contentContainer, page, tag } from "#/shared/skins"
import { NavBar } from "../-Navbar"

export const Route = createFileRoute("/_authenticated/books/$bookId")({
  component: RouteComponent,
})

function RouteComponent() {
  const { bookId } = Route.useParams()
  const { data: book, isSuccess } = useQuery(
    booksControllerGetBookByIdOptions({ path: { id: Number(bookId) } }),
  )

  return (
    <div className={page()}>
      <NavBar slotStart={<GoBackBtn />} title="مشخصات" slotEnd={<LikeBtn />} />

      {isSuccess ? (
        <div
          className={contentContainer({ className: "gap-4 p-4 items-center" })}
        >
          <BookAvatar color={book.color || "000000"} letter={book.title[0]} />

          <h1 className="text-2xl font-bold text-stone-900">{book.title}</h1>

          <p className="">{book.author}</p>

          <div className="w-full flex flex-wrap gap-2 justify-center">
            <PagesTag pages={book.pages} />
            <LanguageTag language={book.language} />
          </div>

          <p className="">{book.description}</p>
        </div>
      ) : (
        <div className={contentContainer()}>
          <CircleNotchIcon className="animate-spin my-5 mx-auto inline-block" />
        </div>
      )}
    </div>
  )
}

const GoBackBtn = () => (
  <Link to="/books" className={btn({ isIcon: true, size: "sm", mode: "text" })}>
    <CaretLeftIcon mirrored />
  </Link>
)

function LikeBtn() {
  const [isLiked, setLiked] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setLiked(p => !p)}
      className={btn({ isIcon: true, size: "sm", mode: "text" })}
    >
      <HeartIcon
        weight={isLiked ? "fill" : "regular"}
        className={isLiked ? "text-red-600" : ""}
      />
    </button>
  )
}

const BookAvatar = ({ letter, color }: { letter: string; color: string }) => (
  <div
    className="flex justify-center items-center rounded-lg h-20 w-20 font-bold text-4xl"
    style={{ color: `#${color}`, backgroundColor: `#${color}33` }}
  >
    {letter}
  </div>
)

const PagesTag = ({ pages }: { pages: BookResponseDto["pages"] }) => (
  <div className={tag({ hasIcon: true })}>
    <FileIcon />
    <span>{convertToPersianDigits((pages ?? 0).toString())} صفحه</span>
  </div>
)

const LanguageTag = ({
  language,
}: {
  language: BookResponseDto["language"]
}) => (
  <div className={tag({ hasIcon: true })}>
    <TranslateIcon />
    <span>{getLanguageByCode(language ?? "")}</span>
  </div>
)
