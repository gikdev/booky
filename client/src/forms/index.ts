import { createFormHook } from "@tanstack/react-form"
import { Btn } from "./components/Btn"
import { SimpleText } from "./components/SimpleText"
import { fieldContext, formContext } from "./shared"
import { Colors } from "./components/Colors"
import { SimpleNumber } from "./components/SimpleNumber"

export const { useAppForm } = createFormHook({
  fieldComponents: {
    SimpleNumber,
    SimpleText,
    Colors,
  },
  formComponents: {
    Btn,
  },
  fieldContext,
  formContext,
})
