import { useFieldContext } from "../shared"
import { fieldWithLabelContainer, inputField } from "../skins"
import { FieldInfo } from "./FieldInfo"

interface SimpleDateProps {
  label: string
  dir?: "auto" | "ltr" | "rtl"
}
export function SimpleDate({ label, dir = "auto" }: SimpleDateProps) {
  const field = useFieldContext<Date>()

  return (
    <div className={fieldWithLabelContainer()}>
      <label htmlFor={field.name}>{label}</label>

      <input
        id={field.name}
        name={field.name}
        type="date"
        dir={dir}
        className={inputField()}
        value={field.state.value.toISOString().split("T")[0] ?? ""}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.valueAsDate || new Date())}
      />

      <FieldInfo field={field} />
    </div>
  )
}
