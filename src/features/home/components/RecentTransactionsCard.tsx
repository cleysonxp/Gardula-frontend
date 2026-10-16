import {
    ArrowRight,
    ArrowLeftRight,
    Car,
    CircleDollarSign,
    CreditCard,
    Utensils,
    Wallet,
} from "lucide-react"

import type { TransactionListResponse } from "@/features/home/types/home.types"

interface RecentTransactionsCardProps {
    transactions: TransactionListResponse[]
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

export function RecentTransactionsCard({
    transactions,
}: RecentTransactionsCardProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <CircleDollarSign size={20} />
                    </div>

                    <h2 className="text-base font-bold text-slate-950">
                        Transações recentes
                    </h2>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    Ver todas
                    <ArrowRight size={14} />
                </button>
            </div>

            {transactions.length === 0 ? (
                <div className="flex min-h-40 items-center justify-center">
                    <p className="text-sm text-slate-500">
                        Nenhuma transação neste período.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {transactions.map((transaction) => {
                        const isIncome = transaction.typeName === "Income"
                        const isTransfer = transaction.typeName === "Transfer"
                        const isCreditCard = transaction.paymentMethodName === "CreditCard"

                        const Icon = isTransfer
                            ? ArrowLeftRight
                            : isIncome
                              ? CircleDollarSign
                              : isCreditCard
                                ? CreditCard
                                : transaction.category?.name === "Alimentação"
                                  ? Utensils
                                  : transaction.category?.name === "Transporte"
                                    ? Car
                                    : Wallet

                        const description = transaction.category?.name
                            ?? transaction.card?.name
                            ?? transaction.account?.name
                            ?? transaction.paymentMethodName

                        const amountPrefix = isIncome ? "+" : isTransfer ? "" : "−"

                        return (
                            <div
                                key={transaction.id}
                                className="flex items-center gap-3 py-3.5"
                            >
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                        isIncome
                                            ? "bg-emerald-50 text-emerald-500"
                                            : isTransfer
                                              ? "bg-blue-50 text-blue-500"
                                              : isCreditCard
                                                ? "bg-violet-50 text-violet-500"
                                                : "bg-rose-50 text-rose-500"
                                    }`}
                                >
                                    <Icon size={18} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-slate-800">
                                        {transaction.description}
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {formatDate(transaction.date)} • {description}
                                    </p>
                                </div>

                                <span
                                    className={`whitespace-nowrap text-sm font-bold ${
                                        isIncome
                                            ? "text-emerald-500"
                                            : isTransfer
                                              ? "text-blue-500"
                                              : "text-rose-500"
                                    }`}
                                >
                                    {amountPrefix} {formatCurrency(transaction.amount)}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}