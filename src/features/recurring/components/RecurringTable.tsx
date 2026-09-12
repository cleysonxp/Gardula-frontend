import type { RecurringItem } from "@/features/recurring/types/recurring"

import { RecurringRow } from "./RecurringRow"

type RecurringTableProps = {
    items: RecurringItem[]
    onDetails: (item: RecurringItem) => void
}

export function RecurringTable({
    items,
    onDetails,
}: RecurringTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                    <tr className="bg-slate-50/70">
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Descrição
                        </th>

                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Tipo
                        </th>

                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Valor
                        </th>

                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Frequência
                        </th>

                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Próximo vencimento
                        </th>

                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Conta
                        </th>

                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Status
                        </th>

                        <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Ações
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <RecurringRow
                            key={item.id}
                            item={item}
                            onDetails={onDetails}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}