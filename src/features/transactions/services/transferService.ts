import { apiClient } from "@/lib/api/apiClient"

import type {
    CreateTransferRequest,
    TransferResponse,
} from "@/features/transactions/types/transfer.types"

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