import {
    ArrowDown,
    ArrowUp,
    Wallet,
} from "lucide-react"

import { AccountSummaryCard } from "@/features/accounts/components/AccountSummaryCard"

type AccountSummaryProps = {
    totalBalance: number
    activeAccounts: number
    totalIncome: number
    totalExpense: number
    formatCurrency: (value: number) => string
}

export function AccountSummary({
    totalBalance,
    activeAccounts,
    totalIncome,
    totalExpense,
    formatCurrency,
}: AccountSummaryProps) {
    return (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <AccountSummaryCard
                title="Saldo total"
                value={formatCurrency(totalBalance)}
                description={`${activeAccounts} contas ativas`}
                icon={Wallet}
                iconBackground="bg-violet-100"
                iconColor="text-violet-600"
                valueColor="text-violet-700"
                cardBackground="bg-violet-50/70"
                cardBorder="border-violet-100"
            />

            <AccountSummaryCard
                title="Entradas"
                value={formatCurrency(totalIncome)}
                description="Este mês"
                icon={ArrowUp}
                iconBackground="bg-emerald-100"
                iconColor="text-emerald-600"
                valueColor="text-emerald-600"
                cardBackground="bg-emerald-50/70"
                cardBorder="border-emerald-100"
            />

            <AccountSummaryCard
                title="Saídas"
                value={formatCurrency(totalExpense)}
                description="Este mês"
                icon={ArrowDown}
                iconBackground="bg-red-100"
                iconColor="text-red-600"
                valueColor="text-red-600"
                cardBackground="bg-red-50/70"
                cardBorder="border-red-100"
            />
        </div>
    )
}