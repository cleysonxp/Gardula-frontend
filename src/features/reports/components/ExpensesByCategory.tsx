import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { categoryData } from "../data/reports.mock";
import { categoryIcons, currency } from "../utils/report.utils";

type ExpensesByCategoryProps = {
    categoryFilter: string;
    onCategoryFilterChange: (category: string) => void;
    totalExpenses: number;
};

export function ExpensesByCategory({
    categoryFilter,
    onCategoryFilterChange,
    totalExpenses,
}: ExpensesByCategoryProps) {
    const filteredCategories = categoryFilter === "Todas"
        ? categoryData
        : categoryData.filter((category) => category.name === categoryFilter);

    const categoryTotal = filteredCategories.reduce(
        (sum, category) => sum + category.value,
        0
    );

    const totalCategoryExpenses = categoryData.reduce(
        (sum, category) => sum + category.value,
        0
    );

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                    <h2 className="text-lg font-semibold">Despesas por categoria</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Veja como seus gastos estão distribuídos no período.
                    </p>
                </div>
                <select
                    aria-label="Filtrar categoria do gráfico"
                    className="print:hidden rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    value={categoryFilter}
                    onChange={(event) => onCategoryFilterChange(event.target.value)}
                >
                    <option value="Todas">Todas as categorias</option>
                    {categoryData.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="mt-4 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                <div className="relative h-[280px] min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={filteredCategories} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={75} outerRadius={112} paddingAngle={2} stroke="white" strokeWidth={2}>
                                {filteredCategories.map((category) => (
                                    <Cell key={category.name} fill={category.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => currency(Number(value))} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold">{currency(categoryFilter === "Todas" ? totalExpenses : categoryTotal)}</span>
                        <span className="mt-1 text-xs text-slate-500">Total de despesas</span>
                    </div>
                </div>

                <div className="space-y-1">
                    {filteredCategories.map((category) => {
                        const Icon = categoryIcons[category.name as keyof typeof categoryIcons];
                        const percentage = totalCategoryExpenses > 0 ? (category.value / totalCategoryExpenses) * 100 : 0;

                        return (
                            <div key={category.name} className="grid grid-cols-[minmax(0,1fr)_65px_105px] items-center gap-3 border-b border-slate-100 py-3 last:border-0">
                                <div className="flex min-w-0 items-center gap-2">
                                    <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: category.color }} />
                                    {Icon && <Icon size={15} className="hidden text-slate-400 sm:block" />}
                                    <span className="truncate text-sm text-slate-600">{category.name}</span>
                                </div>
                                <span className="text-right text-sm text-slate-500">{percentage.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%</span>
                                <span className="text-right text-sm font-medium text-slate-700">{currency(category.value)}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}