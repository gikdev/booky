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

const ProfileDetails = () => (
  <div className="flex flex-col gap-4 p-4 items-center">
    <div
      className="
        w-20 h-20 text-blue-600 bg-blue-600/20 font-bold
        text-4xl flex items-center justify-center rounded-full
      "
    >
      م
    </div>

    <p className="font-bold text-stone-900">محمدمهدی بهرامی</p>

    <p dir="auto" className="text-xs">
      @bahrami_geek
    </p>
  </div>
)

const Divider = () => (
  <div className="px-4 w-full mx-auto">
    <hr className="border-none h-0.5 w-full bg-stone-300" />
  </div>
)
