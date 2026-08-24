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

export async function getAccountsOverview(): Promise<AccountOverviewResponse> {
    const response = await apiClient("/Accounts/overview")

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

export async function deleteAccount(id: number): Promise<void> {
    const response = await apiClient(`/Accounts/${id}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error("Failed to delete account.")
    }
}