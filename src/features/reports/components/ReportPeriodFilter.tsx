import { CalendarDays, ChevronDown } from "lucide-react";
import type { Period } from "../types/report.types";

type ReportPeriodFilterProps = {
    period: Period;
    onPeriodChange: (period: Period) => void;
};

export function ReportPeriodFilter({
    period,
    onPeriodChange,
}: ReportPeriodFilterProps) {
    const periods: { label: string; value: Period }[] = [
        { label: "Últimos 3 meses", value: "3 meses" },
        { label: "Últimos 6 meses", value: "6 meses" },
        { label: "Este ano", value: "Este ano" },
        { label: "Personalizado", value: "Personalizado" },
    ];

    const periodLabel = {
        "3 meses": "Abr 2026 - Jun 2026",
        "6 meses": "Jan 2026 - Jun 2026",
        "Este ano": "Jan 2026 - Dez 2026",
        Personalizado: "Selecione um período",
    };

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="mb-3 text-sm font-semibold text-slate-700">Período</p>
                    <div className="flex flex-wrap gap-2">
                        {periods.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => onPeriodChange(option.value)}
                                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${period === option.value ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-600">
                    <CalendarDays size={17} />
                    <span>{periodLabel[period]}</span>
                    <ChevronDown size={16} />
                </div>
            </div>
        </section>
    );
}