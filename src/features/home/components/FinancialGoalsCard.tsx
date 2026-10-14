import { ArrowRight, Home, Plane, Target } from "lucide-react"

interface Goal {
    id: number
    name: string
    current: string
    target: string
    percentage: number
    icon: React.ElementType
    iconBackground: string
    iconColor: string
}

const goals: Goal[] = [
    {
        id: 1,
        name: "Reserva de emergência",
        current: "R$ 3.500,00",
        target: "R$ 5.000,00",
        percentage: 70,
        icon: Target,
        iconBackground: "bg-blue-50",
        iconColor: "text-blue-500",
    },
    {
        id: 2,
        name: "Viagem para Europa",
        current: "R$ 4.000,00",
        target: "R$ 10.000,00",
        percentage: 40,
        icon: Plane,
        iconBackground: "bg-blue-50",
        iconColor: "text-blue-500",
    },
    {
        id: 3,
        name: "Entrada do apartamento",
        current: "R$ 25.000,00",
        target: "R$ 100.000,00",
        percentage: 25,
        icon: Home,
        iconBackground: "bg-orange-50",
        iconColor: "text-orange-500",
    },
]

export function FinancialGoalsCard() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Target size={20} />
                    </div>

                    <h2 className="text-base font-bold text-slate-950">
                        Seus objetivos
                    </h2>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    Ver todos
                    <ArrowRight size={14} />
                </button>
            </div>

            <div className="space-y-5">
                {goals.map((goal) => {
                    const Icon = goal.icon

                    return (
                        <div key={goal.id} className="flex gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${goal.iconBackground} ${goal.iconColor}`}>
                                <Icon size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="truncate text-sm font-semibold text-slate-800">
                                        {goal.name}
                                    </p>

                                    <span className="text-xs font-bold text-slate-600">
                                        {goal.percentage}%
                                    </span>
                                </div>

                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-violet-500"
                                        style={{
                                            width: `${goal.percentage}%`,
                                        }}
                                    />
                                </div>

                                <p className="mt-1.5 text-xs text-slate-500">
                                    {goal.current} / {goal.target}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}