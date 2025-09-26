import type { AnyFieldApi } from "@tanstack/react-form"
import { t } from "#/i18n"
import { parseError } from "#/shared/api"
import { FieldMsg } from "./FieldMsg"

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  const { isValid, isValidating, isDirty } = field.state.meta
  const showError = !isValid

  const errorMsg = field.state.meta.errors
    .map(e => parseError(e, t.c.sentence(t.generalErrorMsg)))
    .join(`${t.configListItemSeparator} `)

  if (!isDirty) return null

  if (isValidating)
    return <FieldMsg intent="neutral">{t.c.sentence(t.validatingMsg)}</FieldMsg>

  if (showError) return <FieldMsg intent="danger">{errorMsg}</FieldMsg>

  return <FieldMsg intent="success">{t.c.sentence(t.correct)}</FieldMsg>
}
