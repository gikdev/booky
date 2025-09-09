import { CircleNotchIcon, type Icon } from "@phosphor-icons/react"
import type { ComponentProps, ReactNode } from "react"
import { useFormContext } from "../shared"

interface BtnProps {
  title?: string
  loadingTitle?: string
  isIconOnly?: boolean
  iconStart?: ReactNode
  IconStart?: Icon
  iconEnd?: ReactNode
  IconEnd?: Icon
  LoadingIcon?: Icon
  className?: string
  onClick?: () => void
  btnType?: ComponentProps<"button">["type"]
  testId?: string
  disabled?: boolean
}

export function Btn({
  title = "ثبت",
  isIconOnly = false,
  iconStart,
  IconStart,
  IconEnd,
  iconEnd,
  className,
  LoadingIcon = CircleNotchIcon,
  loadingTitle = "در حال بارگذاری...",
  btnType = "button",
  onClick,
  testId,
  disabled = false,
}: BtnProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={s => [s.canSubmit, s.isSubmitting]}>
      {([canSubmit, isSubmitting]) => {
        const defaultClickHandler = () => form.handleSubmit()
        const finalClickHandler = onClick ?? defaultClickHandler

        return (
          <button
            data-testid={testId}
            type={btnType}
            onClick={finalClickHandler}
            disabled={!canSubmit || isSubmitting || disabled}
            className={className}
          >
            {isSubmitting && <LoadingIcon />}
            {!isSubmitting && (IconStart ? <IconStart /> : iconStart)}
            {!isIconOnly && <span>{isSubmitting ? loadingTitle : title}</span>}
            {!isSubmitting && (IconEnd ? <IconEnd /> : iconEnd)}
          </button>
        )
      }}
    </form.Subscribe>
  )
}
