import {
    Home,
    Wifi,
    Smartphone,
    Dumbbell,
    Play,
    Utensils,
    Briefcase,
    CreditCard,
    Shield,
    MoreVertical,
    ArrowDown,
    ArrowUp,
} from "lucide-react"

import type { RecurringItem } from "@/features/recurring/types/recurring"

type RecurringRowProps = {
    item: RecurringItem
    onDetails: (item: RecurringItem) => void
}

const icons = {
    home: Home,
    wifi: Wifi,
    phone: Smartphone,
    dumbbell: Dumbbell,
    play: Play,
    utensils: Utensils,
    briefcase: Briefcase,
    card: CreditCard,
    shield: Shield,
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(`${value}T12:00:00`))
}

function getDaysUntil(value: string) {
    const today = new Date("2026-09-02T12:00:00")
    const date = new Date(`${value}T12:00:00`)

    return Math.ceil(
        (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )
}

export function RecurringRow({
    item,
    onDetails,
}: RecurringRowProps) {
    const Icon = icons[item.icon as keyof typeof icons] ?? CircleDollarFallback
    const daysUntil = getDaysUntil(item.nextDueDate)

    return (
        <tr className="border-t border-slate-100 transition hover:bg-slate-50/70">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"}`}>
                        <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                            {item.description}
                        </p>

                        <p className="text-xs text-slate-500">
                            {item.category}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.type === "income" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                    {item.type === "income" ? (
                        <ArrowDown size={12} />
                    ) : (
                        <ArrowUp size={12} />
                    )}

                    {item.type === "income" ? "Entrada" : "Saída"}
                </span>
            </td>

            <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                {formatCurrency(item.amount)}
            </td>

            <td className="px-4 py-3 text-sm text-slate-600">
                {item.frequency === "monthly" ? "Mensal" : "Anual"}
            </td>

            <td className="px-4 py-3">
                <p className="text-sm font-medium text-slate-800">
                    {formatDate(item.nextDueDate)}
                </p>

                <p className="text-xs text-slate-500">
                    {daysUntil <= 0
                        ? "Hoje"
                        : `Em ${daysUntil} dias`}
                </p>
            </td>

            <td className="px-4 py-3">
                <p className="text-sm font-medium text-slate-800">
                    {item.account}
                </p>

                <p className="text-xs text-slate-500">
                    {item.accountType}
                </p>
            </td>

            <td className="px-4 py-3">
                <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${item.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {item.status === "active" ? "Ativa" : "Pausada"}
                </span>
            </td>

            <td className="px-4 py-3 text-right">
                <button
                    type="button"
                    onClick={() => onDetails(item)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`Opções de ${item.description}`}
                >
                    <MoreVertical size={17} />
                </button>
            </td>
        </tr>
    )
}

function CircleDollarFallback({
    size,
}: {
    size: number
}) {
    return (
        <span
            className="font-bold"
            style={{ fontSize: size }}
        >
            $
        </span>
    )
}