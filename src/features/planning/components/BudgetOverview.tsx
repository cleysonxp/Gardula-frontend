import { PiggyBank, Target } from "lucide-react"

interface BudgetOverviewProps {
    budget: number
    spent: number
    available: number
    usagePercentage: number
    formatCurrency: (value: number) => string
}

export function BudgetOverview({
    budget,
    spent,
    available,
    usagePercentage,
    formatCurrency,
}: BudgetOverviewProps) {
    return (
        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-7 xl:flex-row xl:items-center">
                <div className="min-w-0 flex-1">
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <PiggyBank size={22} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-950">
                                    Orçamento do mês
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Acompanhe seu limite de gastos e mantenha o controle.
                                </p>
                            </div>
                        </div>

                        <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-violet-600 transition hover:bg-violet-50">
                            <Target size={16} />
                            Definir orçamento
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-5 border-t border-slate-100 pt-6 sm:grid-cols-3">
                        <div>
                            <p className="text-2xl font-bold text-slate-950">
                                {formatCurrency(budget)}
                            </p>
                            <p className="mt-1 text-sm font-medium text-violet-600">
                                Orçamento
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-slate-950">
                                {formatCurrency(spent)}
                            </p>
                            <p className="mt-1 text-sm font-medium text-rose-500">
                                Gasto
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-emerald-600">
                                {formatCurrency(available)}
                            </p>
                            <p className="mt-1 text-sm font-medium text-emerald-600">
                                Disponível
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-sm text-slate-500">
                                {formatCurrency(spent)} de {formatCurrency(budget)}
                            </span>
                            <span className="text-sm font-semibold text-slate-700">
                                {usagePercentage.toFixed(1).replace(".", ",")}%
                            </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-violet-600" style={{ width: `${usagePercentage}%` }} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 xl:w-[360px] xl:flex-row">
                    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#7c3aed ${usagePercentage}%, #e5e7eb 0)` }}>
                        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                            <span className="text-2xl font-bold text-slate-950">
                                {usagePercentage.toFixed(1).replace(".", ",")}%
                            </span>
                            <span className="text-xs text-slate-500">
                                utilizado
                            </span>
                        </div>
                    </div>

                    <div className="rounded-xl bg-violet-50 px-5 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                            Você ainda tem
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                            <span className="font-bold text-slate-900">
                                {formatCurrency(available)}
                            </span>{" "}
                            disponível para gastar este mês.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}