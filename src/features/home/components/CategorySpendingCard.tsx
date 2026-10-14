import { ArrowRight, CircleDollarSign } from "lucide-react"

interface Category {
    name: string
    amount: string
    percentage: number
    color: string
}

const categories: Category[] = [
    {
        name: "Moradia",
        amount: "R$ 900,00",
        percentage: 38,
        color: "bg-violet-500",
    },
    {
        name: "Alimentação",
        amount: "R$ 650,00",
        percentage: 28,
        color: "bg-orange-400",
    },
    {
        name: "Transporte",
        amount: "R$ 320,00",
        percentage: 15,
        color: "bg-blue-500",
    },
    {
        name: "Lazer",
        amount: "R$ 180,00",
        percentage: 8,
        color: "bg-emerald-500",
    },
    {
        name: "Saúde",
        amount: "R$ 120,00",
        percentage: 5,
        color: "bg-rose-400",
    },
    {
        name: "Outros",
        amount: "R$ 180,00",
        percentage: 6,
        color: "bg-slate-400",
    },
]

export function CategorySpendingCard() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <CircleDollarSign size={20} />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-slate-950">
                            Gastos por categoria
                        </h2>

                        <p className="text-xs text-slate-500">
                            Distribuição das despesas do mês
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    Ver detalhes
                    <ArrowRight size={14} />
                </button>
            </div>

            <div className="grid items-center gap-6 md:grid-cols-[220px_1fr]">
                <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-[conic-gradient(#8b5cf6_0deg_137deg,#fb923c_137deg_238deg,#3b82f6_238deg_292deg,#10b981_292deg_321deg,#fb7185_321deg_339deg,#94a3b8_339deg_360deg)]">
                    <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-lg font-bold text-slate-950">
                            R$ 2.350,00
                        </span>

                        <span className="mt-1 text-[10px] text-slate-500">
                            Total de despesas
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${category.color}`} />

                                <span className="text-xs font-medium text-slate-600">
                                    {category.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-xs font-semibold text-slate-700">
                                    {category.amount}
                                </span>

                                <span className="w-8 text-right text-xs text-slate-500">
                                    {category.percentage}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}