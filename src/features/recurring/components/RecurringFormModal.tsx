import { ArrowDownRight, ArrowUpRight, Plus, X } from "lucide-react";

import type { RecurringType } from "../types/RecurringItem";

export type RecurringFormCategory = {
    id: number;
    name: string;
    type: number;
    isActive: boolean;
};

export type RecurringFormAccount = {
    id: number;
    name: string;
    isActive: boolean;
};

export type RecurringFormCard = {
    id: number;
    name: string;
    lastFourDigits: string;
    isActive: boolean;
};

export type RecurringPaymentMethod = {
    id: number;
    name: string;
};

type RecurringFormModalProps = {
    isOpen: boolean;
    name: string;
    amount: string;
    dueDay: string;
    type: RecurringType;
    categoryId: number | null;
    paymentMethod: number;
    accountId: number | null;
    cardId: number | null;
    categories: RecurringFormCategory[];
    accounts: RecurringFormAccount[];
    cards: RecurringFormCard[];
    paymentMethods: RecurringPaymentMethod[];
    isLoadingCategories: boolean;
    isLoadingAccounts: boolean;
    isLoadingCards: boolean;
    isSubmitting: boolean;
    onNameChange: (value: string) => void;
    onAmountChange: (value: string) => void;
    onDueDayChange: (value: string) => void;
    onTypeChange: (value: RecurringType) => void;
    onCategoryChange: (value: number | null) => void;
    onPaymentMethodChange: (value: number) => void;
    onAccountChange: (value: number | null) => void;
    onCardChange: (value: number | null) => void;
    onClose: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function RecurringFormModal({
    isOpen,
    name,
    amount,
    dueDay,
    type,
    categoryId,
    paymentMethod,
    accountId,
    cardId,
    categories,
    accounts,
    cards,
    paymentMethods,
    isLoadingCategories,
    isLoadingAccounts,
    isLoadingCards,
    isSubmitting,
    onNameChange,
    onAmountChange,
    onDueDayChange,
    onTypeChange,
    onCategoryChange,
    onPaymentMethodChange,
    onAccountChange,
    onCardChange,
    onClose,
    onSubmit,
}: RecurringFormModalProps) {
    if (!isOpen) return null;

    const categoryType = type === "Recebimento" ? 1 : 2;
    const availableCategories = categories.filter(
        (category) => category.isActive && category.type === categoryType,
    );

    const isCreditCard = paymentMethod === 3;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
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
                        <h2 id="recurring-form-title" className="text-xl font-bold text-slate-900">
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
                                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${type === itemType ? "border-violet-300 bg-violet-50 text-violet-700 ring-2 ring-violet-100" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
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
                        <label htmlFor="recurring-name" className="mb-2 block text-sm font-medium text-slate-700">
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
                            <label htmlFor="recurring-amount" className="mb-2 block text-sm font-medium text-slate-700">
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
                            <label htmlFor="recurring-day" className="mb-2 block text-sm font-medium text-slate-700">
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

                    <div>
                        <label htmlFor="recurring-category" className="mb-2 block text-sm font-medium text-slate-700">
                            Categoria
                        </label>
                        <select
                            id="recurring-category"
                            required
                            value={categoryId ?? ""}
                            onChange={(event) => onCategoryChange(event.target.value ? Number(event.target.value) : null)}
                            disabled={isLoadingCategories || availableCategories.length === 0}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50 disabled:bg-slate-50"
                        >
                            <option value="">
                                {isLoadingCategories ? "Carregando categorias..." : "Selecione uma categoria"}
                            </option>
                            {availableCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="recurring-payment-method" className="mb-2 block text-sm font-medium text-slate-700">
                            Forma de pagamento
                        </label>
                        <select
                            id="recurring-payment-method"
                            required
                            value={paymentMethod}
                            onChange={(event) => onPaymentMethodChange(Number(event.target.value))}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                        >
                            {paymentMethods
                                .filter((method) => type === "Pagamento" || method.id !== 3)
                                .map((method) => (
                                    <option key={method.id} value={method.id}>
                                        {method.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {isCreditCard ? (
                        <div>
                            <label htmlFor="recurring-card" className="mb-2 block text-sm font-medium text-slate-700">
                                Cartão de crédito
                            </label>
                            <select
                                id="recurring-card"
                                required
                                value={cardId ?? ""}
                                onChange={(event) => onCardChange(event.target.value ? Number(event.target.value) : null)}
                                disabled={isLoadingCards || cards.length === 0}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50 disabled:bg-slate-50"
                            >
                                <option value="">
                                    {isLoadingCards ? "Carregando cartões..." : "Selecione um cartão"}
                                </option>
                                {cards.filter((card) => card.isActive).map((card) => (
                                    <option key={card.id} value={card.id}>
                                        {card.name} •••• {card.lastFourDigits}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="recurring-account" className="mb-2 block text-sm font-medium text-slate-700">
                                Conta
                            </label>
                            <select
                                id="recurring-account"
                                required
                                value={accountId ?? ""}
                                onChange={(event) => onAccountChange(event.target.value ? Number(event.target.value) : null)}
                                disabled={isLoadingAccounts || accounts.length === 0}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50 disabled:bg-slate-50"
                            >
                                <option value="">
                                    {isLoadingAccounts ? "Carregando contas..." : "Selecione uma conta"}
                                </option>
                                {accounts.filter((account) => account.isActive).map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label htmlFor="recurring-frequency" className="mb-2 block text-sm font-medium text-slate-700">
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
                            disabled={
                                isSubmitting ||
                                isLoadingCategories ||
                                isLoadingAccounts ||
                                isLoadingCards ||
                                categoryId === null ||
                                (paymentMethod === 3 ? cardId === null : accountId === null)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Plus size={17} />
                            {isSubmitting ? "Criando..." : "Criar recorrência"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
