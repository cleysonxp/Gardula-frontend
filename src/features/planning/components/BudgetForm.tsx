import { X } from "lucide-react"
import { useState } from "react"

import {
    createMonthlyBudget,
    updateMonthlyBudget,
} from "../services/planningService"

interface BudgetFormProps {
    year: number
    month: number
    isInherited: boolean
    currentAmount: number
    onClose: () => void
    onSuccess: () => void
}

export function BudgetForm({
    year,
    month,
    isInherited,
    currentAmount,
    onClose,
    onSuccess,
}: BudgetFormProps) {
    const [amount, setAmount] =
        useState(
            currentAmount > 0
                ? currentAmount.toString().replace(".", ",")
                : "",
        )

    const [isSaving, setIsSaving] =
        useState(false)

    const [error, setError] =
        useState<string | null>(null)

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        const normalizedAmount = amount
            .replace(",", ".")
            .trim()

        const numericAmount = Number(normalizedAmount)

        if (!normalizedAmount || numericAmount <= 0) {
            setError("Informe um valor maior que zero.")
            return
        }

        try {
            setError(null)
            setIsSaving(true)

            const request = {
                amount: numericAmount,
            }

            if (isInherited) {
                await createMonthlyBudget(
                    year,
                    month,
                    request,
                )
            } else {
                await updateMonthlyBudget(
                    year,
                    month,
                    request,
                )
            }

            onSuccess()
        } catch (error) {
            console.error(
                "Erro ao salvar orçamento:",
                error,
            )

            setError(
                "Não foi possível salvar o orçamento.",
            )
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-950">
                            Definir orçamento
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Informe quanto você pretende gastar neste mês.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Fechar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="budget-amount"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Valor do orçamento
                        </label>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                                R$
                            </span>

                            <input
                                id="budget-amount"
                                type="text"
                                inputMode="decimal"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                                placeholder="0,00"
                                className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                disabled={isSaving}
                                autoFocus
                            />
                        </div>
                    </div>

                    {isInherited && (
                        <p className="mt-3 text-xs text-slate-500">
                            O valor atual de{" "}
                            <strong>
                                R$ {currentAmount.toFixed(2).replace(".", ",")}
                            </strong>{" "}
                            está sendo herdado de um mês anterior.
                        </p>
                    )}

                    {error && (
                        <p className="mt-3 text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSaving
                                ? "Salvando..."
                                : "Salvar orçamento"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}