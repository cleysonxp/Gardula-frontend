import {
    ArrowDown,
    ArrowUp,
    List,
    Wallet,
} from "lucide-react"

import { transactionsMock } from "../data/transactions.mock"
import { SummaryCard } from "./SummaryCard"

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)

export function TransactionSummary() {
    const totalEntries = transactionsMock
        .filter((transaction) => transaction.type === "Entrada")
        .reduce(
            (total, transaction) => total + transaction.amount,
            0
        )

    const totalExpenses = transactionsMock
        .filter((transaction) => transaction.type === "Saída")
        .reduce(
            (total, transaction) => total + transaction.amount,
            0
        )

    const balance = totalEntries - totalExpenses

    return (
        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
                title="Total de entradas"
                value={formatCurrency(totalEntries)}
                description="12,5% vs mês anterior"
                icon={
                    <ArrowDown
                        size={22}
                        className="text-emerald-600"
                    />
                }
                iconBackground="bg-emerald-50"
                valueColor="text-emerald-600"
            />

            <SummaryCard
                title="Total de saídas"
                value={formatCurrency(totalExpenses)}
                description="8,3% vs mês anterior"
                icon={
                    <ArrowUp
                        size={22}
                        className="text-red-500"
                    />
                }
                iconBackground="bg-red-50"
                valueColor="text-red-500"
            />

            <SummaryCard
                title="Saldo do período"
                value={formatCurrency(balance)}
                description="18,6% vs mês anterior"
                icon={
                    <Wallet
                        size={21}
                        className="text-blue-600"
                    />
                }
                iconBackground="bg-blue-50"
                valueColor="text-blue-600"
            />

            <SummaryCard
                title="Total de transações"
                value={transactionsMock.length.toString()}
                description="5 vs mês anterior"
                icon={
                    <List
                        size={21}
                        className="text-violet-600"
                    />
                }
                iconBackground="bg-violet-50"
                valueColor="text-slate-900"
            />

        </section>
    )
}