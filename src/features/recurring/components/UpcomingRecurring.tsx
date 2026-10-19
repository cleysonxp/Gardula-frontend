import { CalendarDays, CircleHelp } from "lucide-react";

import type { RecurringItem } from "../types/RecurringItem";

type UpcomingRecurringProps = {
    items: RecurringItem[];
    currentMonth: Date;
    getDueDate: (item: RecurringItem, month: Date) => Date;
    formatCurrency: (value: number) => string;
};

export function UpcomingRecurring({
    items,
    currentMonth,
    getDueDate,
    formatCurrency,
}: UpcomingRecurringProps) {
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-base font-bold text-slate-900">
                        Próximos vencimentos
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Cobranças previstas para os próximos dias.
                    </p>
                </div>

                <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                    {items.length} previstas
                </span>
            </div>

            {items.length === 0 ? (
                <div className="flex min-h-52 flex-col items-center justify-center text-center">
                    <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">
                        <CalendarDays size={23} />
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                        Nenhuma cobrança nos próximos 7 dias
                    </p>

                    <p className="mt-1 max-w-xs text-xs text-slate-500">
                        Quando houver vencimentos nesse período, eles aparecerão aqui.
                    </p>
                </div>
            ) : (
                <div className="space-y-1">
                    {items.map((item) => {
                        const dueDate = getDueDate(item, currentMonth);

                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-slate-50"
                            >
                                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                                    <span className="text-base font-bold leading-5 text-slate-800">
                                        {dueDate.getDate()}
                                    </span>

                                    <span className="text-[10px] uppercase text-slate-500">
                                        {dueDate
                                            .toLocaleDateString("pt-BR", { month: "short" })
                                            .replace(".", "")}
                                    </span>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-slate-800">
                                        {item.name}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {item.category} · {item.type}
                                    </p>
                                </div>

                                <div className="shrink-0 text-right">
                                    <p
                                        className={`text-sm font-semibold ${item.type === "Recebimento"
                                                ? "text-emerald-600"
                                                : "text-slate-800"
                                            }`}
                                    >
                                        {item.type === "Recebimento" ? "+" : "−"}
                                        {formatCurrency(item.amount)}
                                    </p>

                                    <p className="mt-1 text-[11px] text-slate-400">
                                        {item.status}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-violet-50/70 p-4">
                <div className="rounded-lg bg-white p-2 text-violet-600 shadow-sm">
                    <CircleHelp size={17} />
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-800">
                        Dica financeira
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        Mantenha suas cobranças recorrentes atualizadas para antecipar seus
                        compromissos e planejar melhor seu orçamento.
                    </p>
                </div>
            </div>
        </div>
    );
}