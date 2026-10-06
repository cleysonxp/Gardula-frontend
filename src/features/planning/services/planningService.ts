import { apiClient } from "@/lib/api/apiClient"

import type {
    FinancialGoalResponse,
    PlanningOverview,
} from "@/features/planning/types/planning.types"

export async function getPlanningOverview(
    year: number,
    month: number,
): Promise<PlanningOverview | null> {
    const response = await apiClient(
        `/Planning/overview?year=${year}&month=${month}`,
    )

    if (response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new Error("Failed to load planning overview.")
    }

    return response.json()
}

export async function createMonthlyBudget(
    year: number,
    month: number,
    request: {
        amount: number
    },
): Promise<void> {
    const response = await apiClient(
        `/Planning/budget?year=${year}&month=${month}`,
        {
            method: "POST",
            body: JSON.stringify(request),
        },
    )

    if (!response.ok) {
        throw new Error("Failed to create monthly budget.")
    }
}

export async function updateMonthlyBudget(
    year: number,
    month: number,
    request: {
        amount: number
    },
): Promise<void> {
    const response = await apiClient(
        `/Planning/budget?year=${year}&month=${month}`,
        {
            method: "PUT",
            body: JSON.stringify(request),
        },
    )

    if (!response.ok) {
        throw new Error("Failed to update monthly budget.")
    }
}

export async function getFinancialGoals(): Promise<
    FinancialGoalResponse[]
> {
    const response = await apiClient("/Planning/goals")

    if (!response.ok) {
        throw new Error("Failed to load financial goals.")
    }

    return response.json()
}

export async function createFinancialGoal(
    request: {
        name: string
        description: string
        targetAmount: number
        targetDate: string
        icon: string
    },
): Promise<void> {
    const response = await apiClient(
        "/Planning/goals",
        {
            method: "POST",
            body: JSON.stringify(request),
        },
    )

    if (!response.ok) {
        throw new Error("Failed to create financial goal.")
    }
}

export async function updateFinancialGoal(
    goalId: number,
    request: {
        name: string
        description: string
        targetAmount: number
        targetDate: string
        icon: string
    },
): Promise<void> {
    const response = await apiClient(
        `/Planning/goals/${goalId}`,
        {
            method: "PUT",
            body: JSON.stringify(request),
        },
    )

    if (!response.ok) {
        throw new Error("Failed to update financial goal.")
    }
}

export async function addFinancialGoalAmount(
    goalId: number,
    amount: number,
): Promise<void> {
    const response = await apiClient(
        `/Planning/goals/${goalId}/amount`,
        {
            method: "POST",
            body: JSON.stringify({
                amount,
            }),
        },
    )

    if (!response.ok) {
        throw new Error(
            "Failed to add financial goal amount.",
        )
    }
}

export async function deleteFinancialGoal(
    goalId: number,
): Promise<void> {
    const response = await apiClient(
        `/Planning/goals/${goalId}`,
        {
            method: "DELETE",
        },
    )

    if (!response.ok) {
        throw new Error(
            "Failed to delete financial goal.",
        )
    }
}