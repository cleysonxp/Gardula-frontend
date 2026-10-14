import { ArrowRight, Car, CircleDollarSign, Utensils } from "lucide-react"

interface Transaction {
    id: number
    name: string
    date: string
    category: string
    amount: string
    type: "income" | "expense"
    icon: React.ElementType
    iconBackground: string
    iconColor: string
}

const recentTransactions: Transaction[] = [
    {
        id: 1,
        name: "Mercado Municipal",
        date: "15 de outubro de 2026",
        category: "Alimentação",
        amount: "- R$ 187,30",
        type: "expense",
        icon: Car,
        iconBackground: "bg-blue-50",
        iconColor: "text-blue-500",
    },
    {
        id: 2,
        name: "iFood",
        date: "14 de outubro de 2026",
        category: "Alimentação",
        amount: "- R$ 42,90",
        type: "expense",
        icon: Utensils,
        iconBackground: "bg-rose-50",
        iconColor: "text-rose-500",
    },
    {
        id: 3,
        name: "Salário",
        date: "10 de outubro de 2026",
        category: "Recebimento",
        amount: "+ R$ 6.000,00",
        type: "income",
        icon: CircleDollarSign,
        iconBackground: "bg-emerald-50",
        iconColor: "text-emerald-500",
    },
    {
        id: 4,
        name: "Uber",
        date: "08 de outubro de 2026",
        category: "Transporte",
        amount: "- R$ 24,50",
        type: "expense",
        icon: Car,
        iconBackground: "bg-violet-50",
        iconColor: "text-violet-500",
    },
    {
        id: 5,
        name: "Aluguel",
        date: "05 de outubro de 2026",
        category: "Moradia",
        amount: "- R$ 900,00",
        type: "expense",
        icon: Car,
        iconBackground: "bg-rose-50",
        iconColor: "text-rose-500",
    },
]

export function RecentTransactionsCard() {
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

            <div className="divide-y divide-slate-100">
                {recentTransactions.map((transaction) => {
                    const Icon = transaction.icon

                    return (
                        <div
                            key={transaction.id}
                            className="flex items-center gap-3 py-3.5"
                        >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${transaction.iconBackground} ${transaction.iconColor}`}>
                                <Icon size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                    {transaction.name}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    {transaction.date} • {transaction.category}
                                </p>
                            </div>

                            <span className={`text-sm font-bold ${transaction.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>
                                {transaction.amount}
                            </span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}