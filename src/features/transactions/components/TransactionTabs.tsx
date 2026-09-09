import { ChevronDown, List } from "lucide-react"
import { useState } from "react"

import { TabButton } from "./TabButton"

type TransactionTabsProps = {
    selectedType: number | null
    onTypeChange: (value: number | null) => void
    sortOrder: "asc" | "desc"
    onSortOrderChange: (value: "asc" | "desc") => void
}

export function TransactionTabs({
    selectedType,
    onTypeChange,
    sortOrder,
    onSortOrderChange,
}: TransactionTabsProps) {
    const [isSortOpen, setIsSortOpen] = useState(false)

    const sortLabel = sortOrder === "desc"
        ? "Mais recentes"
        : "Mais antigas"

    const handleSortChange = (value: "asc" | "desc") => {
        onSortOrderChange(value)
        setIsSortOpen(false)
    }

    return (
        <div className="flex items-center justify-between border-b border-slate-200 px-4">
            <div className="flex">
                <TabButton
                    label="Todas"
                    active={selectedType === null}
                    onClick={() => onTypeChange(null)}
                />

                <TabButton
                    label="Entradas"
                    active={selectedType === 1}
                    onClick={() => onTypeChange(1)}
                />

                <TabButton
                    label="Saídas"
                    active={selectedType === 2}
                    onClick={() => onTypeChange(2)}
                />
            </div>

            <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                    Ordenar por:
                </span>

                <div className="relative">
                    <button type="button" onClick={() => setIsSortOpen((current) => !current)} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                        {sortLabel}

                        <ChevronDown
                            size={15}
                            className={`text-slate-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isSortOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                            <button
                                type="button"
                                onClick={() => handleSortChange("desc")}
                                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${sortOrder === "desc" ? "bg-violet-50 font-medium text-violet-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                            >
                                Mais recentes
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSortChange("asc")}
                                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${sortOrder === "asc" ? "bg-violet-50 font-medium text-violet-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                            >
                                Mais antigas
                            </button>
                        </div>
                    )}
                </div>

                <button type="button" className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                    <List size={17} />
                </button>
            </div>
        </div>
    )
}