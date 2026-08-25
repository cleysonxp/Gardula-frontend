import { CircleX, Pencil } from "lucide-react"

import type { Card } from "../types/card.types"

type CardActionsProps = {
    card: Card
    onEdit?: (card: Card) => void
    onDeactivate?: (card: Card) => void
}

export function CardActions({
    card,
    onEdit,
    onDeactivate,
}: CardActionsProps) {
    return (
        <div className="mt-6 flex gap-2">
            <button
                type="button"
                onClick={() => onEdit?.(card)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
            >
                <Pencil size={16} />
                Editar
            </button>

            <button
                type="button"
                onClick={() => onDeactivate?.(card)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
                <CircleX size={16} />
                Desativar
            </button>
        </div>
    )
}