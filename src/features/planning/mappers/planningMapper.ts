import {
    Plane,
    ShieldCheck,
    Target,
    WalletCards,
} from "lucide-react"

import type {
    FinancialGoal,
    FinancialGoalResponse,
    PlanningCategory,
    CategorySpending,
} from "@/features/planning/types/planning.types"

function getGoalIcon(icon: string) {
    switch (icon) {
        case "shield":
            return {
                icon: ShieldCheck,
                iconBackground: "bg-emerald-50",
                iconColor: "text-emerald-600",
                progress: "bg-emerald-500",
            }

        case "laptop":
            return {
                icon: WalletCards,
                iconBackground: "bg-violet-50",
                iconColor: "text-violet-600",
                progress: "bg-violet-500",
            }

        case "plane":
            return {
                icon: Plane,
                iconBackground: "bg-blue-50",
                iconColor: "text-blue-600",
                progress: "bg-blue-500",
            }

        default:
            return {
                icon: Target,
                iconBackground: "bg-amber-50",
                iconColor: "text-amber-600",
                progress: "bg-amber-500",
            }
    }
}

function formatGoalDate(date: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        month: "short",
        year: "numeric",
    })
        .format(new Date(date))
        .replace(".", "")
}

function getCategoryStyle(categoryName: string) {
    switch (categoryName) {
        case "Alimentação":
            return {
                color: "bg-rose-400",
                icon: "🍴",
            }

        case "Moradia":
            return {
                color: "bg-violet-500",
                icon: "⌂",
            }

        case "Transporte":
            return {
                color: "bg-blue-500",
                icon: "▣",
            }

        case "Lazer":
            return {
                color: "bg-emerald-400",
                icon: "●",
            }

        default:
            return {
                color: "bg-slate-400",
                icon: "•••",
            }
    }
}

export function mapFinancialGoal(
    goal: FinancialGoalResponse,
): FinancialGoal {
    const iconClasses = getGoalIcon(goal.icon)

    return {
        name: goal.name,
        description: goal.description,
        current: goal.currentAmount,
        target: goal.targetAmount,
        percentage: goal.percentage,
        forecast: formatGoalDate(goal.targetDate),
        icon: iconClasses.icon,
        iconBackground: iconClasses.iconBackground,
        iconColor: iconClasses.iconColor,
        progress: iconClasses.progress,
    }
}

export function mapFinancialGoals(
    goals: FinancialGoalResponse[],
): FinancialGoal[] {
    return goals.map(mapFinancialGoal)
}

export function mapCategorySpending(
    category: CategorySpending,
): PlanningCategory {
    const categoryStyle = getCategoryStyle(category.categoryName)

    return {
        name: category.categoryName,
        value: category.amount,
        percentage: category.percentage,
        color: categoryStyle.color,
        icon: categoryStyle.icon,
    }
}

export function mapCategoriesSpending(
    categories: CategorySpending[],
): PlanningCategory[] {
    return categories.map(mapCategorySpending)
}