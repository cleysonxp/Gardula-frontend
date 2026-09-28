import type { LucideIcon } from "lucide-react"

export interface PlanningOverview {
    year: number
    month: number
    budget: BudgetOverview
    categorySpending: CategorySpending[]
    summary: PlanningSummary
}

export interface BudgetOverview {
    amount: number
    spent: number
    available: number
    percentageUsed: number
    isInherited: boolean
}

export interface CategorySpending {
    categoryId: number
    categoryName: string
    amount: number
    percentage: number
}

export interface PlanningCategory {
    name: string
    value: number
    percentage: number
    color: string
    icon: string
}

export interface PlanningSummary {
    availableToSpend: number
    remainingDays: number
    dailyAverage: number
    activeGoals: number
    totalGoals: number
}

export interface FinancialGoalResponse {
    id: number
    name: string
    description: string
    currentAmount: number
    targetAmount: number
    percentage: number
    targetDate: string
    icon: string
    isCompleted: boolean
    createdAt: string
    updatedAt: string
}

export interface FinancialGoal {
    name: string
    description: string
    current: number
    target: number
    percentage: number
    forecast: string
    icon: LucideIcon
    iconBackground: string
    iconColor: string
    progress: string
}