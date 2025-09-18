import { CheckSquareIcon, SquareIcon } from "@phosphor-icons/react"
import { cx } from "#/shared/cx.config"

interface CheckboxProps {
  checked: boolean
  onChange?: (checked: boolean) => void
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  const isInteractive = typeof onChange !== "undefined"

  const className = cx(
    "p-4",
    checked ? "text-brand-60" : "text-gray-60",
    isInteractive ? "cursor-pointer" : "",
  )

  const icon = checked ? (
    <CheckSquareIcon weight="fill" size={24} />
  ) : (
    <SquareIcon size={24} />
  )

  if (isInteractive)
    return (
      <button
        type="button"
        className={className}
        onClick={() => onChange(!checked)}
      >
        {icon}
      </button>
    )

  return <div className={className}>{icon}</div>
}
