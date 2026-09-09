import { useEffect, useState } from "react"

import {
    ArrowDown,
    ArrowUp,
    List,
    Wallet,
} from "lucide-react"

import { getTransactionSummary } from "../services/transactionService"

import { SummaryCard } from "./SummaryCard"

type TransactionSummaryProps = {
    refreshKey: number
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)

export function TransactionSummary({ refreshKey }: TransactionSummaryProps) {
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [balance, setBalance] = useState(0)
    const [totalTransactions, setTotalTransactions] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadSummary() {
            try {
                setIsLoading(true)

                const response = await getTransactionSummary()

                setTotalIncome(response.totalIncome)
                setTotalExpense(response.totalExpense)
                setBalance(response.balance)
                setTotalTransactions(response.totalTransactions)
                setError(null)
            } catch {
                setError("Não foi possível carregar o resumo.")
            } finally {
                setIsLoading(false)
            }
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadSummary()
    }, [refreshKey])

    if (isLoading) {
        return (
            <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="h-[132px] animate-pulse rounded-xl bg-slate-100" />
                <div className="h-[132px] animate-pulse rounded-xl bg-slate-100" />
                <div className="h-[132px] animate-pulse rounded-xl bg-slate-100" />
                <div className="h-[132px] animate-pulse rounded-xl bg-slate-100" />
            </section>
        )
    }

    if (error) {
        return (
            <section className="mb-6 rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-500">
                {error}
            </section>
        )
    }

    return (
        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Total de entradas"
                value={formatCurrency(totalIncome)}
                description="Entradas registradas"
                icon={<ArrowDown size={22} className="text-emerald-600" />}
                iconBackground="bg-emerald-50"
                valueColor="text-emerald-600"
            />

            <SummaryCard
                title="Total de saídas"
                value={formatCurrency(totalExpense)}
                description="Saídas registradas"
                icon={<ArrowUp size={22} className="text-red-500" />}
                iconBackground="bg-red-50"
                valueColor="text-red-500"
            />

            <SummaryCard
                title="Saldo do período"
                value={formatCurrency(balance)}
                description="Entradas menos saídas"
                icon={<Wallet size={21} className="text-blue-600" />}
                iconBackground="bg-blue-50"
                valueColor="text-blue-600"
            />

            <SummaryCard
                title="Total de transações"
                value={totalTransactions.toString()}
                description="Transações registradas"
                icon={<List size={21} className="text-violet-600" />}
                iconBackground="bg-violet-50"
                valueColor="text-slate-900"
            />
        </section>
    )
}