import { useMemo } from "react"
import { useI18nContext } from "./i18n-react"
import type { TranslationFunctions } from "./i18n-types"

export function useShouldMirror() {
  const { LL } = useI18nContext()

  const shouldMirror = LL.CONFIG_DIR() === "rtl"
  return shouldMirror
}

export function useCreateSchema<T>(genSchema: (LL: TranslationFunctions) => T) {
  const { LL } = useI18nContext()

  const schema = useMemo(() => genSchema(LL), [LL, genSchema])
  return schema
}
