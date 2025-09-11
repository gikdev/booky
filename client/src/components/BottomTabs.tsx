import type { Icon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { cx } from "#/shared/cx.config"

export interface BottomTabItem {
  id: string
  Icon: Icon
  title: string
  url: string
  isSelected: boolean
  disabled?: boolean
}

interface TabsProps {
  items: BottomTabItem[]
}

export function BottomTabs({ items }: TabsProps) {
  return (
    <div className="flex w-full h-16 min-h-16 max-h-16 border-t border-stone-300">
      {items.map(item => (
        <BottomTab key={item.id} {...item} />
      ))}
    </div>
  )
}

interface BottomTabProps extends Omit<BottomTabItem, "id"> {}

function BottomTab({ Icon, isSelected, title, url, disabled }: BottomTabProps) {
  const className = cx(
    `
      flex flex-col gap-1 justify-center
      items-center flex-1 text-xs py-1 px-2
      cursor-pointer disabled:cursor-not-allowed
      bg-stone-100 hover:bg-stone-200 disabled:hover:bg-stone-100
      disabled:opacity-50 
    `,
    isSelected && !disabled ? "text-blue-600 font-bold" : "text-stone-600",
  )

  const iconContainer = cx(
    "flex py-1 px-4 items-center justify-center rounded-lg",
    isSelected && !disabled ? "bg-blue-100" : "bg-transparent",
  )

  const children = (
    <>
      <div className={iconContainer}>
        <Icon size={24} weight={isSelected ? "fill" : "regular"} />
      </div>

      <span>{title}</span>
    </>
  )

  return disabled ? (
    <button type="button" disabled={disabled} className={className}>
      {children}
    </button>
  ) : (
    <Link to={url} className={className}>
      {children}
    </Link>
  )
}
