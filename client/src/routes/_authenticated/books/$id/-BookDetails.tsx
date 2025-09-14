import type { BookResponseDto } from "#/api-client"
import { convertToPersianDigits, getLanguageByCode } from "#/shared/helpers"
import { contentContainer, tag } from "#/shared/skins"
import {
  CircleNotchIcon,
  FileIcon,
  TagIcon,
  TranslateIcon,
} from "@phosphor-icons/react"

interface BookDetailsProps {
  book: BookResponseDto
}

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <div className={contentContainer({ className: "gap-4 p-4 items-center" })}>
      <BookAvatar color={book.color || "000000"} letter={book.title[0]} />

      <h1 dir="auto" className="text-2xl font-bold text-gray-90 text-center">
        {book.title}
      </h1>

      <p className="text-center" dir="auto">
        {book.author}
      </p>

      <div className="w-full flex flex-wrap gap-2 justify-center">
        <PagesTag pages={book.pages} />
        <LanguageTag language={book.language} />

        {book.categories.map(c => (
          <div className={tag({ hasIcon: true })} key={c.id}>
            <TagIcon style={{ color: `#${c.color}` }} weight="fill" />
            <span>{c.title}</span>
          </div>
        ))}
      </div>

      <p className="text-center" dir="auto">
        {book.description}
      </p>
    </div>
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

export const BookDetailsLoading = () => (
  <div className={contentContainer()}>
    <CircleNotchIcon className="animate-spin my-5 mx-auto inline-block" />
  </div>
)
