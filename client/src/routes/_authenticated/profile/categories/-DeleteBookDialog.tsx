import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import {
  categoriesControllerRemoveCategoryByIdMutation,
  type CategoryResponseDto,
} from "#/api-client"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"
import { parseError } from "#/shared/api"

interface DeleteBookDialogProps {
  categoryId: CategoryResponseDto["id"]
  onClose: () => void
}

const onError = (err: unknown) => toast.error(parseError(err))

function useRemoveCategoryByIdMutation() {
  const navigate = useNavigate()

  return useMutation({
    ...categoriesControllerRemoveCategoryByIdMutation(),
    onSuccess: () => {
      toast.success(t.c.sentence(t.doneSuccessfully))
      navigate({ to: "/profile/categories" })
    },
    onError,
  })
}

export function DeleteCategoryDialog({
  categoryId,
  onClose,
}: DeleteBookDialogProps) {
  const { mutate: removeCategory } = useRemoveCategoryByIdMutation()

  const handleDelete = () => removeCategory({ path: { id: categoryId } })

  return (
    <div className="fixed inset-0 h-full w-full z-[2] flex items-center justify-center p-6 bg-black/20">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
      />

      <div className="flex flex-col gap-6 p-6 rounded-lg border-2 border-gray-30 bg-gray-10 max-w-120 w-full z-[3]">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-gray-90 text-xl">
            {t.c.sentence(t.areYouSure)}
          </p>
          <p className="">{t.c.sentence(t.thisActionIsIrreversible)}</p>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className={btn({
              mode: "text",
            })}
          >
            {t.c.capital(t.btns.cancel)}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className={btn({
              intent: "danger",
              mode: "contained",
            })}
          >
            {t.c.capital(t.btns.delete)}
          </button>
        </div>
      </div>
    </div>
  )
}
