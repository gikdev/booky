import { cx } from "#/shared/cx.config"
import { useFieldContext } from "../shared"
import { fieldWithLabelContainer } from "../skins"
import { FieldInfo } from "./FieldInfo"

interface ColorsProps {
  label: string
  colors: string[]
}
export function Colors({ label, colors }: ColorsProps) {
  const field = useFieldContext<string>()

  return (
    <div className={fieldWithLabelContainer()}>
      <label htmlFor={field.name}>{label}</label>

      <div className="flex gap-2 items-center flex-wrap">
        {colors.map(c => (
          <button
            type="button"
            style={{ backgroundColor: `#${c}` }}
            onBlur={field.handleBlur}
            onClick={() => field.handleChange(c)}
            className={cx(
              "w-12 h-12",
              c === field.state.value
                ? "rounded-2xl border-2 border-stone-500"
                : "rounded-lg opacity-50",
            )}
          />
        ))}
      </div>

      <FieldInfo field={field} />
    </div>
  )
}
