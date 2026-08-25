import { ArrowLeft, CircleCheck } from "lucide-react"

import type { Card } from "../types/card.types"
import { CardVisual } from "./CardVisual"

type CardDetailsHeaderProps = {
    card: Card
    onBack?: () => void
}

export function CardDetailsHeader({
    card,
    onBack,
}: CardDetailsHeaderProps) {
    return (
        <>
            <button
                type="button"
                onClick={onBack}
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-violet-600"
            >
                <ArrowLeft size={17} />
                Voltar
            </button>

            <div className="overflow-hidden rounded-2xl shadow-sm">
                <CardVisual card={card} />
            </div>

            <div className="mt-5 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-slate-950">
                        {card.name}
                    </h2>

                    <p className="text-xs text-slate-500">
                        {card.account}
                    </p>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    <CircleCheck size={13} />
                    {card.status}
                </span>
            </div>
        </>
    )
}