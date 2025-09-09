import { cva } from "#/shared/cx.config"

export const btn = cva({
  base: `
    border-none flex items-center justify-center

    active:scale-95      disabled:active:scale-100
    cursor-pointer       disabled:cursor-not-allowed
    [&_svg]:text-[1.5em] disabled:opacity-50
  `,
  variants: {
    mode: {
      contained: `
        font-bold
        text-stone-100
        disabled:text-stone-400
        disabled:bg-stone-600 
        disabled:hover:bg-stone-600
      `,
      outline: null,
      text: `
        bg-transparent
        disabled:text-stone-400
        disabled:hover:text-stone-400
        disabled:bg-stone-800 
        disabled:hover:bg-stone-800
      `,
    },
    intent: {
      neutral: null,
      danger: null,
      brand: null,
    },
    isIcon: {
      false: null,
      true: null,
    },
    size: {
      md: "rounded-2xl py-4 gap-2 min-h-14",
    },
  },
  compoundVariants: [
    {
      isIcon: false,
      size: "md",
      className: "px-6",
    },
    {
      isIcon: true,
      size: "md",
      className: "px-4 w-14",
    },
    {
      intent: "neutral",
      mode: "text",
      className: `
        text-stone-400
        hover:text-stone-300
        hover:bg-stone-400/10
      `,
    },
    {
      intent: "danger",
      mode: "text",
      className: `
        text-danger-400
        hover:text-danger-300
        hover:bg-danger-400/10
      `,
    },
    {
      intent: "neutral",
      mode: "contained",
      className: `
        text-stone-400
        hover:text-stone-100
        bg-stone-800
        hover:bg-stone-700
      `,
    },
    {
      intent: "brand",
      mode: "contained",
      className: `
        bg-blue-600
        hover:bg-blue-700
      `,
    },
  ],
  defaultVariants: {
    size: "md",
    intent: "neutral",
    mode: "outline",
    isIcon: false,
  },
})
