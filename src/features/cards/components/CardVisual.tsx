import { CreditCard } from "lucide-react"

import type { Card } from "../types/card.types"

type CardVisualProps = {
    card: Card
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function getBrandLabel(brand: Card["brand"]) {
    return brand === "Visa" ? "VISA" : "MASTERCARD"
}

function formatDay(day: number) {
    return day.toString().padStart(2, "0")
}

export function CardVisual({ card }: CardVisualProps) {
    return (
        <div className={`relative h-[215px] overflow-hidden p-6 text-white ${card.color}`}>
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-black/10" />

            <div className="relative flex items-start justify-between">
                <div>
                    <p className="text-lg font-bold">
                        {card.bank}
                    </p>

                    <p className="mt-0.5 text-xs text-white/70">
                        {card.type}
                    </p>
                </div>

                <CreditCard
                    size={28}
                    className="text-white/90"
                />
            </div>

            <div className="relative mt-8">
                <p className="text-lg font-medium tracking-[0.18em]">
                    •••• •••• •••• {card.lastFourDigits}
                </p>
            </div>

            <div className="relative mt-6 flex items-end justify-between">
                <div>
                    <p className="text-[10px] uppercase text-white/60">
                        Vencimento
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                        {formatDay(card.dueDay)}/08
                    </p>
                </div>

                <div>
                    <p className="text-[10px] uppercase text-white/60">
                        Limite
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                        {formatCurrency(card.limit)}
                    </p>
                </div>

                <p className="text-sm font-bold tracking-wide">
                    {getBrandLabel(card.brand)}
                </p>
            </div>
        </div>
    )
}