import {
    ArrowDownRight,
    CalendarDays,
    Target,
    TrendingUp,
} from "lucide-react"

interface PlanningSummaryProps {
    availableToSpend: number
    remainingDays: number
    dailyAverage: number
    activeGoals: number
    totalGoals: number
    formatCurrency: (value: number) => string
}

export function PlanningSummary({
    availableToSpend,
    remainingDays,
    dailyAverage,
    activeGoals,
    totalGoals,
    formatCurrency,
}: PlanningSummaryProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <TrendingUp size={20} />
                </div>

                <div>
                    <h2 className="text-base font-bold text-slate-950">
                        Resumo rápido
                    </h2>
                    <p className="text-sm text-slate-500">
                        Uma visão geral do seu planejamento.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600">
                        <span className="text-lg font-bold">R$</span>
                    </div>

                    <div>
                        <p className="font-bold text-slate-900">
                            {formatCurrency(availableToSpend)}
                        </p>
                        <p className="text-xs text-slate-500">
                            Disponível para gastar
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600">
                        <CalendarDays size={18} />
                    </div>

                    <div>
                        <p className="font-bold text-slate-900">
                            {remainingDays} dias
                        </p>
                        <p className="text-xs text-slate-500">
                            Restantes no mês
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-600">
                        <ArrowDownRight size={18} />
                    </div>

                    <div>
                        <p className="font-bold text-slate-900">
                            {formatCurrency(dailyAverage)}
                        </p>
                        <p className="text-xs text-slate-500">
                            Média de gastos por dia
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-rose-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-rose-600">
                        <Target size={18} />
                    </div>

                    <div>
                        <p className="font-bold text-slate-900">
                            {activeGoals} de {totalGoals}
                        </p>
                        <p className="text-xs text-slate-500">
                            Objetivos em andamento
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}