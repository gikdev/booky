import {
  DotsThreeVerticalIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { useState, type MouseEventHandler } from "react"
import { btn } from "#/forms/skins"
import { FloatingMenu, floatingMenuItem } from "#/components/FloatingMenu"
import { Link } from "@tanstack/react-router"
import { Route } from "../.."
import { DeleteBookDialog } from "./DeleteBookDialog"

type MenuState = false | { x: number; y: number }

export function MoreOptionsBtn() {
  const [menuState, setMenuState] = useState<MenuState>(false)

  const handleOpenMenuBtnClick: MouseEventHandler<HTMLButtonElement> = e => {
    const el = e.currentTarget as HTMLButtonElement
    const rect = el.getBoundingClientRect()

    setMenuState({
      x: rect.left,
      y: rect.bottom + 8,
    })
  }

  return (
    <>
      <OpenMenuBtn onClick={handleOpenMenuBtnClick} />

      {menuState && (
        <FloatingMenu
          x={menuState.x}
          y={menuState.y}
          onClose={() => setMenuState(false)}
        >
          <EditBookItem />
          <DeleteBookItem />
        </FloatingMenu>
      )}
    </>
  )
}

const OpenMenuBtn = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
}) => (
  <button
    type="button"
    onClick={onClick}
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <DotsThreeVerticalIcon />
  </button>
)

function EditBookItem() {
  const { id } = Route.useParams()

  return (
    <Link className={floatingMenuItem()} to="/books/$id/edit" params={{ id }}>
      <PencilSimpleIcon />
      <span>ویرایش کتاب</span>
    </Link>
  )
}

function DeleteBookItem() {
  const { id } = Route.useParams()
  const [isOpen, setOpen] = useState(false)
  const bookId = Number(id)

  return (
    <>
      <button
        type="button"
        className={floatingMenuItem()}
        onClick={() => setOpen(true)}
      >
        <TrashIcon />
        <span>حذف کتاب</span>
      </button>

      {isOpen && (
        <DeleteBookDialog bookId={bookId} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
