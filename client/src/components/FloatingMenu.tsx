import { cva } from "#/shared/cx.config"
import type { ReactNode } from "react"

interface FloatingMenuProps {
  x: number
  y: number
  onClose: () => void
  children: ReactNode
}

export function FloatingMenu({ onClose, children, x, y }: FloatingMenuProps) {
  return (
    <div className="fixed inset-0 h-full w-full bg-black/20 z-[2]">
      <button className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div
        className="flex flex-col bg-stone-100 border-2 border-stone-300 rounded-lg absolute z-[3]"
        style={{ top: y, left: x }}
      >
        {children}
      </div>
    </div>
  )
}

export const floatingMenuItem = cva({
  base: "hover:bg-stone-200 cursor-pointer flex items-center p-4 gap-2 [&_svg]:text-[1.5em]",
})
