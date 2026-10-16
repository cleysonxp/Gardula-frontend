import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, TrendingUp, Wallet } from "lucide-react"

import { CategorySpendingCard } from "../features/home/components/CategorySpendingCard"
import { CreditCardsCard } from "../features/home/components/CreditCardsCard"
import { FinancialGoalsCard } from "../features/home/components/FinancialGoalsCard"
import { FinancialInsightCard } from "../features/home/components/FinancialInsightCard"
import { HomeHeader } from "../features/home/components/HomeHeader"
import { MonthlyBudgetCard } from "../features/home/components/MonthlyBudgetCard"
import { RecentTransactionsCard } from "../features/home/components/RecentTransactionsCard"
import { SummaryCard } from "../features/home/components/SummaryCard"
import { getHomeOverview } from "../features/home/services/homeService"

import type { HomeOverviewResponse } from "../features/home/types/home.types"

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function HomePage() {
    const [overview, setOverview] = useState<HomeOverviewResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadOverview() {
            try {
                setIsLoading(true)
                setError(null)

                const data = await getHomeOverview(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                )

                setOverview(data)
            } catch {
                setError("Não foi possível carregar os dados da Home.")
            } finally {
                setIsLoading(false)
            }
        }

        loadOverview()
    }, [])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F7F7FC] px-6">
                <p className="text-sm text-slate-500">Carregando dados financeiros...</p>
            </div>
        )
    }

    if (error || !overview) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F7F7FC] px-6">
                <p className="text-sm text-rose-600">{error ?? "Nenhum dado disponível."}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F7F7FC] px-6 py-6 lg:px-7">
            <HomeHeader />

            <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Saldo total"
                    value={formatCurrency(overview.totalBalance)}
                    description="Saldo atual das suas contas"
                    icon={Wallet}
                    iconBackground="bg-violet-50"
                    iconColor="text-violet-600"
                    trend="up"
                />

                <SummaryCard
                    title="Entradas no mês"
                    value={formatCurrency(overview.monthlySummary.totalIncome)}
                    description="Total de entradas no período"
                    icon={ArrowUp}
                    iconBackground="bg-emerald-50"
                    iconColor="text-emerald-600"
                    trend="up"
                />

                <SummaryCard
                    title="Despesas no mês"
                    value={formatCurrency(overview.monthlySummary.totalExpense)}
                    description="Total de despesas no período"
                    icon={ArrowDown}
                    iconBackground="bg-rose-50"
                    iconColor="text-rose-500"
                    trend="down"
                />

                <SummaryCard
                    title="Saldo do mês"
                    value={formatCurrency(overview.monthlySummary.balance)}
                    description="Entradas menos despesas"
                    icon={TrendingUp}
                    iconBackground="bg-blue-50"
                    iconColor="text-blue-500"
                    trend="up"
                />
            </section>

            <div className="mb-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <CategorySpendingCard
                    categories={overview.categorySpending}
                    totalExpenses={overview.monthlySummary.totalExpense}
                />
                <MonthlyBudgetCard
                    budget={overview.budget}
                    year={overview.year}
                    month={overview.month}
                />
            </div>

            <div className="mb-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <RecentTransactionsCard
                    transactions={overview.recentTransactions}
                />
                <FinancialGoalsCard goals={overview.goals} />
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <CreditCardsCard cards={overview.cardItems} />
                <FinancialInsightCard />
            </div>
        </div>
    )
}