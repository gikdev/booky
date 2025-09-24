import { CubeFocusIcon } from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { FieldMsg } from "#/forms/components/core/FieldMsg"
import { InputField } from "#/forms/components/core/InputField"
import { contentContainer, page } from "#/shared/skins"

export const Route = createFileRoute("/dev")({
  component: RouteComponent,
})

const containerStyles = contentContainer({
  className: "items-center justify-center",
})

function RouteComponent() {
  const [name, setName] = useState("")

  return (
    <div className={page({ className: "p-4" })}>
      <div className={containerStyles}>
        <div className="flex flex-col">
          <InputField
            label="نام"
            LeadingIcon={CubeFocusIcon}
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="مثلا: اصغر"
          />
          <FieldMsg>به انگلیسی ننویسید</FieldMsg>
        </div>
      </div>
    </div>
  )
}
