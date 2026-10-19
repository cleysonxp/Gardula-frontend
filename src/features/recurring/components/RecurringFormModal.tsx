import { ArrowDownRight, ArrowUpRight, Plus, X } from "lucide-react";

import type { RecurringType } from "../types/RecurringItem";

type RecurringFormModalProps = {
    isOpen: boolean;
    name: string;
    amount: string;
    dueDay: string;
    type: RecurringType;
    category: string;
    onNameChange: (value: string) => void;
    onAmountChange: (value: string) => void;
    onDueDayChange: (value: string) => void;
    onTypeChange: (value: RecurringType) => void;
    onCategoryChange: (value: string) => void;
    onClose: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const categories = [
    "Outros",
    "Moradia",
    "Assinaturas",
    "Serviços",
    "Transporte",
    "Saúde",
    "Renda",
    "Renda extra",
];

export function RecurringFormModal({
    isOpen,
    name,
    amount,
    dueDay,
    type,
    category,
    onNameChange,
    onAmountChange,
    onDueDayChange,
    onTypeChange,
    onCategoryChange,
    onClose,
    onSubmit,
}: RecurringFormModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="recurring-form-title"
                className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="recurring-form-title"
                            className="text-xl font-bold text-slate-900"
                        >
                            Nova recorrência
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Cadastre um recebimento ou pagamento programado.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Fechar formulário"
                    >
                        <X size={19} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Tipo de recorrência
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            {(["Pagamento", "Recebimento"] as const).map((itemType) => (
                                <button
                                    key={itemType}
                                    type="button"
                                    onClick={() => onTypeChange(itemType)}
                                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${type === itemType
                                            ? "border-violet-300 bg-violet-50 text-violet-700 ring-2 ring-violet-100"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {itemType === "Pagamento" ? (
                                        <ArrowUpRight size={17} />
                                    ) : (
                                        <ArrowDownRight size={17} />
                                    )}

                                    {itemType}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="recurring-name"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Descrição
                        </label>

                        <input
                            id="recurring-name"
                            required
                            value={name}
                            onChange={(event) => onNameChange(event.target.value)}
                            placeholder="Ex.: Internet, salário, aluguel..."
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="recurring-amount"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Valor (R$)
                            </label>

                            <input
                                id="recurring-amount"
                                required
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={amount}
                                onChange={(event) => onAmountChange(event.target.value)}
                                placeholder="0,00"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="recurring-day"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Dia de vencimento
                            </label>

                            <input
                                id="recurring-day"
                                required
                                type="number"
                                min="1"
                                max="31"
                                step="1"
                                value={dueDay}
                                onChange={(event) => onDueDayChange(event.target.value)}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="recurring-category"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Categoria
                            </label>

                            <select
                                id="recurring-category"
                                value={category}
                                onChange={(event) => onCategoryChange(event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                            >
                                {categories.map((itemCategory) => (
                                    <option key={itemCategory} value={itemCategory}>
                                        {itemCategory}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="recurring-frequency"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Frequência
                            </label>

                            <select
                                id="recurring-frequency"
                                value="Mensal"
                                disabled
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 outline-none"
                            >
                                <option value="Mensal">Mensal</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                        >
                            <Plus size={17} />
                            Criar recorrência
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}