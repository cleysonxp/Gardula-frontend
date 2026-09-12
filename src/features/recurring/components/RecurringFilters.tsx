import { Search, ChevronDown, List, Grid2X2 } from "lucide-react"

type RecurringFiltersProps = {
    search: string
    onSearchChange: (value: string) => void
    typeFilter: string
    onTypeChange: (value: string) => void
    accountFilter: string
    onAccountChange: (value: string) => void
    sortOrder: string
    onSortChange: (value: string) => void
    viewMode: "list" | "grid"
    onViewModeChange: (value: "list" | "grid") => void
}

export function RecurringFilters({
    search,
    onSearchChange,
    typeFilter,
    onTypeChange,
    accountFilter,
    onAccountChange,
    sortOrder,
    onSortChange,
    viewMode,
    onViewModeChange,
}: RecurringFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] flex-1">
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                    type="text"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Buscar recorrência..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />
            </div>

            <div className="relative">
                <select
                    value={typeFilter}
                    onChange={(event) => onTypeChange(event.target.value)}
                    className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >
                    <option value="all">Todos os tipos</option>
                    <option value="income">Recebimentos</option>
                    <option value="expense">Pagamentos</option>
                </select>

                <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="relative">
                <select
                    value={accountFilter}
                    onChange={(event) => onAccountChange(event.target.value)}
                    className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >
                    <option value="all">Todas as contas</option>
                    <option value="Nubank">Nubank</option>
                    <option value="Itaú">Itaú</option>
                    <option value="Cartão Nubank">Cartão Nubank</option>
                </select>

                <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="relative">
                <select
                    value={sortOrder}
                    onChange={(event) => onSortChange(event.target.value)}
                    className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >
                    <option value="next">Próximo vencimento</option>
                    <option value="description">Descrição</option>
                    <option value="amount">Valor</option>
                </select>

                <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="flex h-10 overflow-hidden rounded-lg border border-slate-200 bg-white">
                <button
                    type="button"
                    onClick={() => onViewModeChange("list")}
                    className={`flex w-10 items-center justify-center transition ${viewMode === "list" ? "bg-violet-600 text-white" : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"}`}
                    aria-label="Visualização em lista"
                >
                    <List size={17} />
                </button>

                <button
                    type="button"
                    onClick={() => onViewModeChange("grid")}
                    className={`flex w-10 items-center justify-center transition ${viewMode === "grid" ? "bg-violet-600 text-white" : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"}`}
                    aria-label="Visualização em grade"
                >
                    <Grid2X2 size={16} />
                </button>
            </div>
        </div>
    )
}