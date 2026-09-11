import { apiClient } from "@/lib/api/apiClient"

import type { TransactionDetailResponse } from "@/features/transactions/types/transactionDetailApi.types"
import type { TransactionListApiResponse } from "@/features/transactions/types/transactionApi.types"

export type GetTransactionsParams = {
    startDate?: string
    endDate?: string
    categoryId?: number
    accountId?: number
    cardId?: number
    type?: number
    search?: string
    sortOrder?: "asc" | "desc"
    page?: number
    pageSize?: number
}

export type CreateTransactionParams = {
    accountId?: number | null
    cardId?: number | null
    categoryId?: number | null
    amount: number
    type: number
    paymentMethod: number
    description: string
    date: string
    installmentGroupId?: string | null
    installmentNumber?: number | null
    totalInstallments?: number | null
}

export type UpdateTransactionParams = {
    accountId?: number | null
    cardId?: number | null
    categoryId: number
    amount: number
    type: number
    paymentMethod: number
    description: string
    date: string
}
export type UpdateInstallmentParams = {
    amount: number
    description: string
    date: string
    categoryId: number
    totalInstallments: number
}

export async function getTransactions(
    params: GetTransactionsParams = {},
): Promise<TransactionListApiResponse> {
    const searchParams = new URLSearchParams()

    if (params.startDate) {
        searchParams.set("StartDate", params.startDate)
    }

    if (params.endDate) {
        searchParams.set("EndDate", params.endDate)
    }

    if (params.categoryId !== undefined) {
        searchParams.set("CategoryId", String(params.categoryId))
    }

    if (params.accountId !== undefined) {
        searchParams.set("AccountId", String(params.accountId))
    }

    if (params.cardId !== undefined) {
        searchParams.set("CardId", String(params.cardId))
    }

    if (params.type !== undefined) {
        searchParams.set("Type", String(params.type))
    }

    if (params.search) {
        searchParams.set("Search", params.search)
    }

    if (params.sortOrder) {
        searchParams.set("SortOrder", params.sortOrder)
    }

    searchParams.set("Page", String(params.page ?? 1))
    searchParams.set("PageSize", String(params.pageSize ?? 20))

    const queryString = searchParams.toString()

    const response = await apiClient(
        `/Transactions${queryString ? `?${queryString}` : ""}`,
    )

    if (!response.ok) {
        throw new Error("Failed to load transactions.")
    }

    return response.json()
}

export async function getTransactionDetail(
    id: number,
): Promise<TransactionDetailResponse> {
    const response = await apiClient(`/Transactions/${id}`)

    if (!response.ok) {
        throw new Error("Failed to load transaction details.")
    }

    return response.json()
}

export async function createTransaction(
    params: CreateTransactionParams,
) {
    const response = await apiClient("/Transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })

    if (!response.ok) {
        throw new Error("Failed to create transaction.")
    }

    return response.json()
}

export type TransactionSummaryResponse = {
    totalIncome: number
    totalExpense: number
    balance: number
    totalTransactions: number
}

export async function getTransactionSummary(
    params: {
        startDate?: string
        endDate?: string
    } = {},
): Promise<TransactionSummaryResponse> {
    const searchParams = new URLSearchParams()

    if (params.startDate) {
        searchParams.set("StartDate", params.startDate)
    }

    if (params.endDate) {
        searchParams.set("EndDate", params.endDate)
    }

    const queryString = searchParams.toString()

    const response = await apiClient(
        `/Transactions/summary${queryString ? `?${queryString}` : ""}`,
    )

    if (!response.ok) {
        throw new Error("Failed to load transaction summary.")
    }

    return response.json()
}

export async function updateTransaction(
    id: number,
    params: UpdateTransactionParams,
) {
    const response = await apiClient(`/Transactions/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })

    if (!response.ok) {
        throw new Error("Failed to update transaction.")
    }

    return response.json()
}

export async function deleteTransaction(id: number): Promise<void> {
    const response = await apiClient(`/Transactions/${id}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error("Failed to delete transaction.")
    }
}

export async function updateInstallment(
    id: number,
    params: UpdateInstallmentParams,
) {
    const response = await apiClient(`/Transactions/${id}/installment`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })

    if (!response.ok) {
        throw new Error("Failed to update installment.")
    }

    return response.json()
}

export async function deleteInstallmentGroup(
    installmentGroupId: string,
): Promise<void> {
    const response = await apiClient(
        `/Transactions/installments/${installmentGroupId}`,
        {
            method: "DELETE",
        },
    )

    if (!response.ok) {
        throw new Error("Failed to delete installment group.")
    }
}