import { cva } from "./cx.config"

export const page = cva({ base: "flex flex-col flex-1 overflow-y-auto" })
export const contentContainer = cva({
  base: "flex flex-col flex-1 overflow-y-auto h-full",
})

export const tag = cva({
  base: "flex items-center gap-2 py-1.5 ps-4 pe-4 bg-stone-200 rounded-sm text-xs",
  variants: {
    hasIcon: {
      false: null,
      true: "ps-2 [&_svg]:text-[18px]",
    },
  },
  defaultVariants: {
    hasIcon: false,
  },
})

export const iconItem = cva({
  base: `
    flex items-center min-h-14 py-2
    px-4 gap-4 text-start [&_span]:flex-1
    [&_svg]:text-[1.5em] hover:bg-stone-200
    hover:text-stone-900 cursor-pointer
  `,
})
