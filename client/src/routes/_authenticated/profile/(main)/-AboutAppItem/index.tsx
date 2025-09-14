import { Sheet } from "#/components/Sheet"
import { btn } from "#/forms/skins"
import { iconItem } from "#/shared/skins"
import { CaretRightIcon, InfoIcon } from "@phosphor-icons/react"
import { useState } from "react"
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
    <span>درباره برنامه</span>
    <CaretRightIcon mirrored />
  </button>
)

const AboutAppSheet = ({ onClose }: { onClose: () => void }) => (
  <Sheet onClose={onClose} className="flex flex-col gap-4 p-4 items-center">
    <p>درباره برنامه</p>

    <div className="flex flex-col gap-2 items-center text-center">
      <img src="/images/logo-full.png" alt="" className="max-w-max" />
      <p>برنامه مدیریت کتاب‌ها</p>
      <p className="text-xs">
        هدف این برنامه، کمک به شما در مدیریت کتاب‌ها و مطالعه به صورت بهینه‌تر،
        بهتر و بیشتر هست.
      </p>
      <p className="text-xs">نسخه برنامه: v1</p>
    </div>

    <div className="flex flex-col gap-2 items-center w-full">
      <p>تکنولوژی‌های به کار گرفته‌شده:</p>

      <TechsGrid />
    </div>

    <button
      type="button"
      onClick={onClose}
      className={btn({ className: "w-full" })}
    >
      بستن
    </button>
  </Sheet>
)
