import {
    ArrowDownLeft,
    ArrowUpRight,
    Wallet,
} from "lucide-react"

import { FinancialSummaryCard } from "@/features/dashboard/components/FinancialSummaryCard"

export function HomePage() {
    return (
        <main className="min-h-screen p-8 lg:p-10">
            <header className="mb-8">
                <p className="text-sm font-medium text-primary-600">
                    Visão geral
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-text">
                    Olá, Cleyson 👋
                </h1>

                <p className="mt-2 text-sm text-text-muted">
                    Aqui está o resumo das suas finanças.
                </p>
            </header>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <FinancialSummaryCard
                    title="Saldo disponível"
                    value="R$ 8.450,00"
                    description="Saldo atual"
                    icon={Wallet}
                />

                <FinancialSummaryCard
                    title="Receitas"
                    value="R$ 5.000,00"
                    description="↑ 8,2% em relação ao mês anterior"
                    icon={ArrowUpRight}
                    variant="success"
                />

                <FinancialSummaryCard
                    title="Despesas"
                    value="R$ 3.200,00"
                    description="↓ 4,5% em relação ao mês anterior"
                    icon={ArrowDownLeft}
                    variant="danger"
                />
            </section>
        </main>
    )
}