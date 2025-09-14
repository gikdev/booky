import { cva } from "#/shared/cx.config"
import type { ReactNode } from "react"

interface SwitchProps {
  disabled?: boolean
  selected?: boolean
  onClick?: () => void
}

export function Switch({
  onClick,
  disabled = false,
  selected = false,
}: SwitchProps) {
  const isInteractive = typeof onClick !== "undefined"

  const switchCore = (
    <Track disabled={disabled} selected={selected}>
      <Handle selected={selected} />
    </Track>
  )

  if (isInteractive)
    return (
      <Target selected={selected} disabled={disabled} onClick={onClick}>
        {switchCore}
      </Target>
    )

  return switchCore
}

// -----

interface TargetProps {
  children: ReactNode
  onClick: () => void
  selected: boolean
  disabled: boolean
}

function Target({ children, onClick, disabled, selected }: TargetProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={selected}
      aria-disabled={disabled}
      className={target({ disabled })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const target = cva({
  base: "min-h-14 flex items-center",
  variants: {
    disabled: {
      false: "cursor-events-none",
      true: "cursor-pointer",
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

// -----

interface TrackProps {
  disabled: boolean
  children: ReactNode
  selected: boolean
}

function Track({ children, disabled, selected }: TrackProps) {
  return <div className={track({ disabled, selected })}>{children}</div>
}

const track = cva({
  base: "flex items-center h-8 w-14 rounded-full border-2",
  variants: {
    selected: {
      false: "bg-gray-20 border-gray-50 justify-start p-1.5",
      true: "bg-brand-60 border-brand-60 justify-end p-1",
    },
    disabled: {
      false: null,
      true: "opacity-50",
    },
  },
  defaultVariants: {
    disabled: false,
    selected: false,
  },
})

// -----

interface HandleProps {
  selected: boolean
}

function Handle({ selected }: HandleProps) {
  return <div className={handle({ selected })} />
}

const handle = cva({
  base: "rounded-full",
  variants: {
    selected: {
      false: "bg-gray-50 size-4",
      true: "bg-gray-10 size-6",
    },
  },
  defaultVariants: {
    selected: false,
  },
})
