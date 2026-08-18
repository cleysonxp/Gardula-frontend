import { useState } from "react"
import { MoreVertical, Wallet } from "lucide-react"

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

    function handleDetails(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()

        setIsMenuOpen(false)

        onDetails(account)
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
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
            className=" relative w-full overflow-visible rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
            {/* Faixa superior */}
            <div
                className={` pointer-events-none absolute left-0 right-0 top-0 h-1 rounded-t-xl
                    ${account.color}
                `}
            />

            {/* Cabeçalho */}
            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className={` flex h-12 w-12 shrink-0 items-center justify-center rounded-xl
                            ${account.color}
                        `}
                    >
                        {account.icon === "wallet" ? (
                            <Wallet
                                size={23}
                                className="text-white"
                            />
                        ) : (
                            <span className="text-lg font-bold text-white">
                                {account.initial}
                            </span>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-950">
                            {account.name}
                        </h3>

                        <p className="text-xs text-slate-500">
                            {account.type}
                        </p>

                        <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            Ativa
                        </span>
                    </div>

                </div>

                {/* Menu */}
                <div className="relative">

                    <button
                        type="button"
                        onClick={handleMenuToggle}
                        className=" rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700]"
                        aria-label={`Opções da conta ${account.name}`}
                    >
                        <MoreVertical size={18} />
                    </button>

                    {isMenuOpen && (
                        <div
                            className="absolute right-0 top-9 z-50 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                            <button
                                type="button"
                                onClick={handleDetails}
                                className="flex w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50">
                                Detalhes
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex w-full px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50">
                                Deletar
                            </button>
                        </div>
                    )}

                </div>

            </div>

            {/* Saldo */}
            <div className="mt-7">

                <p className="text-xs text-slate-500">
                    Saldo atual
                </p>

                <p className={`mt-1 text-xl font-bold ${account.textColor}`}>
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(account.balance)}
                </p>

            </div>

            {/* Entradas / Saídas */}
            <div className="mt-5 grid grid-cols-2 border-t border-slate-100 pt-4">

                <div>
                    <p className="text-xs text-slate-500">
                        Entradas
                    </p>

                    <p className="mt-1 text-sm font-semibold text-emerald-600">
                        {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(account.income)}
                    </p>
                </div>

                <div className="border-l border-slate-100 pl-5">

                    <p className="text-xs text-slate-500">
                        Saídas
                    </p>

                    <p className="mt-1 text-sm font-semibold text-red-600">
                        {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(account.expenses)}
                    </p>

                </div>

            </div>
        </button>
    )
}