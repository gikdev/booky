import { createFormHook } from "@tanstack/react-form"
import { Btn } from "./components/Btn"
import { Colors } from "./components/Colors"
import { SimpleDate } from "./components/SimpleDate"
import { SimpleNumber } from "./components/SimpleNumber"
import { SimpleSelect } from "./components/SimpleSelect"
import { SimpleText } from "./components/SimpleText"
import { fieldContext, formContext } from "./shared"

export const { useAppForm } = createFormHook({
  fieldComponents: {
    SimpleNumber,
    SimpleText,
    SimpleSelect,
    SimpleDate,
    Colors,
  },
  formComponents: {
    Btn,
  },
  fieldContext,
  formContext,
})
