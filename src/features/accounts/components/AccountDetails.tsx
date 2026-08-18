import { ArrowLeft } from "lucide-react"

import { AccountFilters } from "@/features/accounts/components/AccountFilters"
import type { Account, AccountTransaction } from "@/features/accounts/types/account"

type AccountDetailsProps = {
    account: Account
    transactions: AccountTransaction[]
    formatCurrency: (value: number) => string
    onClose: () => void
}

export function AccountDetails({
    account,
    transactions,
    formatCurrency,
    onClose,
}: AccountDetailsProps) {
    return (
        <aside className="hidden w-[400px] shrink-0 border-l border-slate-200 bg-white xl:block">

            <div className="h-full overflow-y-auto px-6 py-7">

                {/* Voltar */}
                <button
                    type="button"
                    onClick={onClose}
                    className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-violet-600">
                    <ArrowLeft size={17} />

                    Voltar
                </button>

                {/* Conta selecionada */}
                <div className="flex items-center gap-3">

                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl
                            ${account.color}
                        `}
                    >
                        {account.icon === "wallet" ? (
                            <span className="text-white">
                                💰
                            </span>
                        ) : (
                            <span className="text-lg font-bold text-white">
                                {account.initial}
                            </span>
                        )}
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-950">
                            {account.name}
                        </h2>

                        <p className="text-xs text-slate-500">
                            {account.type}
                        </p>

                        <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            Ativa
                        </span>
                    </div>

                </div>

                {/* Saldo */}
                <div className="mt-8 border-t border-slate-200 pt-4">

                    <p className="text-xs text-slate-500">
                        Saldo atual
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-950">
                        {formatCurrency(account.balance)}
                    </p>

                </div>

                {/* Resumo da conta */}
                <div className="mt-5 grid grid-cols-3 gap-2">

                    <div className="rounded-lg border border-slate-200 p-3">
                        <p className="text-[11px] text-slate-500">
                            Entradas
                        </p>

                        <p className="mt-1 text-sm font-semibold text-emerald-600">
                            {formatCurrency(account.income)}
                        </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-3">
                        <p className="text-[11px] text-slate-500">
                            Saídas
                        </p>

                        <p className="mt-1 text-sm font-semibold text-red-600">
                            {formatCurrency(account.expenses)}
                        </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-3">
                        <p className="text-[11px] text-slate-500">
                            Saldo
                        </p>

                        <p className="mt-1 text-sm font-semibold text-violet-600">
                            {formatCurrency(account.balance)}
                        </p>
                    </div>

                </div>

                {/* Filtros */}
                <AccountFilters />

                {/* Movimentações */}
                <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">

                    <table className="w-full text-xs">

                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">

                                <th className="px-4 py-3 font-medium">
                                    Data
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Descrição
                                </th>

                                <th className="px-4 py-3 text-right font-medium">
                                    Valor
                                </th>

                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr
                                    key={`${transaction.date}-${index}`}
                                    className="border-b border-slate-100 last:border-0"
                                >
                                    <td className="px-4 py-3 text-slate-600">
                                        {transaction.date}
                                    </td>

                                    <td className="px-4 py-3 font-medium text-slate-700">
                                        {transaction.description}
                                    </td>

                                    <td
                                        className={`px-4 py-3 text-right font-medium
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

                    <div className="p-3">

                        <button
                            type="button"
                            className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-violet-600 transition hover:bg-violet-50">
                            Ver todas as movimentações
                        </button>

                    </div>

                </div>

            </div>

        </aside>
    )
}