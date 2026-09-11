import { useEffect, useState } from "react"
import { X } from "lucide-react"

import {
    getTransfer,
    updateTransfer,
} from "@/features/transactions/services/transferService"

import {
    getAccounts,
    type AccountResponse,
} from "@/features/accounts/services/accountService"

type EditTransferModalProps = {
    isOpen: boolean
    transferId: number | null
    onClose: () => void
    onUpdated?: () => void
}

export function EditTransferModal({
    isOpen,
    transferId,
    onClose,
    onUpdated,
}: EditTransferModalProps) {
    const [accounts, setAccounts] = useState<AccountResponse[]>([])

    const [sourceAccountId, setSourceAccountId] = useState("")
    const [destinationAccountId, setDestinationAccountId] = useState("")
    const [amount, setAmount] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!isOpen || !transferId) {
            return
        }

        async function loadData() {
            try {
                setIsLoading(true)
                setError(null)

                const [transferResponse, accountsResponse] =
                    await Promise.all([
                        getTransfer(transferId),
                        getAccounts(),
                    ])

                setAccounts(
                    accountsResponse.filter(
                        (account) => account.isActive,
                    ),
                )

                setSourceAccountId(
                    String(transferResponse.sourceAccountId),
                )

                setDestinationAccountId(
                    String(transferResponse.destinationAccountId),
                )

                setAmount(String(transferResponse.amount))
            } catch {
                setError(
                    "Não foi possível carregar os dados da transferência.",
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [isOpen, transferId])

    async function handleSubmit() {
        if (!transferId) {
            return
        }

        if (!sourceAccountId || !destinationAccountId) {
            setError(
                "Selecione a conta de origem e a conta de destino.",
            )
            return
        }

        if (sourceAccountId === destinationAccountId) {
            setError(
                "A conta de origem e destino devem ser diferentes.",
            )
            return
        }

        const parsedAmount = Number(amount)

        if (!parsedAmount || parsedAmount <= 0) {
            setError("Informe um valor válido.")
            return
        }

        try {
            setIsSaving(true)
            setError(null)

            await updateTransfer(transferId, {
                sourceAccountId: Number(sourceAccountId),
                destinationAccountId: Number(destinationAccountId),
                amount: parsedAmount,
            })

            onUpdated?.()
            onClose()
        } catch {
            setError(
                "Não foi possível atualizar a transferência.",
            )
        } finally {
            setIsSaving(false)
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-slate-900/50"
                onClick={isSaving ? undefined : onClose}
            />

            <div className="relative z-10 w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Editar transferência
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Altere as contas ou o valor da transferência
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Fechar"
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="px-6 py-6">
                    {isLoading ? (
                        <div className="py-10 text-center text-sm text-slate-500">
                            Carregando transferência...
                        </div>
                    ) : (
                        <>
                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Conta de origem
                                </label>

                                <select
                                    value={sourceAccountId}
                                    onChange={(event) =>
                                        setSourceAccountId(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isSaving}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                >
                                    <option value="">
                                        Selecione uma conta
                                    </option>

                                    {accounts.map((account) => (
                                        <option
                                            key={account.id}
                                            value={account.id}
                                        >
                                            {account.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Conta de destino
                                </label>

                                <select
                                    value={destinationAccountId}
                                    onChange={(event) =>
                                        setDestinationAccountId(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isSaving}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                >
                                    <option value="">
                                        Selecione uma conta
                                    </option>

                                    {accounts.map((account) => (
                                        <option
                                            key={account.id}
                                            value={account.id}
                                        >
                                            {account.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Valor
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={amount}
                                    onChange={(event) =>
                                        setAmount(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isSaving}
                                    placeholder="R$ 0,00"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />
                            </div>

                            {error && (
                                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading || isSaving}
                        className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSaving
                            ? "Salvando..."
                            : "Salvar alterações"}
                    </button>
                </div>
            </div>
        </div>
    )
}