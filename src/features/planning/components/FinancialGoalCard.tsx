import { CalendarDays, MoreVertical, Plus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

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
}: FinancialGoalCardProps) {
    return (
        <article className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBackground} ${iconColor}`}>
                    <Icon size={19} />
                </div>

                <button
                    type="button"
                    onClick={() => onEdit(id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
                    aria-label={`Editar ${name}`}
                >
                    <MoreVertical size={17} />
                </button>
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