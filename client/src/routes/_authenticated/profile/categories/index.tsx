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
import { NoXYZSection } from "#/components/sections/NoXYZSection"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { contentContainer, iconItem, page } from "#/shared/skins"
import { NavBar } from "../../-Navbar"
import { ErrorCard } from "#/components/ErrorCard"

export const Route = createFileRoute("/_authenticated/profile/categories/")({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: categories,
    isSuccess,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery(categoriesControllerGetAllCategoriesOptions())

  return (
    <div className={page({ className: "relative" })}>
      <NavBar title={t.c.capital(t.categories)} slotStart={<GoBackBtn />} />

      {isPending && <LoadingCategoriesList />}

      {isError && (
        <div
          className={contentContainer({
            className: "items-center justify-center bg-danger-10",
          })}
        >
          <ErrorCard error={error} handleRetry={() => refetch()} />
        </div>
      )}

      {isSuccess && categories.length === 0 && <NoCategories />}

      {isSuccess && categories.length !== 0 && (
        <CategoriesListSection categories={categories} />
      )}

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
      <CategoryItem
        key={c.id}
        categoryId={c.id}
        color={c.color}
        title={c.title}
      />
    ))}
  </div>
)

interface CategoryItemProps {
  categoryId: CategoryResponseDto["id"]
  title: CategoryResponseDto["title"]
  color: CategoryResponseDto["color"]
}

function CategoryItem({ categoryId, color, title }: CategoryItemProps) {
  return (
    <Link
      className={iconItem()}
      to="/profile/categories/$id"
      params={{ id: categoryId.toString() }}
    >
      <div
        className="h-6 w-6 rounded-2xl"
        style={{ backgroundColor: `#${color}` }}
      />

      <span>{title}</span>

      <CaretRightIcon mirrored={t.configIconMirror} />
    </Link>
  )
}

const LoadingCategoriesList = () => (
  <div className={contentContainer()}>
    <LoadingCategoryItem />
    <LoadingCategoryItem />
    <LoadingCategoryItem />
    <LoadingCategoryItem />
    <LoadingCategoryItem />
  </div>
)

const LoadingCategoryItem = () => (
  <div className="flex items-center h-14 py-2 px-4 gap-4 animate-pulse [&_svg]:text-[1.5em]">
    <div className="h-6 w-6 rounded-2xl bg-gray-30" />

    <div className="me-auto bg-gray-30 h-4 w-24 rounded-sm" />

    <CaretRightIcon mirrored={t.configIconMirror} />
  </div>
)
