import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"

type FilterButtonProps = {
    label: string
    icon?: ReactNode
    onClick?: () => void
}

export function FilterButton({
    label,
    icon,
    onClick,
}: FilterButtonProps) {
    return (
        <button type="button" onClick={onClick} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
            {icon}
            <span>{label}</span>
            <ChevronDown size={15} className="ml-1 text-slate-400" />
        </button>
    )
}