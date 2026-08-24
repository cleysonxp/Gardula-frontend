import type { ReactNode } from "react"

export function SummaryCard({
    title,
    value,
    description,
    icon,
    iconBackground,
    valueColor,
}: {
    title: string
    value: string
    description: string
    icon: ReactNode
    iconBackground: string
    valueColor: string
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <p
                        className={`
                            mt-2
                            text-2xl
                            font-bold
                            ${valueColor}
                        `}
                    >
                        {value}
                    </p>

                    <p className="mt-2 text-xs text-emerald-600">
                        ↗ {description}
                    </p>

                </div>

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        ${iconBackground}
                    `}
                >
                    {icon}
                </div>

            </div>

        </div>
    )
}