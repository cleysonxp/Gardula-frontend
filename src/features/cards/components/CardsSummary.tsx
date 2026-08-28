import {
    CircleCheck,
    CreditCard,
    Wallet,
} from "lucide-react"

import type { CardOverviewResponse } from "../types/card.types"

import { SummaryCard } from "./SummaryCard"

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

type CardsSummaryProps = {
    overview: CardOverviewResponse
}

export function CardsSummary({
    overview,
}: CardsSummaryProps) {
    const usagePercentage =
        overview.totalCreditLimit > 0
            ? (overview.totalUsedLimit / overview.totalCreditLimit) * 100
            : 0

    return (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                label="Total de cartões"
                value={overview.totalCards.toString()}
                description={`${overview.totalCards} cartões ativos`}
                icon={CreditCard}
                iconClassName="text-violet-600"
                iconBackgroundClassName="bg-violet-50"
            />

            <SummaryCard
                label="Limite total"
                value={formatCurrency(overview.totalCreditLimit)}
                description="Todos os cartões"
                icon={Wallet}
                iconClassName="text-blue-600"
                iconBackgroundClassName="bg-blue-50"
            />

            <SummaryCard
                label="Limite utilizado"
                value={formatCurrency(overview.totalUsedLimit)}
                description={`${usagePercentage.toFixed(1)}% do limite total`}
                icon={CreditCard}
                iconClassName="text-orange-500"
                iconBackgroundClassName="bg-orange-50"
                valueClassName="text-orange-500"
            />

            <SummaryCard
                label="Limite disponível"
                value={formatCurrency(overview.totalAvailableLimit)}
                description="Disponível para uso"
                icon={CircleCheck}
                iconClassName="text-emerald-600"
                iconBackgroundClassName="bg-emerald-50"
                valueClassName="text-emerald-600"
            />
        </div>
    )
}