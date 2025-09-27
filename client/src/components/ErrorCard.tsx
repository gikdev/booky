import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { parseError } from "#/shared/api"
import { ArrowCounterClockwiseIcon, BugIcon } from "@phosphor-icons/react"

interface ErrorCardProps {
  error?: unknown
  handleRetry?: () => void
}

export function ErrorCard({ error, handleRetry }: ErrorCardProps) {
  return (
    <div className="flex flex-col items-center p-4 gap-4 text-center text-danger-60">
      <BugIcon size={64} weight="duotone" className="text-danger-50" />

      <p className="font-bold text-danger-90 text-2xl">
        {t.c.capital(t.generalErrorMsg)}
      </p>

      {!!error && <p>{parseError(error)}</p>}

      {handleRetry && (
        <button
          type="button"
          onClick={handleRetry}
          className={btn({ intent: "danger", mode: "contained" })}
        >
          <ArrowCounterClockwiseIcon size={24} />
          <span>امتحان دوباره</span>
        </button>
      )}
    </div>
  )
}
