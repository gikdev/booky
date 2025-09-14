import {
  booksControllerRemoveBookByIdMutation,
  type BookResponseDto,
} from "#/api-client"
import { btn } from "#/forms/skins"
import { parseError } from "#/shared/api"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"

interface DeleteBookDialogProps {
  bookId: BookResponseDto["id"]
  onClose: () => void
}

const onError = (err: unknown) => toast.error(parseError(err))

function useRemoveBookByIdMutation() {
  const navigate = useNavigate()

  return useMutation({
    ...booksControllerRemoveBookByIdMutation(),
    onSuccess: () => {
      toast.success("با موفقیت انجام شد!")
      navigate({ to: "/books" })
    },
    onError,
  })
}

export function DeleteBookDialog({ bookId, onClose }: DeleteBookDialogProps) {
  const { mutate: removeBook } = useRemoveBookByIdMutation()

  const handleDelete = () => removeBook({ path: { id: bookId } })

  return (
    <div className="fixed inset-0 h-full w-full z-[2] flex items-center justify-center p-6 bg-black/20">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
      />

      <div className="flex flex-col gap-6 p-6 rounded-lg border-2 border-gray-30 bg-gray-10 max-w-120 w-full z-[3]">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-gray-90 text-xl">آیا مطمئن هستی؟</p>
          <p className="">
            واقعا مطمئن هستی که می‌خواهی این آیتم خیلی مهم رو پاک کنی؟ این عمل
            قابل بازگشت نیست!!!
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            className={btn({
              mode: "text",
            })}
            onClick={onClose}
          >
            انصراف
          </button>

          <button
            type="button"
            className={btn({
              intent: "danger",
              mode: "contained",
            })}
            onClick={handleDelete}
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  )
}
