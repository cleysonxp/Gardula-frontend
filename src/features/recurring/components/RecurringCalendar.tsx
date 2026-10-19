import { ArrowLeft, ArrowRight, X } from "lucide-react";

import type { RecurringItem } from "../types/RecurringItem";

type RecurringCalendarProps = {
    currentMonth: Date;
    activeItems: RecurringItem[];
    selectedDay: Date | null;
    calendarDays: (number | null)[];
    onChangeMonth: (direction: number) => void;
    onSelectDay: (date: Date | null) => void;
    getItemsForDay: (day: number) => RecurringItem[];
    getDueDate: (item: RecurringItem, month: Date) => Date;
    getMonthName: (date: Date) => string;
    formatDate: (date: Date) => string;
    formatCurrency: (value: number) => string;
};

const isSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

export function RecurringCalendar({
    currentMonth,
    activeItems,
    selectedDay,
    calendarDays,
    onChangeMonth,
    onSelectDay,
    getItemsForDay,
    getDueDate,
    getMonthName,
    formatDate,
    formatCurrency,
}: RecurringCalendarProps) {
    const selectedDayItems = selectedDay
        ? activeItems.filter((item) =>
            isSameDay(getDueDate(item, currentMonth), selectedDay),
        )
        : [];

    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-bold text-slate-900">
                        Calendário de cobranças
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Visualize os vencimentos do mês.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onChangeMonth(-1)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                        aria-label="Mês anterior"
                    >
                        <ArrowLeft size={16} />
                    </button>

                    <span className="min-w-[130px] text-center text-sm font-semibold capitalize text-slate-800">
                        {getMonthName(currentMonth)}
                    </span>

                    <button
                        type="button"
                        onClick={() => onChangeMonth(1)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                        aria-label="Próximo mês"
                    >
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                    <div
                        key={day}
                        className="pb-3 text-xs font-semibold text-slate-400"
                    >
                        {day}
                    </div>
                ))}

                {calendarDays.map((day, index) => {
                    if (day === null) {
                        return <div key={`empty-${index}`} />;
                    }

                    const dayItems = getItemsForDay(day);
                    const hasIncome = dayItems.some(
                        (item) => item.type === "Recebimento",
                    );
                    const hasExpense = dayItems.some(
                        (item) => item.type === "Pagamento",
                    );

                    const date = new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day,
                    );

                    const isToday = isSameDay(date, new Date());
                    const isSelected = selectedDay
                        ? isSameDay(date, selectedDay)
                        : false;

                    return (
                        <button
                            key={day}
                            type="button"
                            onClick={() => onSelectDay(date)}
                            className={`relative mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-xl text-sm transition sm:h-11 sm:w-11 ${isSelected
                                    ? "bg-violet-600 font-semibold text-white"
                                    : isToday
                                        ? "border border-violet-300 bg-violet-50 font-semibold text-violet-700"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                            aria-label={`${day} de ${getMonthName(currentMonth)}${dayItems.length ? `, ${dayItems.length} cobrança(s)` : ""
                                }`}
                            aria-pressed={isSelected}
                        >
                            {day}

                            {dayItems.length > 0 && (
                                <span className="absolute bottom-1 flex gap-0.5">
                                    {hasIncome && (
                                        <span
                                            className={`h-1 w-1 rounded-full ${isSelected ? "bg-white" : "bg-emerald-500"
                                                }`}
                                        />
                                    )}

                                    {hasExpense && (
                                        <span
                                            className={`h-1 w-1 rounded-full ${isSelected ? "bg-white" : "bg-rose-400"
                                                }`}
                                        />
                                    )}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Recebimentos
                </span>

                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    Pagamentos
                </span>

                <span className="ml-auto text-slate-400">
                    Selecione um dia para ver os detalhes.
                </span>
            </div>

            {selectedDay && (
                <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-slate-800">
                            Vencimentos em {formatDate(selectedDay)}
                        </h3>

                        <button
                            type="button"
                            onClick={() => onSelectDay(null)}
                            className="rounded-md p-1 text-slate-500 hover:bg-white"
                            aria-label="Fechar detalhes do dia"
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {selectedDayItems.length === 0 ? (
                        <p className="text-sm text-slate-500">
                            Nenhuma cobrança ativa neste dia.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {selectedDayItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between gap-3"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${item.color}`}
                                        >
                                            {item.initials}
                                        </span>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-slate-800">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-slate-500">{item.type}</p>
                                        </div>
                                    </div>

                                    <span
                                        className={`shrink-0 text-sm font-semibold ${item.type === "Recebimento"
                                                ? "text-emerald-600"
                                                : "text-slate-800"
                                            }`}
                                    >
                                        {item.type === "Recebimento" ? "+" : "−"}
                                        {formatCurrency(item.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}