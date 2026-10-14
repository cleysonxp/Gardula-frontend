import { ArrowRight, ChevronRight, CreditCard } from "lucide-react"

interface CardData {
    id: number
    name: string
    invoice: string
    available: string
    dueDate: string
    icon: string
    background: string
}

const cards: CardData[] = [
    {
        id: 1,
        name: "Nubank",
        invoice: "R$ 842,50",
        available: "R$ 2.157,50",
        dueDate: "10/10/2026",
        icon: "nu",
        background: "bg-violet-600",
    },
    {
        id: 2,
        name: "Itaú",
        invoice: "R$ 320,00",
        available: "R$ 1.680,00",
        dueDate: "15/10/2026",
        icon: "it",
        background: "bg-orange-500",
    },
]

export function CreditCardsCard() {
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

            <div className="divide-y divide-slate-100">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="flex items-center gap-4 py-3"
                    >
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${card.background}`}>
                            {card.icon}
                        </div>

                        <div className="w-28 shrink-0">
                            <p className="text-sm font-semibold text-slate-800">
                                {card.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Fatura atual
                            </p>

                            <p className="text-xs font-semibold text-slate-700">
                                {card.invoice}
                            </p>
                        </div>

                        <div className="hidden flex-1 sm:block">
                            <p className="text-xs text-slate-500">
                                Limite disponível
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-700">
                                {card.available}
                            </p>
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-xs text-slate-500">
                                Vencimento
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-700">
                                {card.dueDate}
                            </p>
                        </div>

                        <ChevronRight size={17} className="ml-auto text-slate-400" />
                    </div>
                ))}
            </div>
        </section>
    )
}