import { useMemo, useState } from "react"

import { RecurringFilters } from "@/features/recurring/components/RecurringFilters"
import { RecurringHeader } from "@/features/recurring/components/RecurringHeader"
import { RecurringSummary } from "@/features/recurring/components/RecurringSummary"
import { RecurringTable } from "@/features/recurring/components/RecurringTable"
import { mockRecurring } from "@/features/recurring/data/mockRecurring"
import type { RecurringItem } from "@/features/recurring/types/recurring"

export function RecurringPage() {
    const [search, setSearch] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [accountFilter, setAccountFilter] = useState("all")
    const [sortOrder, setSortOrder] = useState("next")
    const [viewMode, setViewMode] = useState<"list" | "grid">("list")

    const [selectedItem, setSelectedItem] = useState<RecurringItem | null>(
        null,
    )

    const filteredItems = useMemo(() => {
        const result = mockRecurring.filter((item) => {
            const matchesSearch =
                item.description
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.category
                    .toLowerCase()
                    .includes(search.toLowerCase())

            const matchesType =
                typeFilter === "all" ||
                item.type === typeFilter

            const matchesAccount =
                accountFilter === "all" ||
                item.account === accountFilter

            return matchesSearch && matchesType && matchesAccount
        })

        return [...result].sort((a, b) => {
            if (sortOrder === "description") {
                return a.description.localeCompare(b.description)
            }

            if (sortOrder === "amount") {
                return b.amount - a.amount
            }

            return (
                new Date(a.nextDueDate).getTime() -
                new Date(b.nextDueDate).getTime()
            )
        })
    }, [
        search,
        typeFilter,
        accountFilter,
        sortOrder,
    ])

    const totalIncome = mockRecurring
        .filter((item) => item.type === "income")
        .reduce((total, item) => total + item.amount, 0)

    const totalExpenses = mockRecurring
        .filter((item) => item.type === "expense")
        .reduce((total, item) => total + item.amount, 0)

    const nextSevenDays = mockRecurring
        .filter((item) => {
            const date = new Date(item.nextDueDate)
            const today = new Date("2026-09-02T12:00:00")

            const difference =
                (date.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24)

            return difference >= 0 && difference <= 7
        })
        .reduce((total, item) => total + item.amount, 0)

    const activeCount = mockRecurring.filter(
        (item) => item.status === "active",
    ).length

    const pausedCount = mockRecurring.filter(
        (item) => item.status === "paused",
    ).length

    const incomeCount = mockRecurring.filter(
        (item) => item.type === "income",
    ).length

    const expenseCount = mockRecurring.filter(
        (item) => item.type === "expense",
    ).length

    function handleNewRecurring() {
        console.log("Nova recorrência")
    }

    function handleDetails(item: RecurringItem) {
        setSelectedItem(item)
    }

    return (
        <div className="min-h-screen bg-[#F7F7FC]">
            <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">
                <RecurringHeader
                    onNewRecurring={handleNewRecurring}
                />

                <RecurringSummary
                    totalIncome={totalIncome}
                    totalExpenses={totalExpenses}
                    nextSevenDays={nextSevenDays}
                    totalRecurring={mockRecurring.length}
                    activeCount={activeCount}
                    pausedCount={pausedCount}
                />

                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-5">
                        <div className="flex items-center gap-7 overflow-x-auto">
                            <button
                                type="button"
                                className="relative shrink-0 py-4 text-sm font-semibold text-violet-600"
                            >
                                Todas

                                <span className="ml-2 rounded-full bg-violet-100 px-2 py-0.5 text-[11px] text-violet-700">
                                    {mockRecurring.length}
                                </span>

                                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-violet-600" />
                            </button>

                            <button
                                type="button"
                                className="shrink-0 py-4 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                            >
                                Recebimentos

                                <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                                    {incomeCount}
                                </span>
                            </button>

                            <button
                                type="button"
                                className="shrink-0 py-4 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                            >
                                Pagamentos

                                <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                                    {expenseCount}
                                </span>
                            </button>

                            <button
                                type="button"
                                className="shrink-0 py-4 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                            >
                                Pausadas

                                <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                                    {pausedCount}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="border-b border-slate-200 bg-slate-50/40 px-5 py-4">
                        <RecurringFilters
                            search={search}
                            onSearchChange={setSearch}
                            typeFilter={typeFilter}
                            onTypeChange={setTypeFilter}
                            accountFilter={accountFilter}
                            onAccountChange={setAccountFilter}
                            sortOrder={sortOrder}
                            onSortChange={setSortOrder}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                        />
                    </div>

                    <div className="bg-white">
                        {filteredItems.length > 0 ? (
                            <RecurringTable
                                items={filteredItems}
                                onDetails={handleDetails}
                            />
                        ) : (
                            <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Nenhuma recorrência encontrada
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tente alterar os filtros ou a busca.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-200 bg-slate-50/40 px-5 py-4">
                        <p className="text-sm text-slate-500">
                            Mostrando {filteredItems.length} de{" "}
                            {mockRecurring.length} recorrências
                        </p>
                    </div>
                </section>
        </section>

            {
        selectedItem && (
            <div
                className="fixed inset-0 z-50 flex justify-end bg-slate-950/20"
                onClick={() => setSelectedItem(null)}
            >
                <aside
                    className="h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="border-b border-slate-100 px-6 py-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Detalhes
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-950">
                                    {selectedItem.description}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedItem(null)}
                                className="rounded-lg px-2 py-1 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                aria-label="Fechar detalhes"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6 p-6">
                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Valor
                            </p>

                            <p className={`mt-1 text-3xl font-bold ${selectedItem.type === "income" ? "text-emerald-600" : "text-red-500"}`}>
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(selectedItem.amount)}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-xs text-slate-400">
                                    Tipo
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {selectedItem.type === "income"
                                        ? "Recebimento"
                                        : "Pagamento"}
                                </p>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-xs text-slate-400">
                                    Frequência
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {selectedItem.frequency === "monthly"
                                        ? "Mensal"
                                        : "Anual"}
                                </p>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-xs text-slate-400">
                                    Categoria
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {selectedItem.category}
                                </p>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-xs text-slate-400">
                                    Status
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {selectedItem.status === "active"
                                        ? "Ativa"
                                        : "Pausada"}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4">
                            <p className="text-xs font-medium text-slate-400">
                                Conta
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                                {selectedItem.account}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                {selectedItem.accountType}
                            </p>
                        </div>
                    </div>

                    <div className="sticky bottom-0 border-t border-slate-100 bg-white p-5">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        )
    }
        </div >
    )
}