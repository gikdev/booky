import { createFormHook } from "@tanstack/react-form"
import { Btn } from "./components/Btn"
import { SimpleText } from "./components/SimpleText"
import { fieldContext, formContext } from "./shared"
import { Colors } from "./components/Colors"
import { SimpleNumber } from "./components/SimpleNumber"
import { SimpleSelect } from "./components/SimpleSelect"

export const { useAppForm } = createFormHook({
  fieldComponents: {
    SimpleNumber,
    SimpleText,
    SimpleSelect,
    Colors,
  },
  formComponents: {
    Btn,
  },
  fieldContext,
  formContext,
})
