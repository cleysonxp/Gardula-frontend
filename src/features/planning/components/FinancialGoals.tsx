import { Plus, Target } from "lucide-react"

import { FinancialGoalCard } from "./FinancialGoalCard"

import type { FinancialGoal } from "@/features/planning/types/planning.types"

interface FinancialGoalsProps {
    goals: FinancialGoal[]
    formatCurrency: (value: number) => string
}

export function FinancialGoals({
    goals,
    formatCurrency,
}: FinancialGoalsProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Target size={20} />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-slate-950">
                            Seus objetivos
                        </h2>
                        <p className="text-sm text-slate-500">
                            Acompanhe suas metas e conquiste seus sonhos.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
                        <Plus size={17} />
                        Novo objetivo
                    </button>

                    <button type="button" className="text-sm font-medium text-violet-600 hover:text-violet-700">
                        Ver todos
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {goals.map((goal) => (
                    <FinancialGoalCard
                        key={goal.name}
                        name={goal.name}
                        description={goal.description}
                        current={goal.current}
                        target={goal.target}
                        percentage={goal.percentage}
                        forecast={goal.forecast}
                        icon={goal.icon}
                        iconBackground={goal.iconBackground}
                        iconColor={goal.iconColor}
                        progress={goal.progress}
                        formatCurrency={formatCurrency}
                    />
                ))}
            </div>
        </section>
    )
}