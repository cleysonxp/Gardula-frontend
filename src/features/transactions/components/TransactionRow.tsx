import {
    ArrowDown,
    ArrowUp,
    MoreVertical,
    Utensils,
} from "lucide-react"

import type { Transaction } from "../types/transaction.types"

type TransactionRowProps = {
    transaction: Transaction
    onSelect: () => void
}

export function TransactionRow({
    transaction,
    onSelect,
}: TransactionRowProps) {
    const isIncome = transaction.type === "Entrada"

    return (
        <tr
            className="
                border-b
                border-slate-100
                transition
                hover:bg-slate-50
            "
        >

            {/* Data */}
            <td className="px-5 py-4">

                <p className="text-sm text-slate-700">
                    {transaction.date}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {transaction.time}
                </p>

            </td>

            {/* Descrição */}
            <td className="px-3 py-4">

                <p className="text-sm font-semibold text-slate-900">
                    {transaction.description}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    {transaction.observation}
                </p>

            </td>

            {/* Categoria */}
            <td className="px-3 py-4">

                <div className="flex items-center gap-2">

                    <span
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-orange-500
                            text-white
                        "
                    >
                        <Utensils size={15} />
                    </span>

                    <span className="text-sm text-slate-700">
                        {transaction.category}
                    </span>

                </div>

            </td>

            {/* Conta / Cartão */}
            <td className="px-3 py-4">

                <div className="flex items-center gap-2">

                    <span
                        className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-[10px]
                            font-bold
                            text-white
                            ${
                                transaction.account === "Nubank"
                                    ? "bg-violet-600"
                                    : "bg-blue-600"
                            }
                        `}
                    >
                        {transaction.account === "Nubank"
                            ? "nu"
                            : "Itaú"}
                    </span>

                    <div>

                        <p className="text-sm text-slate-700">
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

            {/* Tipo */}
            <td className="px-3 py-4">

                <span
                    className={`
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        ${
                            isIncome
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                        }
                    `}
                >
                    {isIncome ? (
                        <ArrowDown size={13} />
                    ) : (
                        <ArrowUp size={13} />
                    )}

                    {transaction.type}
                </span>

            </td>

            {/* Valor */}
            <td className="px-3 py-4 text-right">

                <span
                    className={`
                        text-sm
                        font-semibold
                        ${
                            isIncome
                                ? "text-emerald-600"
                                : "text-red-500"
                        }
                    `}
                >
                    {isIncome ? "+ " : "- "}

                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(transaction.amount)}
                </span>

            </td>

            {/* Ações */}
            <td className="px-5 py-4 text-right">

                <button
                    type="button"
                    onClick={onSelect}
                    className="
                        rounded-lg
                        border
                        border-slate-200
                        p-2
                        text-slate-400
                        transition
                        hover:bg-slate-50
                        hover:text-slate-700
                    "
                >
                    <MoreVertical size={17} />
                </button>

            </td>

        </tr>
    )
}