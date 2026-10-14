import { ArrowRight, Lightbulb, Target } from "lucide-react"

export function MonthlyBudgetCard() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Target size={20} />
                    </div>

                    <h2 className="text-base font-bold text-slate-950">
                        Orçamento do mês
                    </h2>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    Ver planejamento
                    <ArrowRight size={14} />
                </button>
            </div>

            <div>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-2xl font-bold text-slate-950">
                            R$ 2.500,00
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Orçamento definido
                        </p>
                    </div>

                    <span className="text-xs font-medium text-slate-500">
                        57% utilizado
                    </span>
                </div>

                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[57%] rounded-full bg-violet-600" />
                </div>

                <div className="mt-5 flex justify-between gap-4">
                    <div>
                        <p className="text-base font-bold text-slate-900">
                            R$ 1.420,00
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="h-2 w-2 rounded-full bg-rose-500" />
                            Utilizado
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-base font-bold text-slate-900">
                            R$ 1.080,00
                        </p>

                        <div className="mt-1 flex items-center justify-end gap-1.5 text-xs text-slate-500">
                            Disponível
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex gap-3 rounded-xl bg-violet-50 p-4">
                    <Lightbulb className="mt-0.5 shrink-0 text-violet-600" size={19} />

                    <div>
                        <p className="text-xs font-semibold text-slate-800">
                            Você ainda tem 15 dias para o fim do mês.
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Sua média diária de gastos é de R$ 94,67.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}