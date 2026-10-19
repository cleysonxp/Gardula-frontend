import { Plus } from "lucide-react";

type RecurringHeaderProps = {
    onCreate: () => void;
};

export function RecurringHeader({ onCreate }: RecurringHeaderProps) {
    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Recorrências
                </h1>

                <p className="mt-1 text-sm text-slate-500 sm:text-base">
                    Gerencie seus recebimentos e pagamentos recorrentes.
                </p>
            </div>

            <button
                type="button"
                onClick={onCreate}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
                <Plus size={18} />
                Nova recorrência
            </button>
        </header>
    );
}