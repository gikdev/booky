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
        url: "/" satisfies FileRouteTypes["to"],
        isSelected: pathname === "/",
      },
      {
        id: "reading",
        Icon: BookOpenIcon,
        title: "خوانش",
        url: "/" satisfies FileRouteTypes["to"],
        isSelected: false,
        disabled: true,
      },
      {
        id: "profile",
        Icon: UserCircleIcon,
        title: "پروفایل",
        url: "/" satisfies FileRouteTypes["to"],
        isSelected: pathname === "/profile",
      },
    ],
    [],
  )

  return <BottomTabs items={items} />
}
