import type { ReactNode } from "react"

interface NavBarProps {
  slotStart?: ReactNode
  title: string
  slotEnd?: ReactNode
}

export function NavBar({ slotEnd, slotStart, title }: NavBarProps) {
  return (
    <nav className="flex py-2 px-1 gap-1 items-center justify-center border-b border-gray-30">
      <div className="h-12 w-12">{slotStart}</div>
      <p className="flex-1 font-bold text-gray-90 text-center">{title}</p>
      <div className="h-12 w-12">{slotEnd}</div>
    </nav>
  )
}
