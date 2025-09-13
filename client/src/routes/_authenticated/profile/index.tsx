import {
  CaretRightIcon,
  GearIcon,
  TagIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { contentContainer, iconItem, page } from "#/shared/skins"
import { AppBottomTabs } from "../-AppBottomTabs"
import { NavBar } from "../-Navbar"
import { useCurrentUserQuery } from "#/shared/auth"

export const Route = createFileRoute("/_authenticated/profile/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <NavBar title="پروفایل" />

      <div className={contentContainer()}>
        <ProfileDetails />

        <Divider />

        <div className="flex flex-col flex-1">
          <Link to="/profile/categories" className={iconItem()}>
            <TagIcon />
            <span>مدیریت دسته‌بندی‌ها</span>
            <CaretRightIcon mirrored />
          </Link>

          <button type="button" className={iconItem()}>
            <UserCircleIcon />
            <span>پروفایل</span>
            <CaretRightIcon mirrored />
          </button>

          <button type="button" className={iconItem()}>
            <GearIcon />
            <span>تنظیمات</span>
            <CaretRightIcon mirrored />
          </button>
        </div>
      </div>

      <AppBottomTabs />
    </div>
  )
}

function ProfileDetails() {
  const { data: user } = useCurrentUserQuery()

  return (
    <div className="flex flex-col gap-4 p-4 items-center">
      {user ? (
        <div
          className="
            w-20 h-20 text-blue-600 bg-blue-600/20 font-bold
            text-4xl flex items-center justify-center rounded-full
          "
        >
          {user.firstName[0]}
        </div>
      ) : (
        <div className="w-20 h-20 bg-stone-300 rounded-full animate-pulse" />
      )}

      {user ? (
        <p className="font-bold text-stone-900">
          {calcFullname(user.firstName, user.lastName)}
        </p>
      ) : (
        <div className="h-6 w-24 bg-stone-300 animate-pulse" />
      )}
    </div>
  )
}

function calcFullname(firstName: string, lastName: string | null) {
  return `${firstName}${lastName ? " " : ""}${lastName}`
}

const Divider = () => (
  <div className="px-4 w-full mx-auto">
    <hr className="border-none h-0.5 w-full bg-stone-300" />
  </div>
)
