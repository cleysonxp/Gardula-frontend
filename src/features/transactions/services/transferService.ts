import { apiClient } from "@/lib/api/apiClient"

import type {
    CreateTransferRequest,
    TransferResponse,
} from "@/features/transactions/types/transfer.types"

export type UpdateTransferRequest = {
    sourceAccountId: number
    destinationAccountId: number
    amount: number
}

export async function createTransfer(
    request: CreateTransferRequest,
): Promise<TransferResponse> {
    const response = await apiClient("/Transfers", {
        method: "POST",
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw new Error("Failed to create transfer.")
    }

    return response.json()
}

export async function getTransfer(
    id: number,
): Promise<TransferResponse> {
    const response = await apiClient(`/Transfers/${id}`)

    if (!response.ok) {
        throw new Error("Failed to load transfer.")
    }

    return response.json()
}

export async function updateTransfer(
    id: number,
    request: UpdateTransferRequest,
): Promise<TransferResponse> {
    const response = await apiClient(`/Transfers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw new Error("Failed to update transfer.")
    }

    return response.json()
}

export async function deleteTransfer(
    id: number,
): Promise<void> {
    const response = await apiClient(`/Transfers/${id}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error("Failed to delete transfer.")
    }
}