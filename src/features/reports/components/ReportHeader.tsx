import { Download, FileBarChart } from "lucide-react";

type ReportHeaderProps = {
    onExport: () => void;
};

export function ReportHeader({ onExport }: ReportHeaderProps) {
    return (
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FileBarChart size={21} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Relatórios
                    </h1>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                    Acompanhe sua vida financeira e entenda para onde seu dinheiro está indo.
                </p>
            </div>

            <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
                <Download size={17} />
                Exportar relatório
            </button>
        </header>
    );
}