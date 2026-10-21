import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Transaction } from "../types/report.types";
import { currency, getCategoryColor } from "../utils/report.utils";

type ReportTransactionsProps = {
    transactions: Transaction[];
    search: string;
    onSearchChange: (search: string) => void;
    transactionType: string;
    onTransactionTypeChange: (type: string) => void;
    categoryFilter: string;
    onCategoryFilterChange: (category: string) => void;
    page: number;
    onPageChange: (page: number) => void;
    pageSize?: number;
};

export function ReportTransactions({
    transactions,
    search,
    onSearchChange,
    transactionType,
    onTransactionTypeChange,
    categoryFilter,
    onCategoryFilterChange,
    page,
    onPageChange,
    pageSize = 5,
}: ReportTransactionsProps) {
    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.description.toLowerCase().includes(search.toLowerCase()) ||
            transaction.category.toLowerCase().includes(search.toLowerCase()) ||
            transaction.account.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            transactionType === "Todas" || transaction.type === transactionType;

        const matchesCategory =
            categoryFilter === "Todas" || transaction.category === categoryFilter;

        return matchesSearch && matchesType && matchesCategory;
    });

    const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + pageSize);

    const categories = Array.from(
        new Set(transactions.map((transaction) => transaction.category))
    );

    return (
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Transações do período</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Consulte e filtre as movimentações financeiras.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative min-w-0 sm:w-64">
                            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => onSearchChange(event.target.value)}
                                placeholder="Buscar transação..."
                                aria-label="Buscar transação"
                                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500"
                            />
                        </div>

                        <select
                            value={transactionType}
                            onChange={(event) => onTransactionTypeChange(event.target.value)}
                            aria-label="Filtrar tipo de transação"
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="Todas">Todos os tipos</option>
                            <option value="Entrada">Entradas</option>
                            <option value="Saída">Saídas</option>
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={(event) => onCategoryFilterChange(event.target.value)}
                            aria-label="Filtrar categoria das transações"
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="Todas">Todas as categorias</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3 font-medium">Data</th>
                            <th className="px-5 py-3 font-medium">Descrição</th>
                            <th className="px-5 py-3 font-medium">Categoria</th>
                            <th className="px-5 py-3 font-medium">Conta</th>
                            <th className="px-5 py-3 text-right font-medium">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {paginatedTransactions.map((transaction) => (
                            <tr key={transaction.id} className="transition hover:bg-slate-50">
                                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">{transaction.date}</td>
                                <td className="px-5 py-4 text-sm font-medium text-slate-800">{transaction.description}</td>
                                <td className="px-5 py-4">
                                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                                        {transaction.category}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-600">{transaction.account}</td>
                                <td className={`whitespace-nowrap px-5 py-4 text-right text-sm font-semibold ${transaction.type === "Entrada" ? "text-emerald-600" : "text-slate-800"}`}>
                                    {transaction.type === "Entrada" ? "+" : "-"}{currency(transaction.amount)}
                                </td>
                            </tr>
                        ))}

                        {paginatedTransactions.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                                    Nenhuma transação encontrada para os filtros selecionados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                    {filteredTransactions.length === 0
                        ? "Nenhuma transação"
                        : `Mostrando ${startIndex + 1}–${Math.min(startIndex + pageSize, filteredTransactions.length)} de ${filteredTransactions.length} transações`}
                </p>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage <= 1}
                        aria-label="Página anterior"
                        className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <span className="px-2 text-sm text-slate-600">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage >= totalPages}
                        aria-label="Próxima página"
                        className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}