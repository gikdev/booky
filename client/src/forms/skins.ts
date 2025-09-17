import { cva } from "#/shared/cx.config"

export const btn = cva({
  base: `
    border-none flex items-center justify-center

    active:scale-95      disabled:active:scale-100
    cursor-pointer       disabled:cursor-not-allowed
    [&_svg]:text-[1.5em] disabled:opacity-50

    outline-0            focus:outline-2
    outline-brand-50 outline-offset-2
  `,
  variants: {
    mode: {
      contained: `
        font-bold
        text-gray-10
        disabled:text-gray-40
        disabled:bg-gray-60 
        disabled:hover:bg-gray-60
      `,
      outline: null,
      text: `
        bg-transparent
        disabled:text-gray-40
        disabled:hover:text-gray-40
        disabled:bg-gray-80 
        disabled:hover:bg-gray-80
      `,
    },
    intent: {
      neutral: null,
      danger: null,
      success: null,
      brand: null,
    },
    isIcon: {
      false: null,
      true: null,
    },
    size: {
      sm: "rounded-lg py-2 gap-2 min-h-12",
      md: "rounded-xl py-4 gap-2 min-h-14",
    },
  },
  compoundVariants: [
    {
      isIcon: true,
      size: "sm",
      className: "px-2 w-12",
    },
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
      mode: "text",
      size: "sm",
      className: "rounded-xl",
    },
    {
      mode: "text",
      size: "md",
      className: "rounded-xl",
    },
    {
      mode: "outline",
      size: "sm",
      className: "rounded-xl",
    },
    {
      mode: "outline",
      size: "md",
      className: "rounded-xl",
    },
    {
      mode: "contained",
      size: "md",
      className: "rounded-2xl",
    },
    {
      intent: "neutral",
      mode: "text",
      className: `
        text-gray-60
        hover:text-gray-90
        hover:bg-gray-60/10
      `,
    },
    {
      intent: "danger",
      mode: "text",
      className: `
        text-danger-60
        hover:text-danger-90
        hover:bg-danger-60/10
      `,
    },
    {
      intent: "neutral",
      mode: "outline",
      className: `
        text-gray-60
        border-2
        border-solid
        border-gray-30
        hover:bg-gray-30
        hover:text-gray-90
      `,
    },
    {
      intent: "neutral",
      mode: "contained",
      className: `
        text-gray-40
        hover:text-gray-10
        bg-gray-80
        hover:bg-gray-70
      `,
    },
    {
      intent: "success",
      mode: "contained",
      className: `
        bg-success-60
        hover:bg-success-70
      `,
    },
    {
      intent: "danger",
      mode: "contained",
      className: `
        bg-danger-60
        hover:bg-danger-70
      `,
    },
    {
      intent: "brand",
      mode: "contained",
      className: `
        bg-brand-60
        hover:bg-brand-70
      `,
    },
  ],
  defaultVariants: {
    size: "md",
    intent: "neutral",
    mode: "text",
    isIcon: false,
  },
})

export const smallMsg = cva({
  base: "text-xs",
  variants: {
    intent: {
      success: "text-success-60",
      error: "text-danger-60",
      warning: "text-warning-60",
      neutral: "text-gray-60",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
})

export const fieldWithLabelContainer = cva({
  base: "flex flex-col gap-1",
})

export const inputField = cva({
  base: `
    min-h-14 p-4 rounded-lg bg-gray-20
    focus:bg-gray-30 text-gray-90
    placeholder:text-gray-60 

    outline-brand-50 outline-offset-2
    focus:outline-2 
    
    disabled:text-gray-60
    disabled:bg-gray-40
    
    cursor-text     disabled:cursor-not-allowed

    w-full
    disabled:opacity-50
  `,
  variants: {
    isMultiline: {
      false: null,
      true: "min-h-28",
    },
  },
  defaultVariants: {
    isMultiline: false,
  },
})
