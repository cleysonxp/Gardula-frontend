import { List } from "lucide-react"
import { TabButton } from "./TabButton"

type TransactionTabsProps = {
    selectedType: number | null
    onTypeChange: (value: number | null) => void
}

export function TransactionTabs({
    selectedType,
    onTypeChange,
}: TransactionTabsProps) {
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

                <button type="button" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                    Mais recentes
                </button>

                <button type="button" className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                    <List size={17} />
                </button>
            </div>
        </div>
    )
}