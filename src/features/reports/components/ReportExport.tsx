import { Download, FileSpreadsheet, FileText } from "lucide-react";

import type { Period, ReportResponse } from "../types/report.types";
import { currency } from "../utils/report.utils";

type ReportExportProps = {
    report: ReportResponse | null;
    period: Period;
};

export function ReportExport({ report, period }: ReportExportProps) {
    function handleExportCSV() {
        if (!report) return;

        const rows = [
            ["Relatório financeiro Gardula"],
            ["Período", period],
            [],
            ["Resumo"],
            ["Indicador", "Valor"],
            ["Entradas", report.totalIncome.toFixed(2).replace(".", ",")],
            ["Saídas", report.totalExpense.toFixed(2).replace(".", ",")],
            ["Resultado", report.balance.toFixed(2).replace(".", ",")],
            ["Total de transações", String(report.totalTransactions)],
            [],
            ["Despesas por categoria"],
            ["Categoria", "Valor", "Percentual"],
            ...report.categorySpending.map((category) => [
                category.categoryName,
                category.amount.toFixed(2).replace(".", ","),
                `${category.percentage.toFixed(2).replace(".", ",")}%`,
            ]),
            [],
            ["Evolução mensal"],
            ["Mês", "Entradas", "Saídas"],
            ...report.monthlyEvolution.map((month) => [
                `${String(month.month).padStart(2, "0")}/${month.year}`,
                month.totalIncome.toFixed(2).replace(".", ","),
                month.totalExpense.toFixed(2).replace(".", ","),
            ]),
        ];

        const csvContent = rows
            .map((row) =>
                row.map((value) => {
                    const text = String(value ?? "");
                    return `"${text.replace(/"/g, '""')}"`;
                }).join(";")
            )
            .join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "relatorio-gardula.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    function handleExportPDF() {
        window.print();
    }

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
                <h2 className="text-lg font-semibold">Exportar relatórios</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Exporte os indicadores e gráficos do período selecionado.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <FileSpreadsheet size={22} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-800">Planilha CSV</p>
                            <p className="mt-1 text-sm text-slate-500">Resumo, categorias e evolução mensal</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleExportCSV}
                        disabled={!report}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Download size={16} />
                        Exportar
                    </button>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                            <FileText size={22} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-800">Relatório PDF</p>
                            <p className="mt-1 text-sm text-slate-500">Imprimir ou salvar em PDF</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleExportPDF}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        <Download size={16} />
                        Exportar
                    </button>
                </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
                {report
                    ? `${report.totalTransactions} transações no período. Resultado: ${currency(report.balance)}.`
                    : "Carregue um relatório para habilitar a exportação CSV."}
            </p>
        </section>
    );
}