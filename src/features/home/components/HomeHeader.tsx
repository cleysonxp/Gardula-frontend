import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

interface HomeHeaderProps {
    year: number
    month: number
    onPreviousMonth: () => void
    onNextMonth: () => void
    isCurrentMonth: boolean
}

function formatMonth(year: number, month: number): string {
    return new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric",
    }).format(new Date(year, month - 1, 1))
}

export function HomeHeader({
    year,
    month,
    onPreviousMonth,
    onNextMonth,
    isCurrentMonth,
}: HomeHeaderProps) {
    return (
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                    Olá, Cleyson!
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Aqui está o resumo das suas finanças hoje.
                </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <button
                    type="button"
                    onClick={onPreviousMonth}
                    aria-label="Mês anterior"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
                >
                    <ChevronLeft size={17} />
                </button>

                <div className="flex min-w-36 items-center justify-center gap-2 px-1">
                    <CalendarDays size={17} className="text-violet-600" />
                    <span className="text-sm font-semibold capitalize text-slate-700">
                        {formatMonth(year, month)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onNextMonth}
                    disabled={isCurrentMonth}
                    aria-label="Próximo mês"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                    <ChevronRight size={17} />
                </button>
            </div>
        </header>
    )
}