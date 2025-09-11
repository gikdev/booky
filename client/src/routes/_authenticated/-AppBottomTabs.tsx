import { BookOpenIcon, BooksIcon, UserCircleIcon } from "@phosphor-icons/react"
import { useLocation } from "@tanstack/react-router"
import { useMemo } from "react"
import { type BottomTabItem, BottomTabs } from "#/components/BottomTabs"
import type { FileRouteTypes } from "#/routeTree.gen"

export function AppBottomTabs() {
  const { pathname } = useLocation()

  const items: BottomTabItem[] = useMemo(
    () => [
      {
        id: "books",
        Icon: BooksIcon,
        title: "کتب",
        url: "/books" satisfies FileRouteTypes["to"],
        isSelected: pathname === "/books",
      },
      {
        id: "reading",
        Icon: BookOpenIcon,
        title: "خوانش",
        url: "/books" satisfies FileRouteTypes["to"],
        isSelected: pathname === "/reading",
        disabled: true,
      },
      {
        id: "profile",
        Icon: UserCircleIcon,
        title: "پروفایل",
        url: "/profile" satisfies FileRouteTypes["to"],
        isSelected: pathname === "/profile",
      },
    ],
    [pathname],
  )

  return <BottomTabs items={items} />
}
