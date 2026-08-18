import type { LucideIcon } from "lucide-react"

type AccountSummaryCardProps = {
    title: string
    value: string
    description: string
    icon: LucideIcon
    iconBackground: string
    iconColor: string
    valueColor?: string
    cardBackground?: string
    cardBorder?: string
}

export function AccountSummaryCard({
    title,
    value,
    description,
    icon: Icon,
    iconBackground,
    iconColor,
    valueColor = "text-slate-950",
    cardBackground = "bg-white",
    cardBorder = "border-slate-200",
}: AccountSummaryCardProps) {
    return (
        <div
            className={` rounded-xl border p-5 shadow-sm
                ${cardBackground}
                ${cardBorder}
            `}
        >
            <div className="flex items-start gap-4">

                <div
                    className={` flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                        ${iconBackground}
                    `}
                >
                    <Icon
                        size={21}
                        className={iconColor}
                    />
                </div>

                <div>
                    <p className="text-sm font-medium text-slate-600">
                        {title}
                    </p>

                    <p
                        className={` mt-1 text-2xl font-bold
                            ${valueColor}
                        `}
                    >
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