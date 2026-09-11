import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"

type DeleteAction = (id: number) => Promise<void>

type DeleteTransactionModalProps = {
    isOpen: boolean
    transactionId: number | null
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

    if (!isOpen) {
        return null
    }

    async function handleDelete() {
        if (!transactionId || !deleteAction) {
            return
        }

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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-slate-900/50"
                onClick={isDeleting ? undefined : onClose}
            />

            <div className="relative z-10 w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-start gap-4 px-6 py-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <AlertTriangle className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Excluir transação
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Tem certeza que deseja excluir esta transação?
                        </p>

                        {transactionDescription && (
                            <p className="mt-2 truncate rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                                {transactionDescription}
                            </p>
                        )}

                        <p className="mt-3 text-xs text-slate-400">
                            Essa ação não poderá ser desfeita.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Fechar"
                    >
                        <X size={18} />
                    </button>
                </div>

                {error && (
                    <div className="mx-6 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting || !deleteAction}
                        className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            </div>
        </div>
    )
}