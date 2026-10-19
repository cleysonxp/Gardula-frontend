import { apiClient } from "@/lib/api/apiClient"

import type {
    CreateRecurringTransactionRequest,
    RecurringTransactionResponse,
    UpdateRecurringTransactionRequest,
} from "@/features/recurring/types/recurring.types"

export async function getRecurringTransactions(): Promise<RecurringTransactionResponse[]> {
    const response = await apiClient("/RecurringTransactions")

    if (!response.ok) {
        throw new Error("Failed to load recurring transactions.")
    }

    return response.json()
}

export async function createRecurringTransaction(
    request: CreateRecurringTransactionRequest,
): Promise<RecurringTransactionResponse> {
    const response = await apiClient("/RecurringTransactions", {
        method: "POST",
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw new Error("Failed to create recurring transaction.")
    }

    return response.json()
}

export async function updateRecurringTransaction(
    id: number,
    request: UpdateRecurringTransactionRequest,
): Promise<RecurringTransactionResponse> {
    const response = await apiClient(`/RecurringTransactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw new Error("Failed to update recurring transaction.")
    }

    return response.json()
}

export async function setRecurringTransactionStatus(
    id: number,
    isActive: boolean,
): Promise<void> {
    const response = await apiClient(
        `/RecurringTransactions/${id}/${isActive ? "activate" : "deactivate"}`,
        {
            method: "PATCH",
        },
    )

    if (!response.ok) {
        throw new Error("Failed to update recurring transaction status.")
    }
}

export async function deleteRecurringTransaction(
    id: number,
): Promise<void> {
    const response = await apiClient(`/RecurringTransactions/${id}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error("Failed to delete recurring transaction.")
    }
}