import { Plus } from "lucide-react"

type RecurringHeaderProps = {
    onNewRecurring: () => void
}

export function RecurringHeader({
    onNewRecurring,
}: RecurringHeaderProps) {
    return (
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                    Pagamentos e Recebimentos
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Gerencie suas contas mensais e receitas recorrentes.
                </p>
            </div>

            <button
                type="button"
                onClick={onNewRecurring}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
                <Plus size={18} />
                Nova recorrência
            </button>
        </header>
    )
}