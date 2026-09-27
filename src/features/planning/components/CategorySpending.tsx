import { TrendingUp } from "lucide-react"

interface Category {
    name: string
    value: number
    percentage: number
    color: string
    icon: string
}

interface CategorySpendingProps {
    categories: Category[]
    formatCurrency: (value: number) => string
}

export function CategorySpending({
    categories,
    formatCurrency,
}: CategorySpendingProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <TrendingUp size={20} />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-slate-950">
                            Gastos por categoria
                        </h2>
                        <p className="text-sm text-slate-500">
                            Veja como seu dinheiro está sendo utilizado.
                        </p>
                    </div>
                </div>

                <button type="button" className="text-sm font-medium text-violet-600 hover:text-violet-700">
                    Ver detalhes
                </button>
            </div>

            <div className="space-y-4">
                {categories.map((category) => (
                    <div key={category.name} className="grid grid-cols-[130px_1fr_90px_55px] items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-xs text-slate-600">
                                {category.icon}
                            </span>

                            <span className="text-sm text-slate-700">
                                {category.name}
                            </span>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                            <div className={`h-full rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }} />
                        </div>

                        <span className="text-right text-sm font-medium text-slate-700">
                            {formatCurrency(category.value)}
                        </span>

                        <span className="text-right text-sm text-slate-500">
                            {category.percentage.toFixed(1).replace(".", ",")}%
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}