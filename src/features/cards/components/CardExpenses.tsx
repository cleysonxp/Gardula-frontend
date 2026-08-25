import { cardExpenses } from "../data/cards.mock"
import type { Card } from "../types/card.types"

type CardExpensesProps = {
    card: Card
    onViewTransactions?: (card: Card) => void
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function CardExpenses({
    card,
    onViewTransactions,
}: CardExpensesProps) {
    return (
        <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-slate-950">
                        Gastos do cartão
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                        Este mês
                    </p>
                </div>

                <span className="text-sm font-semibold text-slate-800">
                    {formatCurrency(card.usedLimit)}
                </span>
            </div>

            <div className="mt-4 space-y-3">
                {cardExpenses.map((expense) => {
                    const percentage =
                        card.usedLimit > 0
                            ? (expense.value / card.usedLimit) * 100
                            : 0

                    return (
                        <div
                            key={expense.id}
                            className="space-y-1.5"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className={`h-2.5 w-2.5 rounded-full ${expense.color}`} />

                                    <span className="text-xs text-slate-600">
                                        {expense.category}
                                    </span>
                                </div>

                                <span className="text-xs font-medium text-slate-700">
                                    {formatCurrency(expense.value)}
                                </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={`h-full rounded-full ${expense.color}`}
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <button
                type="button"
                onClick={() => onViewTransactions?.(card)}
                className="mt-5 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-violet-600 transition hover:bg-violet-50"
            >
                Ver todas as transações
            </button>
        </div>
    )
}