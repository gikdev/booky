import { createFormHook } from "@tanstack/react-form"
import { Btn } from "./components/Btn"
import { Colors } from "./components/Colors"
import { SimpleNumber } from "./components/SimpleNumber"
import { SimpleSelect } from "./components/SimpleSelect"
import { SimpleText } from "./components/SimpleText"
import { fieldContext, formContext } from "./shared"
import { SimpleDate } from "./components/SimpleDate"

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
