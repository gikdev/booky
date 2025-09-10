import { CaretLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { contentContainer, page } from "#/shared/skins"
import { AppBottomTabs } from "../-AppBottomTabs"
import { NavBar } from "../-Navbar"

export const Route = createFileRoute("/_authenticated/(books)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <NavBar title="کتب" />

      <div className={contentContainer()}>
        <BookItem bookId={0} title="برنامه‌ریزی به روش بولت‌ژورنال" />
        <BookItem bookId={0} title="The ONE Thing" />
        <BookItem bookId={0} title="The Concise Mastery" />
        <BookItem bookId={0} title="Essentialism" />
        <BookItem bookId={0} title="بی حد و مرز" />
        <BookItem bookId={0} title="Side Hustle" />
        <BookItem bookId={0} title="Indistractable" />
        <BookItem bookId={0} title="Mindset" />
      </div>

      <AppBottomTabs />
    </div>
  )
}

interface BookItemProps {
  bookId: number
  title: string
}

function BookItem({ title }: BookItemProps) {
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
        className="
        flex justify-center items-center
        rounded-lg text-blue-600
        bg-blue-600/20 h-10 w-10
        font-bold
      "
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
