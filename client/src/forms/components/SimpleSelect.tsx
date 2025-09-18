import { t } from "#/i18n"
import { useFieldContext } from "../shared"
import { fieldWithLabelContainer, inputField } from "../skins"
import { FieldInfo } from "./FieldInfo"

export interface SelectItem {
  id: string
  value: string
  title: string
}

interface SimpleSelectProps {
  label: string
  items: SelectItem[]
  dir?: "auto" | "ltr" | "rtl"
}
export function SimpleSelect({
  label,
  items,
  dir = "auto",
}: SimpleSelectProps) {
  const field = useFieldContext<string>()

  return (
    <div className={fieldWithLabelContainer()}>
      <label htmlFor={field.name}>{label}</label>

      <select
        id={field.name}
        name={field.name}
        dir={dir}
        className={inputField()}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
      >
        <option disabled>{t.choose.capital()}</option>

        {items.map(i => (
          <option key={i.id} value={i.value}>
            {i.title}
          </option>
        ))}
      </select>

      <FieldInfo field={field} />
    </div>
  )
}
