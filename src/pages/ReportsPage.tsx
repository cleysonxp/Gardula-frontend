import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";

import { SummaryCard } from "../features/reports/components/SummaryCard";
import { ReportHeader } from "../features/reports/components/ReportHeader";
import { ReportPeriodFilter } from "../features/reports/components/ReportPeriodFilter";
import { MonthlyEvolutionChart } from "../features/reports/components/MonthlyEvolutionChart";
import { ExpensesByCategory } from "../features/reports/components/ExpensesByCategory";
import { ReportExport } from "../features/reports/components/ReportExport";
import { ReportTransactions } from "../features/reports/components/ReportTransactions";

import { initialTransactions } from "../features/reports/data/reports.mock";
import type { Period } from "../features/reports/types/report.types";
import { currency } from "../features/reports/utils/report.utils";

export function ReportsPage() {
    const [period, setPeriod] = useState<Period>("6 meses");
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Todas");
    const [transactionCategoryFilter, setTransactionCategoryFilter] = useState("Todas");
    const [transactionType, setTransactionType] = useState("Todas");
    const [page, setPage] = useState(1);

    const pageSize = 7;

    const filteredTransactions = useMemo(() => {
        return initialTransactions.filter((transaction) => {
            const matchesSearch =
                transaction.description.toLowerCase().includes(search.toLowerCase()) ||
                transaction.category.toLowerCase().includes(search.toLowerCase()) ||
                transaction.account.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                transactionCategoryFilter === "Todas" ||
                transaction.category === transactionCategoryFilter;

            const matchesType =
                transactionType === "Todas" ||
                transaction.type === transactionType;

            return matchesSearch && matchesCategory && matchesType;
        });
    }, [search, transactionCategoryFilter, transactionType]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredTransactions.length / pageSize)
    );

    const visibleTransactions = filteredTransactions.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const totalIncome = 5000;
    const totalExpenses = 2550;
    const balance = totalIncome - totalExpenses;

    const handlePeriodChange = (selectedPeriod: Period) => {
        setPeriod(selectedPeriod);
        setPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleTransactionCategoryChange = (value: string) => {
        setTransactionCategoryFilter(value);
        setPage(1);
    };

    const handleTransactionTypeChange = (value: string) => {
        setTransactionType(value);
        setPage(1);
    };

    const handlePageChange = (selectedPage: number) => {
        setPage(Math.min(Math.max(1, selectedPage), totalPages));
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

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <SummaryCard
                        title="Resultado do período"
                        value={currency(balance)}
                        description="+12,5% em relação ao período anterior"
                        icon={TrendingUp}
                        variant="green"
                    />

                    <SummaryCard
                        title="Entradas"
                        value={currency(totalIncome)}
                        description="+8,3% em relação ao período anterior"
                        icon={ArrowUp}
                        variant="blue"
                    />

                    <SummaryCard
                        title="Saídas"
                        value={currency(totalExpenses)}
                        description="+4,1% em relação ao período anterior"
                        icon={ArrowDown}
                        variant="red"
                    />
                </section>

                <MonthlyEvolutionChart period={period} />

                <ExpensesByCategory
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    totalExpenses={totalExpenses}
                />
{/* 
                <ReportTransactions
                    transactions={visibleTransactions}
                    search={search}
                    onSearchChange={handleSearchChange}
                    transactionType={transactionType}
                    onTransactionTypeChange={handleTransactionTypeChange}
                    categoryFilter={transactionCategoryFilter}
                    onCategoryFilterChange={handleTransactionCategoryChange}
                    page={page}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                /> */}

                <ReportExport transactions={filteredTransactions} />
            </div>
        </main>
    );
}