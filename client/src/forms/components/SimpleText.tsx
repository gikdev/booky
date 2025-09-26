import type { Icon } from "@phosphor-icons/react"
import { useFieldContext } from "../shared"
import { FieldInfo } from "./core/FieldInfo"
import { InputField } from "./core/InputField"

interface SimpleTextProps {
  label: string
  type?: "email" | "text" | "password"
  dir?: "auto" | "ltr" | "rtl"
  isMultiline?: boolean
  LeadingIcon?: Icon
  TrailingIcon?: Icon
  readOnly?: boolean
  placeholder?: string
}
export function SimpleText({
  label,
  dir = "auto",
  type = "text",
  isMultiline = false,
  LeadingIcon,
  TrailingIcon,
  placeholder,
  readOnly,
}: SimpleTextProps) {
  const field = useFieldContext<string>()
  const { isValid, isDirty } = field.state.meta
  const hasError = !isValid && isDirty

  return (
    <div className="flex flex-col">
      <InputField
        label={label}
        dir={dir}
        isMultiline={isMultiline}
        onChange={v => field.handleChange(v)}
        value={field.state.value}
        inputType={type}
        hasError={hasError}
        LeadingIcon={LeadingIcon}
        onBlur={field.handleBlur}
        TrailingIcon={TrailingIcon}
        placeholder={placeholder}
        readOnly={readOnly}
      />

      <FieldInfo field={field} />
    </div>
  )
}
