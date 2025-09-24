import { CaretRightIcon, GlobeIcon, InfoIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { Sheet } from "#/components/Sheet"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { iconItem } from "#/shared/skins"

export function AboutDeveloperItem() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <ItemBtn onClick={() => setOpen(true)} />
      {isOpen && <AboutDeveloperSheet onClose={() => setOpen(false)} />}
    </>
  )
}

const ItemBtn = ({ onClick }: { onClick: () => void }) => (
  <button type="button" className={iconItem()} onClick={onClick}>
    <InfoIcon />
    <span>{t.c.capital(t.aboutDeveloper)}</span>
    <CaretRightIcon mirrored={t.configIconMirror} />
  </button>
)

const AboutDeveloperSheet = ({ onClose }: { onClose: () => void }) => (
  <Sheet
    onClose={onClose}
    className="flex flex-col gap-4 p-4 items-center text-center"
  >
    <p>{t.c.capital(t.aboutDeveloper)}</p>

    <p className="text-3xl font-bold text-gray-90">
      {t.c.capital(t.developerName)}
    </p>

    <p>{t.developerIntro}</p>

    <a
      target="_blank"
      rel="noreferrer"
      href="https://bahrami85.ir/"
      className={btn({
        intent: "brand",
        mode: "contained",
        className: "w-full justify-between",
      })}
    >
      <span>{t.c.capital(t.visitDeveloperWebsite)}</span>
      <GlobeIcon weight="fill" />
    </a>

    <button
      type="button"
      onClick={onClose}
      className={btn({ className: "w-full" })}
    >
      {t.c.capital(t.btns.close)}
    </button>
  </Sheet>
)
