import { cva } from "./cx.config"

export const page = cva({ base: "flex flex-col flex-1" })
export const contentContainer = cva({
  base: "flex flex-col flex-1 overflow-y-auto",
})
