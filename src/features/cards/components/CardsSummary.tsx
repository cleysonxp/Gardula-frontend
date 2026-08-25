import {
    CircleCheck,
    CreditCard,
    Wallet,
} from "lucide-react"

import { cards } from "../data/cards.mock"
import { SummaryCard } from "./SummaryCard"

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function getAvailableLimit(limit: number, usedLimit: number) {
    return limit - usedLimit
}

export function CardsSummary() {
    const totalLimit = cards.reduce(
        (total, card) => total + card.limit,
        0
    )

    const totalUsedLimit = cards.reduce(
        (total, card) => total + card.usedLimit,
        0
    )

    const totalAvailableLimit = cards.reduce(
        (total, card) =>
            total + getAvailableLimit(card.limit, card.usedLimit),
        0
    )

    const activeCards = cards.filter(
        (card) => card.status === "Ativo"
    ).length

    const usagePercentage =
        totalLimit > 0
            ? (totalUsedLimit / totalLimit) * 100
            : 0

    return (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                label="Total de cartões"
                value={cards.length.toString()}
                description={`${activeCards} cartões ativos`}
                icon={CreditCard}
                iconClassName="text-violet-600"
                iconBackgroundClassName="bg-violet-50"
            />

            <SummaryCard
                label="Limite total"
                value={formatCurrency(totalLimit)}
                description="Todos os cartões"
                icon={Wallet}
                iconClassName="text-blue-600"
                iconBackgroundClassName="bg-blue-50"
            />

            <SummaryCard
                label="Limite utilizado"
                value={formatCurrency(totalUsedLimit)}
                description={`${usagePercentage.toFixed(1)}% do limite total`}
                icon={CreditCard}
                iconClassName="text-orange-500"
                iconBackgroundClassName="bg-orange-50"
                valueClassName="text-orange-500"
            />

            <SummaryCard
                label="Limite disponível"
                value={formatCurrency(totalAvailableLimit)}
                description="Disponível para uso"
                icon={CircleCheck}
                iconClassName="text-emerald-600"
                iconBackgroundClassName="bg-emerald-50"
                valueClassName="text-emerald-600"
            />
        </div>
    )
}