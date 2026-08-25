import type { Card } from "../types/card.types"

type CardLimitProps = {
    card: Card
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function getAvailableLimit(card: Card) {
    return card.limit - card.usedLimit
}

function getUsagePercentage(card: Card) {
    if (card.limit <= 0) {
        return 0
    }

    return (card.usedLimit / card.limit) * 100
}

export function CardLimit({ card }: CardLimitProps) {
    const availableLimit = getAvailableLimit(card)
    const usagePercentage = getUsagePercentage(card)

    return (
        <div className="mt-7 border-t border-slate-200 pt-5">
            <p className="text-xs text-slate-500">
                Limite disponível
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-950">
                {formatCurrency(availableLimit)}
            </p>

            <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">
                        Utilizado
                    </span>

                    <span className="font-medium text-slate-700">
                        {formatCurrency(card.usedLimit)}
                    </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full bg-violet-600"
                        style={{
                            width: `${usagePercentage}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}