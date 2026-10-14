import { ArrowDown, ArrowUp } from "lucide-react"

interface SummaryCardProps {
    title: string
    value: string
    description: string
    icon: React.ElementType
    iconBackground: string
    iconColor: string
    trend: "up" | "down"
}

export function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
    iconBackground,
    iconColor,
    trend,
}: SummaryCardProps) {
    const TrendIcon = trend === "up" ? ArrowUp : ArrowDown

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBackground} ${iconColor}`}>
                    <Icon size={21} />
                </div>

                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <TrendIcon size={13} />
                    <span>{description}</span>
                </div>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
                {title}
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                {value}
            </p>
        </div>
    )
}