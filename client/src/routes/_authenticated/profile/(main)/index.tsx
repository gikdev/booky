import {
  CaretRightIcon,
  GearIcon,
  TagIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { contentContainer, iconItem, page } from "#/shared/skins"
import { AppBottomTabs } from "../../-AppBottomTabs"
import { NavBar } from "../../-Navbar"
import { ProfileDetails } from "./-ProfileDetails"
import { AboutAppItem } from "./-AboutAppItem"
import { AboutDeveloperItem } from "./-AboutDeveloperItem"
import { t } from "#/i18n"

export const Route = createFileRoute("/_authenticated/profile/(main)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <NavBar title={t.profile.capital()} />

      <div className={contentContainer()}>
        <ProfileDetails />

        <div className="flex flex-col flex-1">
          <ManageCategoriesItem />

          <button type="button" className={iconItem()}>
            <UserCircleIcon />
            <span>{t.profile.capital()}</span>
            <CaretRightIcon mirrored={t.configIconMirror} />
          </button>

          <SettingsItem />

          <AboutAppItem />

          <AboutDeveloperItem />
        </div>
      </div>

      <AppBottomTabs />
    </div>
  )
}

const ManageCategoriesItem = () => (
  <Link to="/profile/categories" className={iconItem()}>
    <TagIcon />
    <span>{t.manageCategories.capital()}</span>
    <CaretRightIcon mirrored={t.configIconMirror} />
  </Link>
)

const SettingsItem = () => (
  <Link to="/profile/settings" className={iconItem()}>
    <GearIcon />
    <span>{t.settings.capital()}</span>
    <CaretRightIcon mirrored={t.configIconMirror} />
  </Link>
)
