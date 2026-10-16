import { ArrowRight, Home, Plane, Target } from "lucide-react"

import type { FinancialGoalResponse } from "@/features/home/types/home.types"

interface FinancialGoalsCardProps {
    goals: FinancialGoalResponse[]
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function getGoalIcon(icon: string) {
    switch (icon.toLowerCase()) {
        case "plane":
            return Plane
        case "home":
            return Home
        default:
            return Target
    }
}

export function FinancialGoalsCard({ goals }: FinancialGoalsCardProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Target size={20} />
                    </div>

                    <h2 className="text-base font-bold text-slate-950">
                        Seus objetivos
                    </h2>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    Ver todos
                    <ArrowRight size={14} />
                </button>
            </div>

            {goals.length === 0 ? (
                <div className="flex min-h-40 flex-col items-center justify-center text-center">
                    <Target size={28} className="mb-3 text-slate-300" />

                    <p className="text-sm font-semibold text-slate-800">
                        Você ainda não tem objetivos
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Crie uma meta financeira para acompanhar seu progresso.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {goals.map((goal) => {
                        const Icon = getGoalIcon(goal.icon)
                        const percentage = Math.min(100, Math.max(0, goal.percentage))

                        return (
                            <div key={goal.id} className="flex gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-500">
                                    <Icon size={18} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {goal.name}
                                        </p>

                                        <span className="shrink-0 text-xs font-bold text-slate-600">
                                            {percentage.toLocaleString("pt-BR", {
                                                maximumFractionDigits: 1,
                                            })}%
                                        </span>
                                    </div>

                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className={`h-full rounded-full ${
                                                goal.isCompleted
                                                    ? "bg-emerald-500"
                                                    : "bg-violet-500"
                                            }`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>

                                    <p className="mt-1.5 text-xs text-slate-500">
                                        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}