import { X } from "lucide-react"
import { useState } from "react"

import { addFinancialGoalAmount } from "../services/planningService"

interface FinancialGoalAmountFormProps {
    goalId: number
    goalName: string
    currentAmount: number
    targetAmount: number
    onClose: () => void
    onSuccess: () => void
}

export function FinancialGoalAmountForm({
    goalId,
    goalName,
    currentAmount,
    targetAmount,
    onClose,
    onSuccess,
}: FinancialGoalAmountFormProps) {
    const [amount, setAmount] =
        useState("")

    const [isSaving, setIsSaving] =
        useState(false)

    const [error, setError] =
        useState<string | null>(null)

    const remainingAmount =
        targetAmount - currentAmount

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        const normalizedAmount = amount
            .replace(",", ".")
            .trim()

        const numericAmount =
            Number(normalizedAmount)

        if (
            !normalizedAmount ||
            numericAmount <= 0
        ) {
            setError(
                "Informe um valor maior que zero.",
            )
            return
        }

        if (numericAmount > remainingAmount) {
            setError(
                `O valor máximo para esta meta é R$ ${remainingAmount
                    .toFixed(2)
                    .replace(".", ",")}.`,
            )
            return
        }

        try {
            setError(null)
            setIsSaving(true)

            await addFinancialGoalAmount(
                goalId,
                numericAmount,
            )

            onSuccess()
        } catch (error) {
            console.error(
                "Erro ao adicionar valor à meta:",
                error,
            )

            setError(
                "Não foi possível adicionar o valor à meta.",
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
                            Adicionar valor
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Adicione dinheiro à meta{" "}
                            <strong className="text-slate-700">
                                {goalName}
                            </strong>
                            .
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Fechar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-5 rounded-xl bg-violet-50 px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-slate-600">
                            Progresso atual
                        </span>

                        <span className="text-sm font-semibold text-slate-900">
                            R$ {currentAmount
                                .toFixed(2)
                                .replace(".", ",")}{" "}
                            de R$ {targetAmount
                                .toFixed(2)
                                .replace(".", ",")}
                        </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                        Restam R$ {remainingAmount
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                        para atingir sua meta.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="goal-amount"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Valor a adicionar
                        </label>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                                R$
                            </span>

                            <input
                                id="goal-amount"
                                type="text"
                                inputMode="decimal"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(
                                        event.target.value,
                                    )
                                }
                                placeholder="0,00"
                                disabled={isSaving}
                                autoFocus
                                className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>
                    </div>

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
                                : "Adicionar valor"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}