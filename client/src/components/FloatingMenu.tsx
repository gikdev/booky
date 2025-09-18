import type { ReactNode } from "react"
import { cva } from "#/shared/cx.config"

interface FloatingMenuProps {
  x: number
  y: number
  width?: number
  onClose: () => void
  children: ReactNode
}

export function FloatingMenu({
  onClose,
  children,
  width = 240,
  x,
  y,
}: FloatingMenuProps) {
  return (
    <div className="fixed inset-0 h-full w-full bg-black/20 z-[2]">
      <button
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        type="button"
      />

      <div
        className="flex flex-col bg-gray-10 border-2 border-gray-30 rounded-lg absolute z-[3]"
        style={{ top: y, left: x, width }}
      >
        {children}
      </div>
    </div>
  )
}

export const floatingMenuItem = cva({
  base: "hover:bg-gray-20 cursor-pointer flex items-center p-4 gap-2 [&_svg]:text-[1.5em]",
})
