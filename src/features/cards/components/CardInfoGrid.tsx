import type { Card } from "../types/card.types"

type CardInfoGridProps = {
    card: Card
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function formatDay(day: number) {
    return day.toString().padStart(2, "0")
}

export function CardInfoGrid({ card }: CardInfoGridProps) {
    return (
        <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-[11px] text-slate-500">
                    Limite total
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                    {formatCurrency(card.limit)}
                </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-[11px] text-slate-500">
                    Utilizado
                </p>

                <p className="mt-1 text-sm font-semibold text-orange-500">
                    {formatCurrency(card.usedLimit)}
                </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-[11px] text-slate-500">
                    Fechamento
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                    Dia {formatDay(card.closingDay)}
                </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-[11px] text-slate-500">
                    Vencimento
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                    Dia {formatDay(card.dueDay)}
                </p>
            </div>
        </div>
    )
}