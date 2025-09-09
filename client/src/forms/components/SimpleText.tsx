import { useFieldContext } from "../shared"
import { fieldWithLabelContainer, inputField } from "../skins"
import { FieldInfo } from "./FieldInfo"

interface SimpleTextProps {
  label: string
  dir?: "auto" | "ltr" | "rtl"
  type?: "email" | "text" | "password"
  isMultiline?: boolean
}
export function SimpleText({
  label,
  dir = "auto",
  type = "text",
  isMultiline = false,
}: SimpleTextProps) {
  const field = useFieldContext<string>()

  return (
    <div className={fieldWithLabelContainer()}>
      <label htmlFor={field.name}>{label}</label>

      <input
        id={field.name}
        name={field.name}
        type={type}
        dir={dir}
        className={inputField({ isMultiline })}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
      />

      <FieldInfo field={field} />
    </div>
  )
}
