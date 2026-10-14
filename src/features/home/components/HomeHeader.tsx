import { CalendarDays, ChevronRight } from "lucide-react"

export function HomeHeader() {
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

            <button
                type="button"
                className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"
            >
                <CalendarDays size={17} />
                Outubro 2026
                <ChevronRight size={16} />
            </button>
        </header>
    )
}