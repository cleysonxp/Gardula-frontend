import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"

type DeleteAction = (id: number | string) => Promise<void>

type DeleteTransactionModalProps = {
    isOpen: boolean
    transactionId: number | string | null
    transactionDescription?: string
    onClose: () => void
    onDeleted?: () => void
    deleteAction: DeleteAction | null
}

export function DeleteTransactionModal({
    isOpen,
    transactionId,
    transactionDescription,
    onClose,
    onDeleted,
    deleteAction,
}: DeleteTransactionModalProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    async function handleDelete() {
        if (transactionId === null || !deleteAction) return

        try {
            setIsDeleting(true)
            setError(null)

            await deleteAction(transactionId)

            onDeleted?.()
            onClose()
        } catch {
            setError("Não foi possível excluir a transação.")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>

                        <h2 className="text-lg font-semibold text-gray-900">
                            Excluir transação
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-5">
                    <p className="text-sm text-gray-600">
                        Tem certeza que deseja excluir esta transação?
                    </p>

                    {transactionDescription && (
                        <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3">
                            <p className="text-sm font-medium text-gray-900">
                                {transactionDescription}
                            </p>
                        </div>
                    )}

                    <p className="mt-4 text-sm text-gray-500">
                        Essa ação não pode ser desfeita.
                    </p>

                    {error && (
                        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting || transactionId === null || !deleteAction}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            </div>
        </div>
    )
}