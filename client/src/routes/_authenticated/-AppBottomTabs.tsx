import { BookOpenIcon, BooksIcon, UserCircleIcon } from "@phosphor-icons/react"
import { useLocation } from "@tanstack/react-router"
import { useMemo } from "react"
import { type BottomTabItem, BottomTabs } from "#/components/BottomTabs"
import { t } from "#/i18n"
import type { FileRouteTypes } from "#/routeTree.gen"

export function AppBottomTabs() {
  const { pathname } = useLocation()

  const items: BottomTabItem[] = useMemo(
    () => [
      {
        id: "books",
        Icon: BooksIcon,
        title: t.books.capital(),
        url: "/books" satisfies FileRouteTypes["to"],
        isSelected: pathname === "/books",
      },
      {
        id: "reading",
        Icon: BookOpenIcon,
        title: t.reading.capital(),
        url: "/books" satisfies FileRouteTypes["to"],
        isSelected: pathname === "/reading",
        disabled: true,
      },
      {
        id: "profile",
        Icon: UserCircleIcon,
        title: t.profile.capital(),
        url: "/profile" satisfies FileRouteTypes["to"],
        isSelected: pathname === "/profile",
      },
    ],
    [pathname],
  )

  return <BottomTabs items={items} />
}
