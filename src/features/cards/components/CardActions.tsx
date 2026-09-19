import { Pencil, Trash2 } from "lucide-react"

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
        <div className="flex flex-col gap-2">
            <button
                type="button"
                onClick={() => onEdit?.(card)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
                <Pencil size={16} />
                Editar
            </button>

            <button
                type="button"
                onClick={() => onDeactivate?.(card)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
                <Trash2 size={16} />
                Excluir
            </button>
        </div>
    )
}