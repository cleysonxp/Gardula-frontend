import { useState } from "react"

import { MoreVertical, Wallet, ArrowDown, ArrowUp } from "lucide-react"

import type { Account } from "@/features/accounts/types/account"

type AccountCardProps = {
    account: Account
    onDetails: (account: Account) => void
    onDelete: (account: Account) => void
}

export function AccountCard({
    account,
    onDetails,
    onDelete,
}: AccountCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const formattedBalance = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(account.balance)

    const formattedIncome = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(account.income)

    const formattedExpenses = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(account.expenses)

    function handleDetails(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        event.stopPropagation()
        setIsMenuOpen(false)
        onDetails(account)
    }

    function handleDelete(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        event.stopPropagation()
        setIsMenuOpen(false)
        onDelete(account)
    }

    function handleMenuToggle(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        event.stopPropagation()
        setIsMenuOpen((current) => !current)
    }

    return (
        <button
            type="button"
            onClick={() => onDetails(account)}
            className="relative w-full overflow-visible rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
        >
            <div className={`pointer-events-none absolute left-0 right-0 top-0 h-1 rounded-t-xl ${account.color}`} />

            <div className="flex items-start justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${account.color}`}>
                        {account.icon === "wallet" ? (
                            <Wallet size={21} className="text-white" />
                        ) : (
                            <span className="text-base font-bold text-white">
                                {account.initial}
                            </span>
                        )}
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-950">
                            {account.name}
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-500">
                            {account.type}
                        </p>

                        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Ativa
                        </span>
                    </div>
                </div>

                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={handleMenuToggle}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`Opções da conta ${account.name}`}
                    >
                        <MoreVertical size={18} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-9 z-50 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                            <button
                                type="button"
                                onClick={handleDetails}
                                className="flex w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                                Detalhes
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex w-full px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                            >
                                Deletar
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <p className="text-xs font-medium text-slate-400">
                    Saldo disponível
                </p>

                <p className={`mt-1 text-2xl font-bold tracking-tight ${account.textColor}`}>
                    {formattedBalance}
                </p>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Movimentações do período
                </p>

                <div className="grid grid-cols-2">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                            <ArrowDown size={14} className="text-emerald-600" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] text-slate-400">
                                Entradas
                            </p>

                            <p className="mt-0.5 truncate text-sm font-semibold text-emerald-600">
                                {formattedIncome}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
                            <ArrowUp size={14} className="text-red-500" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] text-slate-400">
                                Saídas
                            </p>

                            <p className="mt-0.5 truncate text-sm font-semibold text-red-500">
                                {formattedExpenses}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}