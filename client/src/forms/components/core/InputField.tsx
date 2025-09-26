import { type Icon, WarningCircleIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { cva } from "#/shared/cx.config"

interface InputFieldProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  label: string
  placeholder?: string
  readOnly?: boolean
  hasError?: boolean
  LeadingIcon?: Icon
  TrailingIcon?: Icon
  inputType?: "date" | "password" | "text" | "email" | "number"
  dir?: "auto" | "ltr" | "rtl"
  isMultiline?: boolean
}

export function InputField({
  onChange,
  value,
  hasError = false,
  inputType = "text",
  label,
  readOnly = false,
  placeholder = "",
  LeadingIcon,
  TrailingIcon,
  dir = "rtl",
  onBlur,
  isMultiline = false,
}: InputFieldProps) {
  const [isFocused, setFocused] = useState(false)

  return (
    <label className="relative flex items-end h-16 group transition-all w-full">
      <p
        className={labelStyle({
          isFocused,
          hasError,
          hasLeadingIcon: !!LeadingIcon,
          isPopulated: !!value,
        })}
      >
        {label}
      </p>

      <div
        className={inputContainer({
          isFocused,
          hasError,
          isPopulated: !!value,
        })}
      >
        {LeadingIcon && <LeadingIcon className="shrink-0 grow-0" size={24} />}

        {isMultiline ? (
          <textarea
            dir={dir}
            className={input({ isMultiline })}
            placeholder={isFocused ? placeholder : ""}
            value={value}
            readOnly={readOnly}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false)
              onBlur?.()
            }}
          />
        ) : (
          <input
            dir={dir}
            className={input()}
            placeholder={isFocused ? placeholder : ""}
            value={value}
            readOnly={readOnly}
            type={inputType}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false)
              onBlur?.()
            }}
          />
        )}

        {hasError && (
          <WarningCircleIcon
            weight="fill"
            size={24}
            className="shrink-0 grow-0 text-danger-60"
          />
        )}

        {!hasError && TrailingIcon && (
          <TrailingIcon className="shrink-0 grow-0" size={24} />
        )}
      </div>
    </label>
  )
}

const labelStyle = cva({
  base: `
    cursor-text
    absolute bg-gray-10 transition-all
    start-4 leading-none
    text-xs px-1 py-0.5 top-0
  `,
  variants: {
    isFocused: {
      false: "text-gray-60",
      true: "text-brand-60",
    },
    isPopulated: {
      false: null,
      true: null,
    },
    hasError: {
      false: null,
      true: "text-danger-60",
    },
    hasLeadingIcon: {
      false: null,
      true: null,
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isPopulated: false,
      className: `
        text-base leading-normal 
        px-0 py-1 top-5
      `,
    },
    {
      isFocused: false,
      isPopulated: false,
      hasLeadingIcon: false,
      className: "start-4",
    },
    {
      isFocused: false,
      isPopulated: false,
      hasLeadingIcon: true,
      className: "start-13",
    },
  ],
  defaultVariants: {
    isFocused: false,
    hasError: false,
    isPopulated: false,
    hasLeadingIcon: false,
  },
})

const inputContainer = cva({
  base: `
    h-14 w-full
    transition-all
    border-2
    flex items-center
    px-4
    py-2
    gap-3
    rounded-lg
  `,
  variants: {
    isFocused: {
      false: "border-gray-30",
      true: "border-brand-60",
    },
    isPopulated: {
      false: null,
      true: null,
    },
    hasError: {
      false: null,
      true: "border-danger-60",
    },
  },
  defaultVariants: {
    hasError: false,
    isFocused: false,
    isPopulated: false,
  },
})

const input = cva({
  base: `
    text-gray-90 transition-all placeholder:text-gray-60
    outline-none flex-1 shrink-1 min-w-4
  `,
  variants: {
    isMultiline: {
      false: null,
      true: "resize-y",
    },
  },
  defaultVariants: {
    isMultiline: false,
  },
})
