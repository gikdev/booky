import {
  CubeFocusIcon,
  type Icon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { FieldMsg } from "#/forms/components/core/FieldMsg"
import { InputField } from "#/forms/components/core/InputField"
import { btn } from "#/forms/skins"
import { contentContainer, page } from "#/shared/skins"

export const Route = createFileRoute("/dev")({
  component: RouteComponent,
})

const containerStyles = contentContainer({
  className: "items-center justify-center gap-5",
})

function RouteComponent() {
  const [name, setName] = useState("")
  const [hasError, setHasError] = useState(false)
  const [leadingIcon, setLeadingIcon] = useState<Icon | null>(null)
  const [trailingIcon, setTrailingIcon] = useState<Icon | null>(null)

  return (
    <div className={page({ className: "p-4" })}>
      <div className={containerStyles}>
        <div className="flex flex-col">
          <InputField
            label="نام"
            LeadingIcon={leadingIcon || undefined}
            onChange={v => setName(v)}
            value={name}
            hasError={hasError}
            placeholder="مثلا: اصغر"
            TrailingIcon={trailingIcon || undefined}
          />
          <FieldMsg intent={hasError ? "danger" : "neutral"}>
            به انگلیسی ننویسید
          </FieldMsg>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className={btn({ mode: "outline" })}
            onClick={() => setHasError(p => !p)}
          >
            ERROR
          </button>
          <button
            type="button"
            className={btn({ mode: "outline" })}
            onClick={() =>
              setLeadingIcon(leadingIcon ? null : MagnifyingGlassIcon)
            }
          >
            Leading
          </button>
          <button
            type="button"
            className={btn({ mode: "outline" })}
            onClick={() => setTrailingIcon(trailingIcon ? null : CubeFocusIcon)}
          >
            Trailing
          </button>
        </div>
      </div>
    </div>
  )
}
