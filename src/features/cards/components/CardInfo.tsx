import type { Card } from "../types/card.types"

type CardInfoProps = {
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
    return (card.usedLimit / card.limit) * 100
}

export function CardInfo({ card }: CardInfoProps) {
    const availableLimit = getAvailableLimit(card)
    const usagePercentage = getUsagePercentage(card)

    return (
        <div className="border border-t-0 border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-950">
                        {card.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                        {card.account}
                    </p>
                </div>

                <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    {card.status}
                </span>
            </div>

            <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                        Limite utilizado
                    </span>

                    <span className="font-medium text-slate-700">
                        {usagePercentage.toFixed(0)}%
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

                <div className="mt-2 flex justify-between">
                    <span className="text-xs text-slate-500">
                        Utilizado {formatCurrency(card.usedLimit)}
                    </span>

                    <span className="text-xs font-medium text-emerald-600">
                        {formatCurrency(availableLimit)} disponível
                    </span>
                </div>
            </div>
        </div>
    )
}