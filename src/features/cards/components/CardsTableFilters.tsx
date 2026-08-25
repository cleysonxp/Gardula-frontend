import { Search } from "lucide-react"

type CardsTableFiltersProps = {
    search: string
    onSearchChange: (value: string) => void
}

export function CardsTableFilters({
    search,
    onSearchChange,
}: CardsTableFiltersProps) {
    return (
        <div className="flex gap-2">
            <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:border-violet-300"
            >
                Todos os cartões
            </button>

            <div className="relative">
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                    type="text"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Buscar cartão..."
                    className="w-52 rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />
            </div>
        </div>
    )
}