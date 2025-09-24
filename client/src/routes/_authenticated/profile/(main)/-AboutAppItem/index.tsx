import { CaretRightIcon, InfoIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { Sheet } from "#/components/Sheet"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { iconItem } from "#/shared/skins"
import { TechsGrid } from "./TechsGrid"

export function AboutAppItem() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <ItemBtn onClick={() => setOpen(true)} />
      {isOpen && <AboutAppSheet onClose={() => setOpen(false)} />}
    </>
  )
}

const ItemBtn = ({ onClick }: { onClick: () => void }) => (
  <button type="button" className={iconItem()} onClick={onClick}>
    <InfoIcon />
    <span>{t.c.capital(t.aboutApp)}</span>
    <CaretRightIcon mirrored={t.configIconMirror} />
  </button>
)

const AboutAppSheet = ({ onClose }: { onClose: () => void }) => (
  <Sheet onClose={onClose} className="flex flex-col gap-4 p-4 items-center">
    <p>{t.c.capital(t.aboutApp)}</p>

    <div className="flex flex-col gap-2 items-center text-center">
      <img src="/images/logo-full.png" alt="" className="max-w-max" />
      <p>{t.c.capital(t.bookManagementApp)}</p>
      <p className="text-xs">{t.c.sentence(t.goalOfApp)}</p>
      <p className="text-xs">{t.c.sentence(t.version)}: v1</p>
    </div>

    <div className="flex flex-col gap-2 items-center w-full">
      <p>{t.c.sentence(t.usedTechnologies)}:</p>

      <TechsGrid />
    </div>

    <button
      type="button"
      onClick={onClose}
      className={btn({ className: "w-full" })}
    >
      {t.c.capital(t.btns.close)}
    </button>
  </Sheet>
)
