import type { ReactNode } from "react"
import { cx } from "#/shared/cx.config"

interface SheetProps {
  children: ReactNode
  onClose: () => void
  className?: string
}

export function Sheet({ children, onClose, className }: SheetProps) {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col bg-black/30 z-[2]">
      <button
        type="button"
        className="cursor-pointer flex-1 flex"
        onClick={onClose}
      />

      <div className="bg-gray-10 max-h-[80dvh] flex flex-col">
        <div className="py-2 flex items-center justify-center">
          <hr className="w-48 h-1 rounded-sm bg-gray-30 border-none" />
        </div>

        <div className={cx("overflow-y-auto flex-1", className)}>
          {children}
        </div>
      </div>
    </div>
  )
}
