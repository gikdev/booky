import {
  DotsThreeVerticalIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { type MouseEventHandler, useState } from "react"
import { FloatingMenu, floatingMenuItem } from "#/components/FloatingMenu"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { Route } from "../.."
import { DeleteBookDialog } from "./DeleteBookDialog"

type MenuState = false | { x: number; y: number }

const FLOATING_MENU_WIDTH = 240
const BTN_GAP = 4

function calcX(left: number) {
  const isRTL = t.configDir === "rtl"
  if (isRTL) return left + BTN_GAP
  return innerWidth - FLOATING_MENU_WIDTH - BTN_GAP
}

export function MoreOptionsBtn() {
  const [menuState, setMenuState] = useState<MenuState>(false)

  const handleOpenMenuBtnClick: MouseEventHandler<HTMLButtonElement> = e => {
    const el = e.currentTarget as HTMLButtonElement
    const rect = el.getBoundingClientRect()

    const x = calcX(rect.left)

    setMenuState({
      x,
      y: rect.bottom + 8,
    })
  }

  return (
    <>
      <OpenMenuBtn onClick={handleOpenMenuBtnClick} />

      {menuState && (
        <FloatingMenu
          width={FLOATING_MENU_WIDTH}
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
      <span>{t.editBook.sentence()}</span>
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
        <span>{t.deleteBook.sentence()}</span>
      </button>

      {isOpen && (
        <DeleteBookDialog bookId={bookId} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
