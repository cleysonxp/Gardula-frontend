import { CreditCard, MoreVertical, Pencil } from "lucide-react"

import type { Card } from "../types/card.types"

type CardTableRowProps = {
    card: Card
    onEdit?: (card: Card) => void
    onMore?: (card: Card) => void
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

function formatDay(day: number) {
    return day.toString().padStart(2, "0")
}

export function CardTableRow({
    card,
    onEdit,
    onMore,
}: CardTableRowProps) {
    const availableLimit = getAvailableLimit(card)
    const usagePercentage = getUsagePercentage(card)

    return (
        <tr className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50">
            <td className="px-2 py-4">
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white ${card.color}`}>
                        <CreditCard size={19} />
                    </div>

                    <div>
                        <p className="font-semibold text-slate-800">
                            {card.name}
                        </p>

                        <p className="text-xs text-slate-500">
                            •••• {card.lastFourDigits}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-2 py-4">
                <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${card.accountColor}`} />

                    <span className="text-slate-600">
                        {card.account}
                    </span>
                </div>
            </td>

            <td className="px-2 py-4 font-medium text-slate-700">
                {formatCurrency(card.limit)}
            </td>

            <td className="px-2 py-4">
                <p className="font-medium text-slate-700">
                    {formatCurrency(card.usedLimit)}
                </p>

                <p className="text-xs text-slate-500">
                    {usagePercentage.toFixed(0)}%
                </p>
            </td>

            <td className="px-2 py-4 font-medium text-emerald-600">
                {formatCurrency(availableLimit)}
            </td>

            <td className="px-2 py-4 text-slate-600">
                {formatDay(card.dueDay)}/08
            </td>

            <td className="px-2 py-4">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${card.status === "Ativo" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                    {card.status}
                </span>
            </td>

            <td className="px-2 py-4">
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit?.(card)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onMore?.(card)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <MoreVertical size={16} />
                    </button>
                </div>
            </td>
        </tr>
    )
}