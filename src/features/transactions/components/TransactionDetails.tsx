import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    CalendarDays,
    CreditCard,
    DollarSign,
    Edit3,
    FileText,
    Tag,
    Trash2,
    Utensils,
    X,
} from "lucide-react"

import type { Transaction } from "../types/transaction.types"

type TransactionDetailsProps = {
    transaction: Transaction
    onClose: () => void
}

export function TransactionDetails({
    transaction,
    onClose,
}: TransactionDetailsProps) {
    const isIncome = transaction.type === "Entrada"
    const isTransfer = transaction.type === "Transferência"

    const isTransferReceived =
        isTransfer &&
        transaction.transfer?.destinationAccount.name === transaction.account

    const iconBackgroundClassName = isIncome
        ? "bg-emerald-50"
        : isTransfer
            ? "bg-violet-50"
            : "bg-orange-50"

    const iconClassName = isIncome
        ? "text-emerald-600"
        : isTransfer
            ? "text-violet-600"
            : "text-orange-500"

    const amountClassName = isIncome
        ? "text-emerald-600"
        : isTransfer
            ? "text-violet-600"
            : "text-red-500"

    const amountPrefix = isIncome || isTransferReceived ? "+ " : "- "

    return (
        <div className="h-full overflow-y-auto p-6">
            <div className="mb-7 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                    Detalhes da transação
                </h2>

                <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700">
                    <X size={18} />
                </button>
            </div>

            <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${iconBackgroundClassName}`}>
                {isIncome ? (
                    <DollarSign size={25} className={iconClassName} />
                ) : isTransfer ? (
                    <ArrowLeftRight size={25} className={iconClassName} />
                ) : (
                    <Utensils size={25} className={iconClassName} />
                )}
            </div>

            <h3 className="text-xl font-semibold text-slate-900">
                {transaction.description}
            </h3>

            {transaction.observation && (
                <p className="mt-1 text-sm text-slate-500">
                    {transaction.observation}
                </p>
            )}

            <p className={`mt-4 text-2xl font-bold ${amountClassName}`}>
                {amountPrefix}
                {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(transaction.amount)}
            </p>

            <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                • {transaction.status}
            </span>

            <div className="my-6 border-t border-slate-200" />

            <div className="space-y-5">
                <DetailItem
                    icon={<CalendarDays size={18} />}
                    label="Data"
                    value={`${transaction.date} - ${transaction.time}`}
                />

                {isTransfer && transaction.transfer ? (
                    <>
                        <DetailItem
                            icon={<ArrowUp size={18} />}
                            label="Origem"
                            value={transaction.transfer.sourceAccount.name}
                        />

                        <DetailItem
                            icon={<ArrowDown size={18} />}
                            label="Destino"
                            value={transaction.transfer.destinationAccount.name}
                        />
                    </>
                ) : (
                    <>
                        <DetailItem
                            icon={<Tag size={18} />}
                            label="Categoria"
                            value={transaction.category}
                        />

                        <DetailItem
                            icon={<CreditCard size={18} />}
                            label="Conta / Cartão"
                            value={
                                transaction.accountLastFour
                                    ? `${transaction.account} •••• ${transaction.accountLastFour}`
                                    : transaction.account
                            }
                        />
                    </>
                )}

                <DetailItem
                    icon={
                        isTransfer ? (
                            <ArrowLeftRight size={18} />
                        ) : isIncome ? (
                            <ArrowDown size={18} />
                        ) : (
                            <ArrowUp size={18} />
                        )
                    }
                    label="Tipo"
                    value={transaction.type}
                />

                <DetailItem
                    icon={<CreditCard size={18} />}
                    label="Método de pagamento"
                    value={transaction.paymentMethod}
                />

                {!isTransfer && (
                    <DetailItem
                        icon={<FileText size={18} />}
                        label="Observação"
                        value={transaction.observation || "—"}
                    />
                )}
            </div>

            <div className="mt-8 space-y-2">
                <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700">
                    <Edit3 size={16} />
                    Editar
                </button>

                <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
                    <Trash2 size={16} />
                    Excluir
                </button>
            </div>
        </div>
    )
}

function DetailItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-slate-400">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs text-slate-400">
                    {label}
                </p>

                <p className="mt-1 text-sm text-slate-700">
                    {value}
                </p>
            </div>
        </div>
    )
}