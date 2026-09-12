import { apiClient } from "@/lib/api/apiClient"

import type {
    AccountOverviewResponse,
} from "@/features/accounts/types/account"

type CreateAccountRequest = {
    name: string
    type: number
    initialBalance: number
    color: string
}

export type AccountResponse = {
    id: number
    name: string
    type: number
    initialBalance: number
    color: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export async function getAccountsOverview(
    startDate?: string,
    endDate?: string,
): Promise<AccountOverviewResponse> {
    const params = new URLSearchParams()

    if (startDate) {
        params.set("StartDate", startDate)
    }

    if (endDate) {
        params.set("EndDate", endDate)
    }

    const queryString = params.toString()

    const response = await apiClient(
        `/Accounts/overview${queryString ? `?${queryString}` : ""}`,
    )

    if (!response.ok) {
        throw new Error("Failed to load accounts overview.")
    }

    return response.json()
}

export async function createAccount(
    request: CreateAccountRequest,
): Promise<void> {
    const response = await apiClient("/Accounts", {
        method: "POST",
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw new Error("Failed to create account.")
    }
}

export async function deleteAccount(
    id: number,
): Promise<void> {
    const response = await apiClient(`/Accounts/${id}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error("Failed to delete account.")
    }
}

export async function getAccounts(): Promise<AccountResponse[]> {
    const response = await apiClient("/Accounts")

    if (!response.ok) {
        throw new Error("Failed to load accounts.")
    }

    return response.json()
}