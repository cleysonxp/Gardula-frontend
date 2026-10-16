import { ArrowRight, CircleDollarSign } from "lucide-react"

import type { CategorySpendingResponse } from "@/features/home/types/home.types"

interface CategorySpendingCardProps {
    categories: CategorySpendingResponse[]
    totalExpenses: number
}

const categoryColors = [
    { dot: "bg-violet-500", chart: "#8b5cf6" },
    { dot: "bg-orange-400", chart: "#fb923c" },
    { dot: "bg-blue-500", chart: "#3b82f6" },
    { dot: "bg-emerald-500", chart: "#10b981" },
    { dot: "bg-rose-400", chart: "#fb7185" },
    { dot: "bg-slate-400", chart: "#94a3b8" },
]

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function CategorySpendingCard({
    categories,
    totalExpenses,
}: CategorySpendingCardProps) {
    let currentDegree = 0

    const chartGradient = categories.length > 0 && totalExpenses > 0
        ? `conic-gradient(${categories.map((category, index) => {
            const color = categoryColors[index % categoryColors.length].chart
            const startDegree = currentDegree
            const percentage = Math.max(0, category.amount) / totalExpenses * 360
            currentDegree += percentage

            return `${color} ${startDegree}deg ${currentDegree}deg`
        }).join(", ")})`
        : "#e2e8f0"

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <CircleDollarSign size={20} />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-slate-950">
                            Gastos por categoria
                        </h2>

                        <p className="text-xs text-slate-500">
                            Distribuição das despesas do mês
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    Ver detalhes
                    <ArrowRight size={14} />
                </button>
            </div>

            {categories.length === 0 ? (
                <div className="flex min-h-48 items-center justify-center">
                    <p className="text-sm text-slate-500">
                        Nenhuma despesa por categoria neste período.
                    </p>
                </div>
            ) : (
                <div className="grid items-center gap-6 md:grid-cols-[220px_1fr]">
                    <div
                        className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full"
                        style={{ background: chartGradient }}
                    >
                        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                            <span className="text-center text-base font-bold text-slate-950">
                                {formatCurrency(totalExpenses)}
                            </span>

                            <span className="mt-1 text-[10px] text-slate-500">
                                Total de despesas
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {categories.map((category, index) => {
                            const color = categoryColors[index % categoryColors.length]

                            return (
                                <div
                                    key={category.categoryId}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${color.dot}`} />

                                        <span className="text-xs font-medium text-slate-600">
                                            {category.categoryName}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-semibold text-slate-700">
                                            {formatCurrency(category.amount)}
                                        </span>

                                        <span className="w-10 text-right text-xs text-slate-500">
                                            {category.percentage.toLocaleString("pt-BR", {
                                                maximumFractionDigits: 1,
                                            })}%
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </section>
    )
}