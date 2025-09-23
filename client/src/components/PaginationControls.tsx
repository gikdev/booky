import {
  CaretLeftIcon,
  CaretLineLeftIcon,
  CaretLineRightIcon,
  CaretRightIcon,
} from "@phosphor-icons/react"
import { t } from "#/i18n"
import { cva } from "#/shared/cx.config"
import { convertToPersianDigitsIfPersian } from "#/shared/helpers"

interface PaginationControlsProps {
  disabled?: boolean

  isFirstPage: boolean
  onFirstBtnClick: () => void

  hasPreviousPage: boolean
  onPreviousBtnClick: () => void

  currentPage: number

  hasNextPage: boolean
  onNextBtnClick: () => void

  isLastPage: boolean
  onLastBtnClick: () => void
}

export function PaginationControls({
  disabled = false,
  currentPage,
  onFirstBtnClick,
  onLastBtnClick,
  onNextBtnClick,
  onPreviousBtnClick,
  isFirstPage,
  isLastPage,
  hasNextPage,
  hasPreviousPage,
}: PaginationControlsProps) {
  return (
    <div className="flex w-full h-12 border-t border-gray-30">
      <button
        type="button"
        onClick={onFirstBtnClick}
        disabled={isFirstPage || disabled}
        className={paginateBtn()}
      >
        <CaretLineLeftIcon size={24} mirrored={t.configIconMirror} />
      </button>

      <button
        type="button"
        onClick={onPreviousBtnClick}
        disabled={!hasPreviousPage || disabled}
        className={paginateBtn()}
      >
        <CaretLeftIcon size={24} mirrored={t.configIconMirror} />
      </button>

      <p className="h-full flex-1 flex items-center justify-center text-gray-90 font-bold">
        {convertToPersianDigitsIfPersian(currentPage.toString())}
      </p>

      <button
        type="button"
        onClick={onNextBtnClick}
        disabled={!hasNextPage || disabled}
        className={paginateBtn()}
      >
        <CaretRightIcon size={24} mirrored={t.configIconMirror} />
      </button>

      <button
        type="button"
        onClick={onLastBtnClick}
        disabled={isLastPage || disabled}
        className={paginateBtn()}
      >
        <CaretLineRightIcon size={24} mirrored={t.configIconMirror} />
      </button>
    </div>
  )
}

const paginateBtn = cva({
  base: `
    h-full flex-1 flex
    items-center justify-center

    bg-gray-10 disabled:bg-gray-30
    hover:bg-gray-20 disabled:hover:bg-gray-30

    text-gray-60 hover:text-gray-90 disabled:hover:text-gray-60

    opacity-100 disabled:opacity-50

    cursor-pointer disabled:cursor-not-allowed
  `,
})

export const LoadingPaginationControls = () => (
  <div
    className="flex w-full h-12 border-t border-gray-30 bg-gray-30 animate-pulse"
    dir="ltr"
  />
)
