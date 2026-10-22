import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { Period, MonthlyEvolutionResponse } from "../types/report.types";
import { currency, formatCompactCurrency } from "../utils/report.utils";

type MonthlyEvolutionChartProps = {
    period: Period;
    data: MonthlyEvolutionResponse[];
};

export function MonthlyEvolutionChart({ period, data }: MonthlyEvolutionChartProps) {
    const chartData = data.map((item) => ({
        month: new Date(item.year, item.month - 1, 1).toLocaleDateString("pt-BR", {
            month: "short",
        }).replace(".", ""),
        income: item.totalIncome,
        expenses: item.totalExpense,
    }));

    const visibleChartData = period === "3 meses"
        ? chartData.slice(-3)
        : chartData;

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-semibold">Evolução mensal</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Compare suas entradas e saídas ao longo do tempo.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                        <span className="size-3 rounded-full bg-emerald-500" />
                        Entradas
                    </span>
                    <span className="flex items-center gap-2 text-slate-600">
                        <span className="size-3 rounded-full bg-rose-500" />
                        Saídas
                    </span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visibleChartData} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
                        <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} tickFormatter={formatCompactCurrency} width={75} />
                        <Tooltip formatter={(value) => currency(Number(value))} />
                        <Bar dataKey="income" name="Entradas" fill="#24B47E" radius={[4, 4, 0, 0]} maxBarSize={34} />
                        <Bar dataKey="expenses" name="Saídas" fill="#F05260" radius={[4, 4, 0, 0]} maxBarSize={34} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}