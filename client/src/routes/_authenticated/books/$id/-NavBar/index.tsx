import { CaretLeftIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { btn } from "#/forms/skins"
import { NavBar } from "#/routes/_authenticated/-Navbar"
import { MoreOptionsBtn } from "./MoreOptionsBtn"

export function BookDetailsNavBar() {
  return (
    <NavBar
      slotStart={<GoBackBtn />}
      title="مشخصات"
      slotEnd={<MoreOptionsBtn />}
    />
  )
}

const GoBackBtn = () => (
  <Link to="/books" className={btn({ isIcon: true, size: "sm", mode: "text" })}>
    <CaretLeftIcon mirrored />
  </Link>
)
