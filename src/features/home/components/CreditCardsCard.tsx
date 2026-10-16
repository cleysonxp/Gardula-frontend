import { ArrowRight, ChevronRight, CreditCard } from "lucide-react"
import type { HomeCardResponse } from "@/features/home/types/home.types"

interface CreditCardsCardProps {
    cards: HomeCardResponse[]
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function formatDate(value: string | null) {
    if (!value) return "Sem vencimento"

    return new Intl.DateTimeFormat("pt-BR").format(new Date(value))
}

const cardStyles = [
    { icon: "nu", background: "bg-violet-600" },
    { icon: "ca", background: "bg-orange-500" },
    { icon: "cc", background: "bg-blue-600" },
]

export function CreditCardsCard({ cards }: CreditCardsCardProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <CreditCard size={20} />
                    </div>

                    <h2 className="text-base font-bold text-slate-950">
                        Seus cartões
                    </h2>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    Ver cartões
                    <ArrowRight size={14} />
                </button>
            </div>

            {cards.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm text-slate-500">
                        Você ainda não possui cartões cadastrados.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {cards.map((card, index) => {
                        const style = cardStyles[index % cardStyles.length]

                        return (
                            <div
                                key={card.id}
                                className="flex items-center gap-4 py-3"
                            >
                                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${style.background}`}>
                                    {style.icon}
                                </div>

                                <div className="w-28 shrink-0">
                                    <p className="text-sm font-semibold text-slate-800">
                                        {card.name}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Fatura atual
                                    </p>

                                    <p className="text-xs font-semibold text-slate-700">
                                        {card.invoiceAmount !== null
                                            ? formatCurrency(card.invoiceAmount)
                                            : "Sem fatura"}
                                    </p>
                                </div>

                                <div className="hidden flex-1 sm:block">
                                    <p className="text-xs text-slate-500">
                                        Limite disponível
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-slate-700">
                                        {formatCurrency(card.availableLimit)}
                                    </p>
                                </div>

                                <div className="hidden sm:block">
                                    <p className="text-xs text-slate-500">
                                        Vencimento
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-slate-700">
                                        {formatDate(card.invoiceDueDate)}
                                    </p>
                                </div>

                                <ChevronRight size={17} className="ml-auto text-slate-400" />
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}