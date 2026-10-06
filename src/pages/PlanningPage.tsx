import { useEffect, useState } from "react"

import { BudgetForm } from "../features/planning/components/BudgetForm"
import { BudgetOverview } from "../features/planning/components/BudgetOverview"
import { CategorySpending } from "../features/planning/components/CategorySpending"
import { FinancialGoals } from "../features/planning/components/FinancialGoals"
import { MonthSelector } from "../features/planning/components/MonthSelector"
import { PlanningSummary } from "../features/planning/components/PlanningSummary"
import { FinancialGoalForm } from "../features/planning/components/FinancialGoalForm"
import { FinancialGoalAmountForm } from "../features/planning/components/FinancialGoalAmountForm"
import { FinancialGoalEditForm } from "../features/planning/components/FinancialGoalEditForm"

import {
    mapCategoriesSpending,
    mapFinancialGoals,
} from "../features/planning/mappers/planningMapper"

import {
    deleteFinancialGoal,
    getFinancialGoals,
    getPlanningOverview,
} from "../features/planning/services/planningService"

import type {
    FinancialGoal,
    PlanningCategory,
    PlanningOverview,
} from "../features/planning/types/planning.types"

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function PlanningPage() {
    const [overview, setOverview] =
        useState<PlanningOverview | null>(null)

    const [categories, setCategories] =
        useState<PlanningCategory[]>([])

    const [goals, setGoals] =
        useState<FinancialGoal[]>([])

    const [isLoading, setIsLoading] =
        useState(true)

    const [error, setError] =
        useState<string | null>(null)

    const [showBudgetForm, setShowBudgetForm] =
        useState(false)

    const [showGoalForm, setShowGoalForm] =
        useState(false)

    const [showGoalAmountForm, setShowGoalAmountForm] =
        useState(false)

    const [showGoalEditForm, setShowGoalEditForm] =
        useState(false)

    const [selectedGoalEditId, setSelectedGoalEditId] =
        useState<number | null>(null)

    const [selectedGoalId, setSelectedGoalId] =
        useState<number | null>(null)

    const [year, setYear] =
        useState(2026)

    const [month, setMonth] =
        useState(9)

    const fetchPlanningData = async () => {
        try {
            setError(null)

            const [
                overviewResponse,
                goalsResponse,
            ] = await Promise.all([
                getPlanningOverview(year, month),
                getFinancialGoals(),
            ])

            setOverview(overviewResponse)

            if (overviewResponse) {
                setCategories(
                    mapCategoriesSpending(
                        overviewResponse.categorySpending,
                    ),
                )
            } else {
                setCategories([])
            }

            setGoals(
                mapFinancialGoals(
                    goalsResponse,
                ),
            )
        } catch (error) {
            console.error(
                "Erro ao carregar planejamento:",
                error,
            )

            setError(
                "Não foi possível carregar o planejamento.",
            )
        }
    }

    const loadPlanningData = async () => {
        try {
            setIsLoading(true)

            await fetchPlanningData()
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadPlanningData()
    }, [year, month])

    const handlePeriodChange = (
        selectedYear: number,
        selectedMonth: number,
    ) => {
        setYear(selectedYear)
        setMonth(selectedMonth)
    }

    const handleBudgetSuccess = async () => {
        setShowBudgetForm(false)

        await loadPlanningData()
    }

    const handleGoalSuccess = async () => {
        setShowGoalForm(false)

        await loadPlanningData()
    }

    const handleAddGoalAmount = (
        goalId: number,
    ) => {
        setSelectedGoalId(goalId)
        setShowGoalAmountForm(true)
    }

    const handleEditGoal = (
        goalId: number,
    ) => {
        setSelectedGoalEditId(goalId)
        setShowGoalEditForm(true)
    }

    const handleDeleteGoal = async (
        goalId: number,
    ) => {
        const confirmed = window.confirm(
            "Tem certeza que deseja excluir esta meta?",
        )

        if (!confirmed)
            return

        try {
            setError(null)

            await deleteFinancialGoal(goalId)

            await loadPlanningData()
        } catch (error) {
            console.error(
                "Erro ao excluir meta financeira:",
                error,
            )

            setError(
                "Não foi possível excluir a meta.",
            )
        }
    }

    const handleGoalEditSuccess = async () => {
        setShowGoalEditForm(false)
        setSelectedGoalEditId(null)

        await loadPlanningData()
    }

    const handleGoalAmountSuccess = async () => {
        setShowGoalAmountForm(false)
        setSelectedGoalId(null)

        await loadPlanningData()
    }

    const selectedGoal = goals.find(
        (goal) => goal.id === selectedGoalId,
    )

    const selectedGoalEdit = goals.find(
        (goal) => goal.id === selectedGoalEditId,
    )

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm text-slate-500">
                    Carregando planejamento...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm text-red-500">
                    {error}
                </p>
            </div>
        )
    }

    if (!overview) {
        return (
            <>
                <div className="min-h-screen bg-[#F7F7FC]">
                    <div className="flex min-h-screen">
                        <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">
                            <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                                        Planejamento financeiro
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Organize seu presente e construa o seu futuro.
                                    </p>
                                </div>

                                <MonthSelector
                                    year={year}
                                    month={month}
                                    onChange={handlePeriodChange}
                                />
                            </header>

                            <div className="flex min-h-[500px] items-center justify-center">
                                <div className="text-center">
                                    <h2 className="text-lg font-bold text-slate-950">
                                        Nenhum orçamento definido
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Defina seu orçamento para começar a planejar este mês.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowBudgetForm(true)
                                        }
                                        className="mt-5 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                                    >
                                        Definir orçamento
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {showBudgetForm && (
                    <BudgetForm
                        year={year}
                        month={month}
                        isInherited={false}
                        currentAmount={0}
                        onClose={() =>
                            setShowBudgetForm(false)
                        }
                        onSuccess={handleBudgetSuccess}
                    />
                )}
            </>
        )
    }

    return (
        <div className="min-h-screen bg-[#F7F7FC]">
            <div className="flex min-h-screen">
                <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">
                    <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                                Planejamento financeiro
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Organize seu presente e construa o seu futuro.
                            </p>
                        </div>

                        <MonthSelector
                            year={year}
                            month={month}
                            onChange={handlePeriodChange}
                        />
                    </header>

                    <BudgetOverview
                        budget={overview.budget.amount}
                        spent={overview.budget.spent}
                        available={overview.budget.available}
                        usagePercentage={
                            overview.budget.percentageUsed
                        }
                        formatCurrency={formatCurrency}
                        onDefineBudget={() =>
                            setShowBudgetForm(true)
                        }
                    />

                    <div className="mb-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                        <CategorySpending
                            categories={categories}
                            formatCurrency={formatCurrency}
                        />

                        <PlanningSummary
                            availableToSpend={
                                overview.summary.availableToSpend
                            }
                            remainingDays={
                                overview.summary.remainingDays
                            }
                            dailyAverage={
                                overview.summary.dailyAverage
                            }
                            activeGoals={
                                overview.summary.activeGoals
                            }
                            totalGoals={
                                overview.summary.totalGoals
                            }
                            formatCurrency={formatCurrency}
                        />
                    </div>

                    <FinancialGoals
                        goals={goals}
                        formatCurrency={formatCurrency}
                        onCreateGoal={() =>
                            setShowGoalForm(true)
                        }
                        onAddAmount={handleAddGoalAmount}
                        onEdit={handleEditGoal}
                        onDelete={handleDeleteGoal}
                    />
                </section>
            </div>

            {showBudgetForm && (
                <BudgetForm
                    year={year}
                    month={month}
                    isInherited={
                        overview.budget.isInherited
                    }
                    currentAmount={
                        overview.budget.amount
                    }
                    onClose={() =>
                        setShowBudgetForm(false)
                    }
                    onSuccess={handleBudgetSuccess}
                />
            )}

            {showGoalForm && (
                <FinancialGoalForm
                    onClose={() =>
                        setShowGoalForm(false)
                    }
                    onSuccess={handleGoalSuccess}
                />
            )}

            {showGoalAmountForm && selectedGoal && (
                <FinancialGoalAmountForm
                    goalId={selectedGoal.id}
                    goalName={selectedGoal.name}
                    currentAmount={selectedGoal.current}
                    targetAmount={selectedGoal.target}
                    onClose={() => {
                        setShowGoalAmountForm(false)
                        setSelectedGoalId(null)
                    }}
                    onSuccess={handleGoalAmountSuccess}
                />
            )}

            {showGoalEditForm && selectedGoalEdit && (
                <FinancialGoalEditForm
                    goalId={selectedGoalEdit.id}
                    initialName={selectedGoalEdit.name}
                    initialDescription={
                        selectedGoalEdit.description
                    }
                    initialTargetAmount={
                        selectedGoalEdit.target
                    }
                    initialTargetDate={
                        selectedGoalEdit.targetDate
                    }
                    initialIcon={
                        selectedGoalEdit.iconName
                    }
                    onClose={() => {
                        setShowGoalEditForm(false)
                        setSelectedGoalEditId(null)
                    }}
                    onSuccess={handleGoalEditSuccess}
                />
            )}
        </div>
    )
}