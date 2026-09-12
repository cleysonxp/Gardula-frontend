import { ArrowDown, ArrowUp, CalendarDays, CircleDollarSign } from "lucide-react"

type RecurringSummaryProps = {
    totalIncome: number
    totalExpenses: number
    nextSevenDays: number
    totalRecurring: number
    activeCount: number
    pausedCount: number
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function RecurringSummary({
    totalIncome,
    totalExpenses,
    nextSevenDays,
    totalRecurring,
    activeCount,
    pausedCount,
}: RecurringSummaryProps) {
    return (
        <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                        <ArrowDown size={19} className="text-emerald-600" />
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                        Recebimentos
                    </span>
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                    Total de recebimentos
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-600">
                    {formatCurrency(totalIncome)}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {activeCount} recorrências ativas
                </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                        <ArrowUp size={19} className="text-red-500" />
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                        Pagamentos
                    </span>
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                    Total de pagamentos
                </p>

                <p className="mt-1 text-xl font-bold text-red-500">
                    {formatCurrency(totalExpenses)}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {totalRecurring - 3} recorrências ativas
                </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                        <CalendarDays size={19} className="text-violet-600" />
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                        Próximos 7 dias
                    </span>
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                    Próximos 7 dias
                </p>

                <p className="mt-1 text-xl font-bold text-slate-950">
                    {formatCurrency(nextSevenDays)}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    3 recorrências
                </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                        <CircleDollarSign size={19} className="text-slate-600" />
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                        Cadastro
                    </span>
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                    Total de recorrências
                </p>

                <p className="mt-1 text-xl font-bold text-slate-950">
                    {totalRecurring}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {activeCount} ativas • {pausedCount} pausadas
                </p>
            </div>
        </div>
    )
}