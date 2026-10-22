import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";

import { SummaryCard } from "../features/reports/components/SummaryCard";
import { ReportHeader } from "../features/reports/components/ReportHeader";
import { ReportPeriodFilter } from "../features/reports/components/ReportPeriodFilter";
import { MonthlyEvolutionChart } from "../features/reports/components/MonthlyEvolutionChart";
import { ExpensesByCategory } from "../features/reports/components/ExpensesByCategory";
import { ReportExport } from "../features/reports/components/ReportExport";

import { getReport } from "../features/reports/services/reportService";

import type { Period, ReportResponse } from "../features/reports/types/report.types";

import { currency } from "../features/reports/utils/report.utils";


function getReportDates(period: Period) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    let startDate: Date;
    const endDate = new Date(year, month + 1, 0);

    switch (period) {
        case "3 meses":
            startDate = new Date(year, month - 2, 1);
            break;

        case "6 meses":
            startDate = new Date(year, month - 5, 1);
            break;

        case "Este ano":
            startDate = new Date(year, 0, 1);
            break;

        case "Personalizado":
            return null;
    }

    const formatDate = (date: Date) => {
        const dateYear = date.getFullYear();
        const dateMonth = String(date.getMonth() + 1).padStart(2, "0");
        const dateDay = String(date.getDate()).padStart(2, "0");

        return `${dateYear}-${dateMonth}-${dateDay}`;
    };

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
    };
}

export function ReportsPage() {
    const [period, setPeriod] = useState<Period>("6 meses");
    const [categoryFilter, setCategoryFilter] = useState("Todas");

    const [report, setReport] = useState<ReportResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const dates = getReportDates(period);

        if (!dates) {
            setReport(null);
            setError("O período personalizado ainda não está disponível.");
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function loadReport() {
            setLoading(true);
            setError(null);

            try {
                const data = await getReport(
                    dates.startDate,
                    dates.endDate,
                );

                if (!cancelled) {
                    setReport(data);
                }
            } catch {
                if (!cancelled) {
                    setReport(null);
                    setError("Não foi possível carregar os relatórios.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadReport();

        return () => {
            cancelled = true;
        };
    }, [period]);

    const totalIncome = report?.totalIncome ?? 0;
    const totalExpenses = report?.totalExpense ?? 0;
    const balance = report?.balance ?? 0;

    const handlePeriodChange = (selectedPeriod: Period) => {
        setPeriod(selectedPeriod);
    };

    const handleExport = () => {
        window.print();
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-5">
                <ReportHeader onExport={handleExport} />

                <ReportPeriodFilter
                    period={period}
                    onPeriodChange={handlePeriodChange}
                />

                {error && (
                    <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </p>
                )}

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <SummaryCard
                        title="Resultado do período"
                        value={loading ? "Carregando..." : currency(balance)}
                        description="Saldo entre entradas e saídas no período"
                        icon={TrendingUp}
                        variant="green"
                    />

                    <SummaryCard
                        title="Entradas"
                        value={loading ? "Carregando..." : currency(totalIncome)}
                        description="Total de entradas no período"
                        icon={ArrowUp}
                        variant="blue"
                    />

                    <SummaryCard
                        title="Saídas"
                        value={loading ? "Carregando..." : currency(totalExpenses)}
                        description="Total de saídas no período"
                        icon={ArrowDown}
                        variant="red"
                    />
                </section>

                <MonthlyEvolutionChart
                    period={period}
                    data={report?.monthlyEvolution ?? []}
                />

                <ExpensesByCategory
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    totalExpenses={totalExpenses}
                    categories={report?.categorySpending ?? []}
                />

                <ReportExport report={report} period={period} />
            </div>
        </main>
    );
}