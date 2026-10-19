import {
    CalendarDays,
    Check,
    ChevronDown,
    Clock3,
    Ellipsis,
    Filter,
    Search,
} from "lucide-react";

import type {
    RecurringItem,
    RecurringStatus,
    RecurringType,
} from "../types/RecurringItem";

type RecurringListProps = {
    items: RecurringItem[];
    filteredItems: RecurringItem[];
    search: string;
    typeFilter: "Todas" | RecurringType;
    statusFilter: "Todos" | RecurringStatus;
    showFilters: boolean;
    onSearchChange: (value: string) => void;
    onTypeFilterChange: (value: "Todas" | RecurringType) => void;
    onStatusFilterChange: (value: "Todos" | RecurringStatus) => void;
    onToggleFilters: () => void;
    onClearFilters: () => void;
    onToggleStatus: (id: number) => void;
    onEdit: (item: RecurringItem) => void;
    formatCurrency: (value: number) => string;
};

export function RecurringList({
    items,
    filteredItems,
    search,
    typeFilter,
    statusFilter,
    showFilters,
    onSearchChange,
    onTypeFilterChange,
    onStatusFilterChange,
    onToggleFilters,
    onClearFilters,
    onToggleStatus,
    onEdit,
    formatCurrency,
}: RecurringListProps) {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Todas as recorrências
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Gerencie seus pagamentos e recebimentos programados.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onToggleFilters}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${showFilters
                                ? "border-violet-200 bg-violet-50 text-violet-700"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        <Filter size={16} />
                        Filtros
                        <ChevronDown
                            size={15}
                            className={`transition ${showFilters ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={17}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            value={search}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Buscar por nome ou categoria..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                        />
                    </div>

                    <select
                        value={typeFilter}
                        onChange={(event) =>
                            onTypeFilterChange(event.target.value as "Todas" | RecurringType)
                        }
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                    >
                        <option value="Todas">Todos os tipos</option>
                        <option value="Recebimento">Recebimentos</option>
                        <option value="Pagamento">Pagamentos</option>
                    </select>
                </div>

                {showFilters && (
                    <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center">
                        <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-slate-600">
                            Status
                            <select
                                value={statusFilter}
                                onChange={(event) =>
                                    onStatusFilterChange(
                                        event.target.value as "Todos" | RecurringStatus,
                                    )
                                }
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-violet-300"
                            >
                                <option value="Todos">Todos os status</option>
                                <option value="Ativa">Ativas</option>
                                <option value="Pausada">Pausadas</option>
                            </select>
                        </label>

                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={onClearFilters}
                                className="rounded-lg px-3 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-100"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Descrição
                            </th>
                            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Categoria
                            </th>
                            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Valor
                            </th>
                            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Vencimento
                            </th>
                            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Frequência
                            </th>
                            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Status
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredItems.map((item) => (
                            <tr key={item.id} className="transition hover:bg-slate-50/70">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${item.color}`}>
                                            {item.initials}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {item.name}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                {item.paymentMethod}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-4">
                                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                                        {item.category}
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <span className={`text-sm font-semibold ${item.type === "Recebimento" ? "text-emerald-600" : "text-slate-800"}`}>
                                        {formatCurrency(item.amount)}
                                    </span>
                                    <p className="mt-1 text-xs text-slate-400">{item.type}</p>
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <CalendarDays size={15} className="text-slate-400" />
                                        Dia {String(item.dueDay).padStart(2, "0")}
                                    </div>
                                </td>

                                <td className="px-4 py-4">
                                    <span className="text-sm text-slate-600">
                                        {item.frequency}
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${item.status === "Ativa" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${item.status === "Ativa" ? "bg-emerald-500" : "bg-amber-500"}`} />
                                        {item.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            type="button"
                                            onClick={() => onToggleStatus(item.id)}
                                            title={item.status === "Ativa" ? "Pausar recorrência" : "Ativar recorrência"}
                                            aria-label={item.status === "Ativa" ? "Pausar recorrência" : "Ativar recorrência"}
                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-700"
                                        >
                                            {item.status === "Ativa" ? <Clock3 size={17} /> : <Check size={17} />}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onEdit(item)}
                                            title="Editar recorrência"
                                            aria-label={`Editar ${item.name}`}
                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                        >
                                            <Ellipsis size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-14 text-center">
                                    <div className="mx-auto flex max-w-sm flex-col items-center">
                                        <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">
                                            <Search size={22} />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700">
                                            Nenhuma recorrência encontrada
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Tente alterar os filtros ou a busca.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-500">
                    Exibindo{" "}
                    <span className="font-semibold text-slate-700">
                        {filteredItems.length}
                    </span>{" "}
                    de{" "}
                    <span className="font-semibold text-slate-700">
                        {items.length}
                    </span>{" "}
                    recorrências
                </p>
                <p className="text-xs text-slate-400">
                    Valores demonstrativos para visualização.
                </p>
            </div>
        </section>
    );
}
