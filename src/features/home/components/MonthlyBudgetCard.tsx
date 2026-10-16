import { ArrowRight, Lightbulb, Target } from "lucide-react"

import type { BudgetOverviewResponse } from "@/features/home/types/home.types"

interface MonthlyBudgetCardProps {
    budget: BudgetOverviewResponse
    year: number
    month: number
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function MonthlyBudgetCard({
    budget,
    year,
    month,
}: MonthlyBudgetCardProps) {
    const percentageUsed = Math.min(
        100,
        Math.max(0, budget.percentageUsed),
    )

    const remainingDays = Math.max(
        0,
        new Date(year, month, 0).getDate() - new Date().getDate(),
    )

    const hasBudget = budget.amount > 0

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Target size={20} />
                    </div>

                    <h2 className="text-base font-bold text-slate-950">
                        Orçamento do mês
                    </h2>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    Ver planejamento
                    <ArrowRight size={14} />
                </button>
            </div>

            {!hasBudget ? (
                <div className="flex min-h-48 flex-col items-center justify-center text-center">
                    <Target size={28} className="mb-3 text-slate-300" />

                    <p className="text-sm font-semibold text-slate-800">
                        Nenhum orçamento definido
                    </p>

                    <p className="mt-1 max-w-xs text-xs text-slate-500">
                        Configure um orçamento no planejamento para acompanhar seus gastos neste mês.
                    </p>
                </div>
            ) : (
                <div>
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="text-2xl font-bold text-slate-950">
                                {formatCurrency(budget.amount)}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {budget.isInherited
                                    ? "Orçamento herdado"
                                    : "Orçamento definido"}
                            </p>
                        </div>

                        <span className="text-xs font-medium text-slate-500">
                            {budget.percentageUsed.toLocaleString("pt-BR", {
                                maximumFractionDigits: 1,
                            })}% utilizado
                        </span>
                    </div>

                    <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className={`h-full rounded-full ${
                                percentageUsed >= 100
                                    ? "bg-rose-500"
                                    : "bg-violet-600"
                            }`}
                            style={{ width: `${percentageUsed}%` }}
                        />
                    </div>

                    <div className="mt-5 flex justify-between gap-4">
                        <div>
                            <p className="text-base font-bold text-slate-900">
                                {formatCurrency(budget.spent)}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                <span className="h-2 w-2 rounded-full bg-rose-500" />
                                Utilizado
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-base font-bold text-slate-900">
                                {formatCurrency(budget.available)}
                            </p>

                            <div className="mt-1 flex items-center justify-end gap-1.5 text-xs text-slate-500">
                                Disponível
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex gap-3 rounded-xl bg-violet-50 p-4">
                        <Lightbulb
                            className="mt-0.5 shrink-0 text-violet-600"
                            size={19}
                        />

                        <div>
                            <p className="text-xs font-semibold text-slate-800">
                                {remainingDays === 0
                                    ? "Último dia do período ou mês já encerrado."
                                    : `Você tem ${remainingDays} ${
                                        remainingDays === 1 ? "dia" : "dias"
                                    } até o fim do mês selecionado.`}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {budget.available >= 0
                                    ? "Continue acompanhando seus gastos para manter o orçamento sob controle."
                                    : "Você ultrapassou o orçamento definido. Revise seus gastos."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}