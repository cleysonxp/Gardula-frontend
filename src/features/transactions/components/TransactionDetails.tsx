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

import type { ReactNode } from "react"

import type { Transaction } from "../types/transaction.types"

type TransactionDetailsProps = {
    transaction: Transaction
    onClose: () => void
    onEdit: (transactionId: number) => void
    onDelete: (transactionId: number) => void
}

export function TransactionDetails({
    transaction,
    onClose,
    onEdit,
    onDelete,
}: TransactionDetailsProps) {
    const isIncome = transaction.type === "Entrada"
    const isTransfer = transaction.type === "Transferência"

    const isTransferReceived =
        isTransfer &&
        transaction.transfer?.destinationAccount.name ===
        transaction.account

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

    const amountPrefix =
        isIncome || isTransferReceived
            ? "+ "
            : "- "

    const formattedAmount = new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL",
        },
    ).format(transaction.amount)

    return (
        <div className="flex h-full flex-col bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Detalhes
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-400">
                        Informações da transação
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                    aria-label="Fechar detalhes"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="flex flex-col items-center text-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBackgroundClassName}`}>
                        {isIncome ? (
                            <DollarSign
                                size={28}
                                className={iconClassName}
                            />
                        ) : isTransfer ? (
                            <ArrowLeftRight
                                size={28}
                                className={iconClassName}
                            />
                        ) : (
                            <Utensils
                                size={28}
                                className={iconClassName}
                            />
                        )}
                    </div>

                    <h3 className="mt-4 max-w-full break-words text-lg font-semibold text-slate-900">
                        {transaction.description}
                    </h3>

                    <p className={`mt-3 text-3xl font-bold tracking-tight ${amountClassName}`}>
                        {amountPrefix}
                        {formattedAmount}
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {transaction.status}
                    </span>
                </div>

                <div className="my-7 border-t border-slate-100" />

                <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Informações
                    </p>

                    <div className="space-y-4">
                        <DetailItem
                            icon={<CalendarDays size={17} />}
                            label="Data"
                            value={`${transaction.date} - ${transaction.time}`}
                        />

                        {isTransfer && transaction.transfer ? (
                            <>
                                <DetailItem
                                    icon={<ArrowUp size={17} />}
                                    label="Origem"
                                    value={
                                        transaction.transfer
                                            .sourceAccount
                                            .name
                                    }
                                />

                                <DetailItem
                                    icon={<ArrowDown size={17} />}
                                    label="Destino"
                                    value={
                                        transaction.transfer
                                            .destinationAccount
                                            .name
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <DetailItem
                                    icon={<Tag size={17} />}
                                    label="Categoria"
                                    value={
                                        transaction.category
                                    }
                                />

                                <DetailItem
                                    icon={<CreditCard size={17} />}
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
                                    <ArrowLeftRight size={17} />
                                ) : isIncome ? (
                                    <ArrowDown size={17} />
                                ) : (
                                    <ArrowUp size={17} />
                                )
                            }
                            label="Tipo"
                            value={transaction.type}
                        />

                        <DetailItem
                            icon={<CreditCard size={17} />}
                            label="Método de pagamento"
                            value={transaction.paymentMethod}
                        />

                        {!isTransfer && (
                            <DetailItem
                                icon={<FileText size={17} />}
                                label="Observação"
                                value={
                                    transaction.observation ||
                                    "Nenhuma observação"
                                }
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100 bg-white px-6 py-4">
                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={() => onEdit(transaction.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                    >
                        <Edit3 size={16} />
                        Editar
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(transaction.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                        <Trash2 size={16} />
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}

function DetailItem({
    icon,
    label,
    value,
}: {
    icon: ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-400">
                    {label}
                </p>

                <p className="mt-0.5 break-words text-sm font-medium text-slate-700">
                    {value}
                </p>
            </div>
        </div>
    )
}