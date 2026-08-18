import {
    CalendarDays,
    ChevronDown,
    Search,
} from "lucide-react"

export function AccountFilters() {
    return (
        <div className="mt-7 space-y-3">

            <div className="grid grid-cols-2 gap-2">

                <button
                    type="button"
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700">
                    Todas

                    <ChevronDown size={15} />
                </button>

                <button
                    type="button"
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700">
                    Categoria

                    <ChevronDown size={15} />
                </button>

            </div>

            <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700">
                Agosto 2026

                <CalendarDays size={15} />
            </button>

            <div className="relative">

                <Search
                    size={17}
                    className=" absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                    type="text"
                    placeholder="Buscar movimentação..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />

            </div>

        </div>
    )
}