import {
  CaretLeftIcon,
  CaretRightIcon,
  PlusCircleIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  type CategoryResponseDto,
  categoriesControllerGetAllCategoriesOptions,
} from "#/api-client"
import { LoadingSection } from "#/components/sections/LoadingSection"
import { NoXYZSection } from "#/components/sections/NoXYZSection"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { contentContainer, iconItem, page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"

export const Route = createFileRoute("/_authenticated/profile/categories/")({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: categories,
    isSuccess,
    isPending,
  } = useQuery(categoriesControllerGetAllCategoriesOptions())

  return (
    <div className={page({ className: "relative" })}>
      <NavBar title={t.c.capital(t.categories)} slotStart={<GoBackBtn />} />

      {isPending && <LoadingSection />}

      {isSuccess &&
        (categories.length === 0 ? (
          <NoCategories />
        ) : (
          <CategoriesListSection categories={categories} />
        ))}

      <NewCategoryBtn />
    </div>
  )
}

const GoBackBtn = () => (
  <Link
    to="/profile"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <CaretLeftIcon mirrored={t.configIconMirror} />
  </Link>
)

const NewCategoryBtn = () => (
  <Link
    to="/profile/categories/new"
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

const NoCategories = () => (
  <NoXYZSection
    Icon={SquaresFourIcon}
    title={t.c.capital(t.noCategoriesSectionTitle)}
    description={t.noCategoriesSectionDescription}
  />
)

const CategoriesListSection = ({
  categories,
}: {
  categories: CategoryResponseDto[]
}) => (
  <div className={contentContainer()}>
    {categories.map(c => (
      <Link
        key={c.id}
        className={iconItem()}
        to="/profile/categories/$id"
        params={{ id: c.id.toString() }}
      >
        <div
          className="h-6 w-6 rounded-2xl"
          style={{ backgroundColor: `#${c.color}` }}
        />
        <span>{c.title}</span>
        <CaretRightIcon mirrored={t.configIconMirror} />
      </Link>
    ))}
  </div>
)
