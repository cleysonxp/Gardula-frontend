import type { LucideIcon } from "lucide-react"

type SummaryCardProps = {
    label: string
    value: string
    description: string
    icon: LucideIcon
    iconClassName: string
    iconBackgroundClassName: string
    valueClassName?: string
}

export function SummaryCard({
    label,
    value,
    description,
    icon: Icon,
    iconClassName,
    iconBackgroundClassName,
    valueClassName = "text-slate-950",
}: SummaryCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconBackgroundClassName}`}>
                    <Icon size={21} className={iconClassName} />
                </div>

                <div>
                    <p className="text-sm font-medium text-slate-600">
                        {label}
                    </p>

                    <p className={`mt-1 text-2xl font-bold ${valueClassName}`}>
                        {value}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}