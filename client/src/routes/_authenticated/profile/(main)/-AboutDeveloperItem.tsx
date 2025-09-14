import { Sheet } from "#/components/Sheet"
import { btn } from "#/forms/skins"
import { iconItem } from "#/shared/skins"
import { CaretRightIcon, GlobeIcon, InfoIcon } from "@phosphor-icons/react"
import { useState } from "react"

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
    <span>درباره سازنده</span>
    <CaretRightIcon mirrored />
  </button>
)

const AboutDeveloperSheet = ({ onClose }: { onClose: () => void }) => (
  <Sheet
    onClose={onClose}
    className="flex flex-col gap-4 p-4 items-center text-center"
  >
    <p>درباره سازنده</p>

    <p className="text-3xl font-bold text-gray-90">محمدمهدی بهرامی</p>

    <p>
      توسعه‌دهنده فرانت‌اند (React) با ۱ سال تجربه در ساخت اپلیکیشن‌های وب، با
      تمرکز بر کیفیت، کدنویسی تمیز و ارائه تجربه کاربری روان و خوب.
    </p>

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
      <span>مشاهده وب‌سایت سازنده</span>
      <GlobeIcon weight="fill" />
    </a>

    <button
      type="button"
      onClick={onClose}
      className={btn({ className: "w-full" })}
    >
      بستن
    </button>
  </Sheet>
)
