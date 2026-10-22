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

    function getPeriodLabel(selectedPeriod: Period) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const formatMonth = (date: Date) =>
            date.toLocaleDateString("pt-BR", {
                month: "short",
                year: "numeric",
            }).replace(".", "");

        switch (selectedPeriod) {
            case "3 meses":
                return `${formatMonth(new Date(year, month - 2, 1))} – ${formatMonth(new Date(year, month, 1))}`;

            case "6 meses":
                return `${formatMonth(new Date(year, month - 5, 1))} – ${formatMonth(new Date(year, month, 1))}`;

            case "Este ano":
                return `Jan ${year} – ${formatMonth(new Date(year, month, 1))}`;

            case "Personalizado":
                return "Selecione um período";
        }
    }

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="mb-3 text-sm font-semibold text-slate-700">
                        Período
                    </p>

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
                    <span>{getPeriodLabel(period)}</span>
                    <ChevronDown size={16} />
                </div>
            </div>
        </section>
    );
}