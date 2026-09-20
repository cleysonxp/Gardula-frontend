import { Eye } from "lucide-react"
import { useMemo, useState } from "react"

import type {
    Card,
    CreditCardInvoice,
} from "../types/card.types"

import { CardTableRow } from "./CardTableRow"
import { CardsTableFilters } from "./CardsTableFilters"

import { TransactionPagination } from "@/features/transactions/components/TransactionPagination"

type CardsTableProps = {
    cards: Card[]
    invoices: CreditCardInvoice[]
    onEditCard?: (card: Card) => void
    onMoreCard?: (card: Card) => void
    onViewInvoice?: (
        cardId: number,
        invoiceId: number,
    ) => void
}

const PAGE_SIZE = 15

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("pt-BR").format(
        new Date(date),
    )
}

function getInvoiceStatusLabel(status: number) {
    switch (status) {
        case 1:
            return "Aberta"

        case 2:
            return "Paga"

        case 3:
            return "Atrasada"

        default:
            return "Desconhecida"
    }
}

function getInvoiceStatusClasses(status: number) {
    switch (status) {
        case 2:
            return "bg-emerald-50 text-emerald-600"

        case 3:
            return "bg-red-50 text-red-600"

        default:
            return "bg-amber-50 text-amber-600"
    }
}

function isCurrentInvoice(
    invoice: CreditCardInvoice,
) {
    const now = new Date()

    const startDate = new Date(
        invoice.startDate,
    )

    const dueDate = new Date(
        invoice.dueDate,
    )

    return (
        now >= startDate &&
        now <= dueDate
    )
}

export function CardsTable({
    cards,
    invoices,
    onEditCard,
    onMoreCard,
    onViewInvoice,
}: CardsTableProps) {
    const [search, setSearch] = useState("")

    const [activeTab, setActiveTab] =
        useState<"invoices" | "cards">(
            "invoices",
        )

    const [currentPage, setCurrentPage] =
        useState(1)

    const filteredCards = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase()

        if (!normalizedSearch) {
            return cards
        }

        return cards.filter((card) =>
            card.name
                .toLowerCase()
                .includes(
                    normalizedSearch,
                ),
        )
    }, [cards, search])

    const filteredInvoices = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase()

        if (!normalizedSearch) {
            return invoices
        }

        return invoices.filter(
            (invoice) => {
                const card = cards.find(
                    (item) =>
                        item.id ===
                        invoice.cardId,
                )

                return card?.name
                    .toLowerCase()
                    .includes(
                        normalizedSearch,
                    )
            },
        )
    }, [cards, invoices, search])

    const sortedInvoices = useMemo(() => {
        return [...filteredInvoices].sort(
            (a, b) => {
                const aIsCurrent =
                    isCurrentInvoice(a)

                const bIsCurrent =
                    isCurrentInvoice(b)

                if (
                    aIsCurrent &&
                    !bIsCurrent
                ) {
                    return -1
                }

                if (
                    !aIsCurrent &&
                    bIsCurrent
                ) {
                    return 1
                }

                return (
                    new Date(
                        b.dueDate,
                    ).getTime() -
                    new Date(
                        a.dueDate,
                    ).getTime()
                )
            },
        )
    }, [filteredInvoices])

    const totalPages = Math.ceil(
        sortedInvoices.length /
            PAGE_SIZE,
    )

    const safeCurrentPage =
        totalPages === 0
            ? 1
            : Math.min(
                  currentPage,
                  totalPages,
              )

    const paginatedInvoices =
        sortedInvoices.slice(
            (safeCurrentPage - 1) *
                PAGE_SIZE,
            safeCurrentPage *
                PAGE_SIZE,
        )

    const handleSearchChange = (
        value: string,
    ) => {
        setSearch(value)
        setCurrentPage(1)
    }

    const handleTabChange = (
        tab: "invoices" | "cards",
    ) => {
        setActiveTab(tab)

        if (tab === "invoices") {
            setCurrentPage(1)
        }
    }

    return (
        <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="p-5">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-slate-950">
                        Cartões e faturas
                    </h2>

                    <CardsTableFilters
                        search={search}
                        onSearchChange={
                            handleSearchChange
                        }
                    />
                </div>

                <div className="flex items-center gap-6 border-b border-slate-100">
                    <button
                        type="button"
                        onClick={() =>
                            handleTabChange(
                                "invoices",
                            )
                        }
                        className={`border-b-2 px-1 pb-3 text-sm font-medium transition ${
                            activeTab ===
                            "invoices"
                                ? "border-violet-600 text-violet-600"
                                : "border-transparent text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        Faturas
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            handleTabChange(
                                "cards",
                            )
                        }
                        className={`border-b-2 px-1 pb-3 text-sm font-medium transition ${
                            activeTab ===
                            "cards"
                                ? "border-violet-600 text-violet-600"
                                : "border-transparent text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        Cartões
                    </button>
                </div>
            </div>

            {activeTab === "invoices" && (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
                                    <th className="px-5 py-4 font-medium">
                                        Cartão
                                    </th>

                                    <th className="px-3 py-4 font-medium">
                                        Período
                                    </th>

                                    <th className="px-3 py-4 font-medium">
                                        Fechamento
                                    </th>

                                    <th className="px-3 py-4 font-medium">
                                        Vencimento
                                    </th>

                                    <th className="px-3 py-4 font-medium">
                                        Valor
                                    </th>

                                    <th className="px-3 py-4 font-medium">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-right font-medium">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedInvoices.map(
                                    (invoice) => {
                                        const card =
                                            cards.find(
                                                (
                                                    item,
                                                ) =>
                                                    item.id ===
                                                    invoice.cardId,
                                            )

                                        const isCurrent =
                                            isCurrentInvoice(
                                                invoice,
                                            )

                                        return (
                                            <tr
                                                key={
                                                    invoice.id
                                                }
                                                className={`border-b border-slate-100 last:border-0 ${isCurrent ? "bg-violet-50/60" : ""}`}
                                            >
                                                <td className="px-5 py-4">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium text-slate-900">
                                                                {card?.name ??
                                                                    `Cartão #${invoice.cardId}`}
                                                            </p>

                                                            {isCurrent && (
                                                                <span className="inline-flex rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                                                                    Atual
                                                                </span>
                                                            )}
                                                        </div>

                                                        {card && (
                                                            <p className="text-xs text-slate-500">
                                                                ••••{" "}
                                                                {
                                                                    card.lastFourDigits
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-3 py-4 text-slate-600">
                                                    {formatDate(
                                                        invoice.startDate,
                                                    )}{" "}
                                                    -{" "}
                                                    {formatDate(
                                                        invoice.closingDate,
                                                    )}
                                                </td>

                                                <td className="px-3 py-4 text-slate-600">
                                                    {formatDate(
                                                        invoice.closingDate,
                                                    )}
                                                </td>

                                                <td className="px-3 py-4 text-slate-600">
                                                    {formatDate(
                                                        invoice.dueDate,
                                                    )}
                                                </td>

                                                <td className="px-3 py-4 font-medium text-slate-900">
                                                    {formatCurrency(
                                                        invoice.totalAmount,
                                                    )}
                                                </td>

                                                <td className="px-3 py-4">
                                                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getInvoiceStatusClasses(invoice.status)}`}>
                                                        {getInvoiceStatusLabel(
                                                            invoice.status,
                                                        )}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onViewInvoice?.(
                                                                invoice.cardId,
                                                                invoice.id,
                                                            )
                                                        }
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                                                        aria-label="Ver detalhes da fatura"
                                                        title="Ver detalhes"
                                                    >
                                                        <Eye
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    },
                                )}

                                {paginatedInvoices.length ===
                                    0 && (
                                    <tr>
                                        <td
                                            colSpan={
                                                7
                                            }
                                            className="px-5 py-10 text-center text-sm text-slate-500"
                                        >
                                            Nenhuma
                                            fatura
                                            encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <TransactionPagination
                        currentPage={
                            safeCurrentPage
                        }
                        totalPages={
                            totalPages
                        }
                        totalItems={
                            sortedInvoices.length
                        }
                        pageSize={
                            PAGE_SIZE
                        }
                        onPageChange={
                            setCurrentPage
                        }
                        itemLabel="faturas"
                    />
                </>
            )}

            {activeTab === "cards" && (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
                                <th className="px-5 py-4 font-medium">
                                    Cartão
                                </th>

                                <th className="px-3 py-4 font-medium">
                                    Conta vinculada
                                </th>

                                <th className="px-3 py-4 font-medium">
                                    Limite
                                </th>

                                <th className="px-3 py-4 font-medium">
                                    Utilizado
                                </th>

                                <th className="px-3 py-4 font-medium">
                                    Disponível
                                </th>

                                <th className="px-3 py-4 font-medium">
                                    Vencimento
                                </th>

                                <th className="px-3 py-4 font-medium">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right font-medium">
                                    Ações
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCards.map(
                                (card) => (
                                    <CardTableRow
                                        key={
                                            card.id
                                        }
                                        card={card}
                                        onEdit={
                                            onEditCard
                                        }
                                        onMore={
                                            onMoreCard
                                        }
                                    />
                                ),
                            )}

                            {filteredCards.length ===
                                0 && (
                                <tr>
                                    <td
                                        colSpan={
                                            8
                                        }
                                        className="px-5 py-10 text-center text-sm text-slate-500"
                                    >
                                        Nenhum
                                        cartão
                                        encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}