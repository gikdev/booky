import { createFormHook } from "@tanstack/react-form"
import { Btn } from "./components/Btn"
import { SimpleText } from "./components/SimpleText"
import { fieldContext, formContext } from "./shared"
import { Colors } from "./components/Colors"

export const { useAppForm } = createFormHook({
  fieldComponents: {
    SimpleText,
    Colors,
  },
  formComponents: {
    Btn,
  },
  fieldContext,
  formContext,
})
