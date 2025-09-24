import { useFieldContext } from "../shared"
import { fieldWithLabelContainer, inputField } from "../skins"
import { FieldInfo } from "./core/FieldInfo"

interface SimpleDateProps {
  label: string
  dir?: "auto" | "ltr" | "rtl"
  required?: boolean
}

export function SimpleDate({
  label,
  dir = "auto",
  required = true,
}: SimpleDateProps) {
  const field = useFieldContext<Date | null>()

  return (
    <div className={fieldWithLabelContainer()}>
      <label htmlFor={field.name}>{label}</label>

      <input
        id={field.name}
        name={field.name}
        type="date"
        dir={dir}
        required={required}
        className={inputField()}
        value={
          field.state.value ? field.state.value.toISOString().split("T")[0] : ""
        }
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.valueAsDate ?? null)}
      />

      <FieldInfo field={field} />
    </div>
  )
}
