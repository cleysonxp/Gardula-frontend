import { AlertTriangle, X } from "lucide-react"

type DeleteAccountModalProps = {
    accountName: string
    isDeleting: boolean
    onClose: () => void
    onConfirm: () => void
}

export function DeleteAccountModal({
    accountName,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteAccountModalProps) {
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isDeleting) {
                    onClose()
                }
            }}
        >
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                {/* Cabeçalho */}
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                            <AlertTriangle
                                size={20}
                                className="text-red-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-950">
                                Excluir conta
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Essa ação não poderá ser desfeita.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:pointer-events-none disabled:opacity-50"
                        aria-label="Fechar"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="px-6 py-6">
                    <p className="text-sm leading-6 text-slate-600">
                        Tem certeza que deseja excluir a conta{" "}
                        <span className="font-semibold text-slate-950">
                            "{accountName}"
                        </span>
                        ?
                    </p>

                    <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                        <p className="text-xs leading-5 text-red-700">
                            Ao confirmar, a conta será removida
                            permanentemente.
                        </p>
                    </div>
                </div>

                {/* Ações */}
                <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? "Excluindo..." : "Excluir conta"}
                    </button>
                </div>
            </div>
        </div>
    )
}