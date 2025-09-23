import { CircleNotchIcon } from "@phosphor-icons/react"
import { contentContainer } from "#/shared/skins"

export const LoadingSection = () => (
  <div
    className={contentContainer({ className: "items-center justify-center" })}
  >
    <CircleNotchIcon size={48} className="animate-spin text-gray-60" />
  </div>
)
