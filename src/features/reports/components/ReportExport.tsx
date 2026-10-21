import { Download, FileSpreadsheet, FileText } from "lucide-react";
import type { Transaction } from "../types/report.types";
import { currency } from "../utils/report.utils";

type ReportExportProps = {
    transactions: Transaction[];
};

export function ReportExport({ transactions }: ReportExportProps) {
    function handleExportCSV() {
        const headers = [
            "Data",
            "Descrição",
            "Categoria",
            "Tipo",
            "Conta",
            "Valor",
        ];

        const rows = transactions.map((transaction) => [
            transaction.date,
            transaction.description,
            transaction.category,
            transaction.type,
            transaction.account,
            transaction.amount.toFixed(2).replace(".", ","),
        ]);

        const csvContent = [headers, ...rows]
            .map((row) =>
                row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(";")
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
                    Exporte seus dados para analisar ou guardar uma cópia.
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
                            <p className="mt-1 text-sm text-slate-500">Dados das transações</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
                {transactions.length} transações disponíveis para exportação. Valores formatados em reais: {currency(0)}.
            </p>
        </section>
    );
}