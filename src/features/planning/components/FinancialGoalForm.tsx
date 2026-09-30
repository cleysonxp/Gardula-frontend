import { X } from "lucide-react"
import { useState } from "react"

import { createFinancialGoal } from "../services/planningService"

interface FinancialGoalFormProps {
    onClose: () => void
    onSuccess: () => void
}

export function FinancialGoalForm({
    onClose,
    onSuccess,
}: FinancialGoalFormProps) {
    const [name, setName] =
        useState("")

    const [description, setDescription] =
        useState("")

    const [targetAmount, setTargetAmount] =
        useState("")

    const [targetDate, setTargetDate] =
        useState("")

    const [icon, setIcon] =
        useState("Target")

    const [isSaving, setIsSaving] =
        useState(false)

    const [error, setError] =
        useState<string | null>(null)

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        const normalizedAmount = targetAmount
            .replace(",", ".")
            .trim()

        const numericAmount =
            Number(normalizedAmount)

        if (!name.trim()) {
            setError("Informe o nome da meta.")
            return
        }

        if (!description.trim()) {
            setError("Informe a descrição da meta.")
            return
        }

        if (
            !normalizedAmount ||
            numericAmount <= 0
        ) {
            setError(
                "Informe um valor maior que zero.",
            )
            return
        }

        if (!targetDate) {
            setError(
                "Informe a data da meta.",
            )
            return
        }

        if (!icon.trim()) {
            setError("Informe um ícone.")
            return
        }

        try {
            setError(null)
            setIsSaving(true)

            await createFinancialGoal({
                name: name.trim(),
                description: description.trim(),
                targetAmount: numericAmount,
                targetDate: new Date(
                    `${targetDate}T00:00:00`,
                ).toISOString(),
                icon: icon.trim(),
            })

            onSuccess()
        } catch (error) {
            console.error(
                "Erro ao criar meta financeira:",
                error,
            )

            setError(
                "Não foi possível criar a meta.",
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
                            Novo objetivo
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Crie uma meta para acompanhar seu progresso.
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

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label
                            htmlFor="goal-name"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Nome
                        </label>

                        <input
                            id="goal-name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Ex.: Viagem para Europa"
                            disabled={isSaving}
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="goal-description"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Descrição
                        </label>

                        <textarea
                            id="goal-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value,
                                )
                            }
                            placeholder="Ex.: Guardar dinheiro para a viagem."
                            rows={3}
                            disabled={isSaving}
                            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="goal-target-amount"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Valor da meta
                        </label>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                                R$
                            </span>

                            <input
                                id="goal-target-amount"
                                type="text"
                                inputMode="decimal"
                                value={targetAmount}
                                onChange={(event) =>
                                    setTargetAmount(
                                        event.target.value,
                                    )
                                }
                                placeholder="0,00"
                                disabled={isSaving}
                                className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="goal-target-date"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Data da meta
                        </label>

                        <input
                            id="goal-target-date"
                            type="date"
                            value={targetDate}
                            onChange={(event) =>
                                setTargetDate(
                                    event.target.value,
                                )
                            }
                            disabled={isSaving}
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="goal-icon"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Ícone
                        </label>

                        <input
                            id="goal-icon"
                            type="text"
                            value={icon}
                            onChange={(event) =>
                                setIcon(event.target.value)
                            }
                            placeholder="Target"
                            disabled={isSaving}
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
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
                                : "Criar objetivo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}