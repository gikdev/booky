import { CheckIcon, CircleNotchIcon, XIcon } from "@phosphor-icons/react"
import type { AnyFieldApi } from "@tanstack/react-form"
import { t } from "#/i18n"
import { parseError } from "#/shared/api"
import { smallMsg } from "../skins"

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  const { isValid, isValidating } = field.state.meta
  const showError = !isValid

  const errorMsg = field.state.meta.errors
    .map(e => parseError(e, t.c.sentence(t.generalErrorMsg)))
    .join(`${t.configListItemSeparator} `)

  if (isValidating)
    return (
      <p className={smallMsg({ intent: "neutral" })}>
        <CircleNotchIcon className="inline me-1 animate-spin" />
        <span>{t.c.sentence(t.validatingMsg)}</span>
      </p>
    )

  if (showError)
    return (
      <p className={smallMsg({ intent: "error" })}>
        <XIcon className="inline me-1" />
        <span>{errorMsg}</span>
      </p>
    )

  return (
    <p className={smallMsg({ intent: "success" })}>
      <CheckIcon className="inline me-1" />
      <span>{t.c.sentence(t.correct)}</span>
    </p>
  )
}
