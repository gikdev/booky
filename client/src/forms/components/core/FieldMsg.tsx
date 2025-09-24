import type { VariantProps } from "cva"
import type { ReactNode } from "react"
import { cva } from "#/shared/cx.config"

interface FieldMsgProps {
  children: ReactNode
  intent?: VariantProps<typeof fieldMsg>["intent"]
  secondaryText?: string
}

export function FieldMsg({ children, intent, secondaryText }: FieldMsgProps) {
  return (
    <p className={fieldMsg({ intent })}>
      <span className="flex-1">{children}</span>
      {secondaryText && <span>{secondaryText}</span>}
    </p>
  )
}

const fieldMsg = cva({
  base: `
    text-xs flex gap-4 px-4 py-1 leading-none
  `,
  variants: {
    intent: {
      neutral: "text-gray-60",
      success: "text-success-60",
      danger: "text-danger-60",
      warning: "text-warning-60",
      info: "text-info-60",
      brand: "text-brand-60",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
})
