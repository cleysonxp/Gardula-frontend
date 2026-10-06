import {
    CalendarDays,
    MoreVertical,
    Pencil,
    Plus,
    Trash2,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface FinancialGoalCardProps {
    id: number
    name: string
    description: string
    current: number
    target: number
    percentage: number
    forecast: string
    icon: LucideIcon
    iconBackground: string
    iconColor: string
    progress: string
    formatCurrency: (value: number) => string
    onAddAmount: (goalId: number) => void
    onEdit: (goalId: number) => void
    onDelete: (goalId: number) => void
}

export function FinancialGoalCard({
    id,
    name,
    description,
    current,
    target,
    percentage,
    forecast,
    icon: Icon,
    iconBackground,
    iconColor,
    progress,
    formatCurrency,
    onAddAmount,
    onEdit,
    onDelete,
}: FinancialGoalCardProps) {
    const [showActions, setShowActions] = useState(false)

    return (
        <article className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBackground} ${iconColor}`}>
                    <Icon size={19} />
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() =>
                            setShowActions((current) => !current)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
                        aria-label={`Ações de ${name}`}
                    >
                        <MoreVertical size={17} />
                    </button>

                    {showActions && (
                        <div className="absolute right-0 top-9 z-10 w-32 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowActions(false)
                                    onEdit(id)
                                }}
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                            >
                                <Pencil size={14} />
                                Editar
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowActions(false)
                                    onDelete(id)
                                }}
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-red-600 transition hover:bg-red-50"
                            >
                                <Trash2 size={14} />
                                Excluir
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900">
                {name}
            </h3>

            <p className="mt-1 min-h-5 text-xs text-slate-500">
                {description}
            </p>

            <div className="mt-5 flex items-end justify-between gap-2">
                <p className="text-sm font-bold text-slate-900">
                    {formatCurrency(current)}
                </p>

                <p className="text-xs text-slate-500">
                    de {formatCurrency(target)}
                </p>
            </div>

            <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className={`h-full rounded-full ${progress}`}
                        style={{
                            width: `${percentage}%`,
                        }}
                    />
                </div>

                <span className="text-xs font-medium text-slate-600">
                    {percentage}%
                </span>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
                <CalendarDays size={14} />

                Previsão: {forecast}
            </div>

            <button
                type="button"
                onClick={() =>
                    onAddAmount(id)
                }
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
            >
                <Plus size={15} />
                Adicionar valor
            </button>
        </article>
    )
}