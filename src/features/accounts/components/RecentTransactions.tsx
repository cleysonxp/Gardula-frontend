import { ChevronDown } from "lucide-react"

import type { Transaction } from "@/features/accounts/types/account"

type RecentTransactionsProps = {
    transactions: Transaction[]
    formatCurrency: (value: number) => string
}

export function RecentTransactions({
    transactions,
    formatCurrency,
}: RecentTransactionsProps) {
    return (
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-950">
                    Movimentações recentes
                </h2>

                <button
                    type="button"
                    className="text-sm font-medium text-violet-600 hover:text-violet-700"
                >
                    Ver todas
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm">

                    <thead>
                        <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
                            <th className="px-2 py-3 font-medium">
                                Data
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Descrição
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Conta
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Categoria
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Tipo
                            </th>

                            <th className="px-2 py-3 text-right font-medium">
                                Valor
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="border-b border-slate-100 last:border-0"
                            >
                                <td className="px-2 py-3.5 text-slate-600">
                                    {transaction.date}
                                </td>

                                <td className="px-2 py-3.5 font-medium text-slate-800">
                                    {transaction.description}
                                </td>

                                <td className="px-2 py-3.5 text-slate-600">
                                    {transaction.account}
                                </td>

                                <td className="px-2 py-3.5">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${transaction.categoryColor}`}
                                        />

                                        <span className="text-slate-600">
                                            {transaction.category}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-2 py-3.5">
                                    <span
                                        className={`inline-flex rounded-md px-2 py-1 text-[11px] font-medium
                                            ${transaction.type === "Entrada"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-red-50 text-red-700"
                                            }
                                        `}
                                    >
                                        {transaction.type}
                                    </span>
                                </td>

                                <td
                                    className={`px-2 py-3.5 text-right font-medium
                                        ${transaction.type === "Entrada"
                                            ? "text-emerald-600"
                                            : "text-red-600"
                                        }
                                    `}
                                >
                                    {transaction.type === "Entrada"
                                        ? "+ "
                                        : "- "}

                                    {formatCurrency(transaction.value)}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="mt-4 flex justify-center">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-violet-600"
                >
                    Carregar mais
                    <ChevronDown size={16} />
                </button>
            </div>

        </section>
    )
}