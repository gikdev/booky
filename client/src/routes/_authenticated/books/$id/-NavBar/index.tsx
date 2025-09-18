import { CaretLeftIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { NavBar } from "#/routes/_authenticated/-Navbar"
import { MoreOptionsBtn } from "./MoreOptionsBtn"

export function BookDetailsNavBar() {
  return (
    <NavBar
      slotStart={<GoBackBtn />}
      title={t.details.capital()}
      slotEnd={<MoreOptionsBtn />}
    />
  )
}

const GoBackBtn = () => (
  <Link to="/books" className={btn({ isIcon: true, size: "sm", mode: "text" })}>
    <CaretLeftIcon mirrored={t.configIconMirror} />
  </Link>
)
