import { CalendarDays, Search } from "lucide-react"

import { FilterButton } from "./FilterButton"

type TransactionFiltersProps = {
    search: string
    onSearchChange: (value: string) => void
}

export function TransactionFilters({
    search,
    onSearchChange,
}: TransactionFiltersProps) {
    return (
        <div className="border-b border-slate-200 p-4">
            <div className="flex flex-wrap items-center gap-3">
                <FilterButton
                    icon={<CalendarDays size={16} />}
                    label="01/08/2026 - 31/08/2026"
                />

                <FilterButton
                    label="Categoria: Todas"
                />

                <FilterButton
                    label="Conta: Todas"
                />

                <FilterButton
                    label="Cartão: Todos"
                />

                <FilterButton
                    label="Tipo: Todos"
                />

                <div className="relative ml-auto">
                    <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Buscar descrição..."
                        className="w-52 rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    />
                </div>
            </div>
        </div>
    )
}