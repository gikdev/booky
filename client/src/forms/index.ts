import { createFormHook } from "@tanstack/react-form"
import { Btn } from "./components/Btn"
import { SimpleText } from "./components/SimpleText"
import { fieldContext, formContext } from "./shared"

export const { useAppForm } = createFormHook({
  fieldComponents: {
    SimpleText,
  },
  formComponents: {
    Btn,
  },
  fieldContext,
  formContext,
})
