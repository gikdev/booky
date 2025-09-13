import { useFieldContext } from "../shared"
import { fieldWithLabelContainer, inputField } from "../skins"
import { FieldInfo } from "./FieldInfo"

interface SimpleNumberProps {
  label: string
  dir?: "auto" | "ltr" | "rtl"
}
export function SimpleNumber({ label, dir = "auto" }: SimpleNumberProps) {
  const field = useFieldContext<number>()

  return (
    <div className={fieldWithLabelContainer()}>
      <label htmlFor={field.name}>{label}</label>

      <input
        id={field.name}
        name={field.name}
        type="number"
        dir={dir}
        className={inputField()}
        value={field.state.value ?? 0}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.valueAsNumber)}
      />

      <FieldInfo field={field} />
    </div>
  )
}
