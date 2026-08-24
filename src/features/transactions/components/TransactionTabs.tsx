import { List } from "lucide-react"

import { TabButton } from "./TabButton"

export function TransactionTabs() {
    return (
        <div className="flex items-center justify-between border-b border-slate-200 px-4">

            {/* Tabs */}
            <div className="flex">

                <TabButton
                    label="Todas"
                    active
                />

                <TabButton
                    label="Entradas"
                />

                <TabButton
                    label="Saídas"
                />

            </div>

            {/* Ordenação */}
            <div className="flex items-center gap-3">

                <span className="text-xs text-slate-400">
                    Ordenar por:
                </span>

                <button
                    type="button"
                    className="
                        text-sm
                        text-slate-600
                        transition
                        hover:text-slate-900
                    "
                >
                    Mais recentes
                </button>

                <button
                    type="button"
                    className="
                        rounded-lg
                        border
                        border-slate-200
                        p-2
                        text-slate-500
                        transition
                        hover:bg-slate-50
                        hover:text-slate-900
                    "
                >
                    <List size={17} />
                </button>

            </div>

        </div>
    )
}