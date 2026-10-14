import { TrendingUp } from "lucide-react"

export function FinancialInsightCard() {
    return (
        <section className="flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border border-violet-100 bg-violet-50 p-6">
            <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                    <TrendingUp size={20} />
                </div>

                <h2 className="mt-4 text-lg font-bold text-slate-950">
                    Você está no caminho certo!
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                    Seu saldo do mês está 28% maior que no mês passado. Continue assim!
                </p>
            </div>

            <div className="mt-5 flex h-16 items-end justify-end gap-1.5">
                <div className="h-5 w-3 rounded-t-md bg-violet-200" />
                <div className="h-7 w-3 rounded-t-md bg-violet-300" />
                <div className="h-9 w-3 rounded-t-md bg-violet-300" />
                <div className="h-12 w-3 rounded-t-md bg-violet-400" />
                <div className="h-14 w-3 rounded-t-md bg-violet-500" />
                <div className="h-16 w-3 rounded-t-md bg-violet-600" />
            </div>
        </section>
    )
}