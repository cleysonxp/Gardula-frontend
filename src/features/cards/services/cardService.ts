import { apiClient } from "@/lib/api/apiClient"

import type {
    CardOverviewResponse,
    CardResponse,
    CreateCardRequest,
    CreditCardInvoice,
    CreditCardInvoiceDetail,
} from "@/features/cards/types/card.types"

export async function createCard(
    request: CreateCardRequest,
): Promise<void> {
    const response = await apiClient("/Cards", {
        method: "POST",
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw new Error("Failed to create card.")
    }
}

export async function getCards(): Promise<CardResponse[]> {
    const response = await apiClient("/Cards")

    if (!response.ok) {
        throw new Error("Failed to load cards.")
    }

    return response.json()
}

export async function getCardsOverview(): Promise<CardOverviewResponse> {
    const response = await apiClient("/Cards/overview")

    if (!response.ok) {
        throw new Error("Failed to load cards overview.")
    }

    return response.json()
}

export async function getCardInvoices(): Promise<CreditCardInvoice[]> {
    const response = await apiClient("/Cards/invoices")

    if (!response.ok) {
        throw new Error("Failed to load card invoices.")
    }

    return response.json()
}

export async function getCardInvoiceDetails(
    cardId: number,
    invoiceId: number,
): Promise<CreditCardInvoiceDetail> {
    const response = await apiClient(
        `/Cards/${cardId}/invoices/${invoiceId}`,
    )

    if (!response.ok) {
        throw new Error("Failed to load card invoice details.")
    }

    return response.json()
}