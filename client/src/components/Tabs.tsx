import type { Icon } from "@phosphor-icons/react"
import { cx } from "#/shared/cx.config"

export interface TabItem {
  id: string
  Icon: Icon
  title: string
  onClick: () => void
  isActive: boolean
}

interface TabsProps {
  items: TabItem[]
}

export function Tabs({ items }: TabsProps) {
  return (
    <div className="flex w-full h-16 min-h-16 max-h-16 border-b border-stone-300">
      {items.map(item => (
        <Tab
          key={item.id}
          Icon={item.Icon}
          title={item.title}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
    </div>
  )
}

interface TabProps {
  Icon: Icon
  title: string
  onClick: () => void
  isActive: boolean
}

function Tab({ Icon, onClick, title, isActive }: TabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        `
          flex flex-col gap-2 justify-end
          items-center flex-1 text-xs
          cursor-pointer hover:bg-stone-200
        `,
        isActive ? "text-blue-600" : "text-stone-600",
      )}
    >
      <Icon size={24} weight={isActive ? "fill" : "regular"} />
      <span>{title}</span>
      <span
        className={cx(
          "h-[3px] w-6 rounded-t-full bg-current",
          isActive ? "" : "invisible",
        )}
      />
    </button>
  )
}
