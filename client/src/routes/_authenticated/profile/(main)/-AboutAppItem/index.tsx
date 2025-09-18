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
    <span>{t.aboutApp.capital()}</span>
    <CaretRightIcon mirrored={t.configIconMirror} />
  </button>
)

const AboutAppSheet = ({ onClose }: { onClose: () => void }) => (
  <Sheet onClose={onClose} className="flex flex-col gap-4 p-4 items-center">
    <p>{t.aboutApp.capital()}</p>

    <div className="flex flex-col gap-2 items-center text-center">
      <img src="/images/logo-full.png" alt="" className="max-w-max" />
      <p>{t.bookManagementApp.capital()}</p>
      <p className="text-xs">{t.goalOfApp.sentence()}</p>
      <p className="text-xs">{t.version.sentence()}: v1</p>
    </div>

    <div className="flex flex-col gap-2 items-center w-full">
      <p>{t.usedTechnologies.sentence()}:</p>

      <TechsGrid />
    </div>

    <button
      type="button"
      onClick={onClose}
      className={btn({ className: "w-full" })}
    >
      {t.btns.close.capital()}
    </button>
  </Sheet>
)
