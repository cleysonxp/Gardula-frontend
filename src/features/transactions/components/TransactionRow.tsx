import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    Eye,
    Pencil,
    Trash2,
    Utensils,
    WalletCards,
} from "lucide-react"

import type { Transaction } from "../types/transaction.types"

type TransactionRowProps = {
    transaction: Transaction
    onSelect: () => void
    onEdit?: () => void
    onDelete?: () => void
}

const accountColorMap: Record<string, string> = {
    red: "#ef4444",
    violet: "#8b5cf6",
}

export function TransactionRow({
    transaction,
    onSelect,
    onEdit,
    onDelete,
}: TransactionRowProps) {
    const isIncome = transaction.type === "Entrada"
    const isTransfer = transaction.type === "Transferência"

    const isTransferReceived =
        isTransfer &&
        transaction.description.toLowerCase().includes("recebida")

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
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {transaction.date}
                    </span>
                    <span className="mt-0.5 text-xs text-slate-400">
                        {transaction.time}
                    </span>
                </div>
            </td>

            <td className="px-3 py-4 align-middle">
                <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${typeClassName}`}>
                        {typeIcon}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-700">
                            {transaction.description}
                        </p>

                        {transaction.observation && (
                            <p className="mt-0.5 truncate text-xs text-slate-400">
                                {transaction.observation}
                            </p>
                        )}
                    </div>
                </div>
            </td>

            <td className="px-3 py-4 align-middle">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        {categoryIcon}
                    </div>

                    <span className="text-sm text-slate-600">
                        {transaction.category}
                    </span>
                </div>
            </td>

            <td className="px-3 py-4 align-middle">
                <div className="flex items-center gap-2.5">
                    <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: accountColor }}
                    >
                        {accountInitials}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm text-slate-600">
                            {transaction.account}
                        </p>

                        {transaction.accountLastFour && (
                            <p className="text-xs text-slate-400">
                                •••• {transaction.accountLastFour}
                            </p>
                        )}
                    </div>
                </div>
            </td>

            <td className="px-3 py-4 align-middle">
                <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${typeClassName}`}>
                        {typeIcon}
                    </div>

                    <span className="text-sm text-slate-600">
                        {transaction.type}
                    </span>
                </div>
            </td>

            <td className={`px-3 py-4 text-right align-middle text-sm font-semibold ${amountClassName}`}>
                {amountPrefix}
                {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </td>

            <td className="px-5 py-4 text-right align-middle">
                <div className="flex items-center justify-end gap-1">
                    <button
                        type="button"
                        onClick={onSelect}
                        title="Ver detalhes"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
                    >
                        <Eye className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={onEdit}
                        title="Editar transação"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        title="Excluir transação"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}