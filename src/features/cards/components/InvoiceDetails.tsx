import {
    ArrowLeft,
    CalendarDays,
    CircleDollarSign,
    CreditCard,
} from "lucide-react"

import type { CreditCardInvoiceDetail } from "../types/card.types"

type InvoiceDetailsProps = {
    invoice: CreditCardInvoiceDetail | null
    isLoading?: boolean
    onClose: () => void
    onPay?: () => void
    cardName?: string
    lastFourDigits?: string
}

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

export function InvoiceDetails({
    invoice,
    isLoading,
    onClose,
    onPay,
    cardName,
    lastFourDigits,
}: InvoiceDetailsProps) {
    return (
        <aside className="sticky top-0 hidden h-screen w-[400px] shrink-0 self-start border-l border-slate-200 bg-white xl:flex xl:flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-7">
                <button
                    type="button"
                    onClick={onClose}
                    className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-violet-600"
                >
                    <ArrowLeft size={17} />
                    Voltar
                </button>

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <p className="text-sm text-slate-500">
                            Carregando fatura...
                        </p>
                    </div>
                )}

                {!isLoading && invoice && (
                    <>
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <h2 className="text-lg font-semibold text-slate-950">
                                    Detalhes da fatura
                                </h2>

                                {cardName && (
                                    <p className="mt-1 truncate text-sm text-slate-500">
                                        {cardName}
                                        {lastFourDigits &&
                                            ` •••• ${lastFourDigits}`}
                                    </p>
                                )}
                            </div>

                            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getInvoiceStatusClasses(invoice.status)}`}>
                                {getInvoiceStatusLabel(
                                    invoice.status,
                                )}
                            </span>
                        </div>

                        <div className="border-b border-slate-200 pb-6">
                            <p className="text-sm text-slate-500">
                                Total da fatura
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-950">
                                {formatCurrency(
                                    invoice.totalAmount,
                                )}
                            </p>
                        </div>

                        <div className="border-b border-slate-200 py-6">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg border border-slate-200 p-4">
                                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                                        <CalendarDays size={16} />

                                        <span className="text-xs">
                                            Fechamento
                                        </span>
                                    </div>

                                    <p className="text-sm font-medium text-slate-900">
                                        {formatDate(
                                            invoice.closingDate,
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-lg border border-slate-200 p-4">
                                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                                        <CircleDollarSign size={16} />

                                        <span className="text-xs">
                                            Vencimento
                                        </span>
                                    </div>

                                    <p className="text-sm font-medium text-slate-900">
                                        {formatDate(
                                            invoice.dueDate,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="py-6">
                            <div className="mb-5">
                                <h3 className="text-base font-bold text-slate-950">
                                    Compras
                                </h3>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    {invoice.transactions.length}{" "}
                                    {invoice.transactions.length ===
                                        1
                                        ? "transação"
                                        : "transações"}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {invoice.transactions.map(
                                    (transaction) => (
                                        <div
                                            key={
                                                transaction.id
                                            }
                                            className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                                    <CreditCard
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium text-slate-900">
                                                        {
                                                            transaction.description
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {formatDate(
                                                            transaction.date,
                                                        )}

                                                        {transaction.installmentNumber &&
                                                            transaction.totalInstallments &&
                                                            ` • ${transaction.installmentNumber}/${transaction.totalInstallments}`}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="ml-4 shrink-0 text-sm font-medium text-slate-900">
                                                {formatCurrency(
                                                    transaction.amount,
                                                )}
                                            </p>
                                        </div>
                                    ),
                                )}

                                {invoice.transactions.length ===
                                    0 && (
                                        <div className="rounded-lg bg-slate-50 p-6 text-center">
                                            <p className="text-sm text-slate-500">
                                                Nenhuma compra
                                                nesta fatura.
                                            </p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {!isLoading && invoice && (
                <div className="shrink-0 border-t border-slate-200 px-6 py-5">
                    {invoice.status === 1 && (
                        <button
                            type="button"
                            onClick={onPay}
                            className="flex w-full items-center justify-center rounded-lg bg-violet-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
                        >
                            Pagar fatura
                        </button>
                    )}
                </div>
            )}
        </aside>
    )
}