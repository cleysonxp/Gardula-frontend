import type { LucideIcon } from "lucide-react"

interface FinancialSummaryCardProps {
    title: string
    value: string
    description?: string
    icon: LucideIcon
    variant?: "default" | "success" | "danger"
}

const variantStyles = {
    default: {
        icon: "bg-primary-500/10 text-primary-600",
        description: "text-text-muted",
    },
    success: {
        icon: "bg-success/10 text-success",
        description: "text-success",
    },
    danger: {
        icon: "bg-danger/10 text-danger",
        description: "text-danger",
    },
}

export function FinancialSummaryCard({
    title,
    value,
    description,
    icon: Icon,
    variant = "default",
}: FinancialSummaryCardProps) {
    const styles = variantStyles[variant]

    return (
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-text-muted">
                        {title}
                    </p>

                    <p className="mt-3 text-2xl font-bold tracking-tight text-text">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}
                >
                    <Icon size={21} />
                </div>
            </div>

            {description && (
                <p className={`mt-4 text-xs font-medium ${styles.description}`}>
                    {description}
                </p>
            )}
        </div>
    )
}