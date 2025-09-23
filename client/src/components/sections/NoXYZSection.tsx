import type { Icon } from "@phosphor-icons/react"
import { contentContainer } from "#/shared/skins"

interface NoXYZSectionProps {
  Icon: Icon
  title: string
  description?: string
}

export function NoXYZSection({ Icon, description, title }: NoXYZSectionProps) {
  return (
    <div
      className={contentContainer({ className: "items-center justify-center" })}
    >
      <div className="flex flex-col items-center p-4 gap-4 text-center">
        <Icon size={160} weight="duotone" className="text-brand-50" />
        <p className="font-bold text-gray-90 text-2xl">{title}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}
