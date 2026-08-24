import type { ReactNode } from "react"

export function FilterButton({
    label,
    icon,
}: {
    label: string
    icon?: ReactNode
}) {
    return (
        <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
            {icon}

            {label}

            <span className="ml-1 text-slate-400">
                ˅
            </span>
        </button>
    )
}