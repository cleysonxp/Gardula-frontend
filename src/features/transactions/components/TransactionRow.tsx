import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    MoreVertical,
    Utensils,
    WalletCards,
} from "lucide-react"

import type { Transaction } from "../types/transaction.types"

type TransactionRowProps = {
    transaction: Transaction
    onSelect: () => void
}

const accountColorMap: Record<string, string> = {
    red: "#ef4444",
    violet: "#8b5cf6",
}

export function TransactionRow({ transaction, onSelect }: TransactionRowProps) {
    const isIncome = transaction.type === "Entrada"
    const isTransfer = transaction.type === "Transferência"
    const isTransferReceived = isTransfer && transaction.description.toLowerCase().includes("recebida")

    const typeIcon = isTransfer ? (
        <ArrowLeftRight className="h-4 w-4" />
    ) : isIncome ? (
        <ArrowDown className="h-4 w-4" />
    ) : (
        <ArrowUp className="h-4 w-4" />
    )

    const typeClassName = isIncome
        ? "bg-emerald-50 text-emerald-600"
        : isTransfer
            ? "bg-violet-50 text-violet-600"
            : "bg-red-50 text-red-500"

    const amountClassName = isIncome
        ? "text-emerald-500"
        : isTransfer
            ? "text-violet-600"
            : "text-red-500"

    const amountPrefix = isIncome || isTransferReceived ? "+ " : "- "

    const accountInitials = transaction.account
        ? transaction.account.slice(0, 2).toUpperCase()
        : "—"

    const accountColor = transaction.accountColor
        ? accountColorMap[transaction.accountColor] ?? "#94a3b8"
        : "#94a3b8"

    const categoryIcon = isTransfer ? (
        <ArrowLeftRight className="h-4 w-4" />
    ) : transaction.category !== "—" ? (
        <Utensils className="h-4 w-4" />
    ) : (
        <WalletCards className="h-4 w-4" />
    )

    return (
        <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
            <td className="px-5 py-4 align-middle">
                <div>
                    <p className="text-sm text-slate-700">{transaction.date}</p>
                    <p className="mt-1 text-xs text-slate-400">{transaction.time}</p>
                </div>
            </td>

            <td className="px-3 py-4 align-middle">
                <div>
                    <p className="text-sm font-semibold text-slate-800">
                        {transaction.description}
                    </p>

                    {transaction.observation && (
                        <p className="mt-1 text-xs text-slate-400">
                            {transaction.observation}
                        </p>
                    )}
                </div>
            </td>

            <td className="px-3 py-4 align-middle">
                <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                        {categoryIcon}
                    </span>

                    <span className="text-sm text-slate-600">
                        {transaction.category}
                    </span>
                </div>
            </td>

            <td className="px-3 py-4 align-middle">
                <div className="flex items-center gap-2">
                    <span
                        className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
                        style={{ backgroundColor: accountColor }}
                    >
                        {accountInitials}
                    </span>

                    <div>
                        <p className="text-sm text-slate-700">
                            {transaction.account}
                        </p>

                        {transaction.accountLastFour && (
                            <p className="mt-0.5 text-xs text-slate-400">
                                •••• {transaction.accountLastFour}
                            </p>
                        )}
                    </div>
                </div>
            </td>

            <td className="px-3 py-4 align-middle">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${typeClassName}`}>
                    {typeIcon}
                    {transaction.type}
                </span>
            </td>

            <td className="px-3 py-4 text-right align-middle">
                <span className={`text-sm font-semibold ${amountClassName}`}>
                    {amountPrefix}R$ {transaction.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            </td>

            <td className="px-5 py-4 text-right align-middle">
                <button type="button" onClick={onSelect} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600">
                    <MoreVertical className="h-4 w-4" />
                </button>
            </td>
        </tr>
    )
}