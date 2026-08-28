import { useEffect, useState } from "react"

import { CardDetails } from "../features/cards/components/CardDetails"
import { CardsHeader } from "../features/cards/components/CardsHeader"
import { CardsOverview } from "../features/cards/components/CardsOverview"
import { CardsSummary } from "../features/cards/components/CardsSummary"
import { CardsTable } from "../features/cards/components/CardsTable"
import { CreateCardModal } from "../features/cards/components/CreateCardModal"
import { InvoiceDetails } from "../features/cards/components/InvoiceDetails"

import { getAccounts } from "../features/accounts/services/accountService"

import {
    getCardInvoiceDetails,
    getCardInvoices,
    getCards,
    getCardsOverview,
} from "../features/cards/services/cardService"

import { mapCard } from "../features/cards/mappers/cardMapper"

import type {
    Card,
    CardOverviewResponse,
    CreditCardInvoice,
    CreditCardInvoiceDetail,
} from "../features/cards/types/card.types"

type CardsData = {
    cards: Card[]
    overview: CardOverviewResponse
    invoices: CreditCardInvoice[]
}

export function CardsPage() {
    const [cards, setCards] = useState<Card[]>([])

    const [overview, setOverview] =
        useState<CardOverviewResponse | null>(null)

    const [invoices, setInvoices] =
        useState<CreditCardInvoice[]>([])

    const [selectedCardId, setSelectedCardId] =
        useState<number | null>(null)

    const [selectedInvoice, setSelectedInvoice] =
        useState<CreditCardInvoiceDetail | null>(null)

    const [isInvoiceDetailsLoading, setIsInvoiceDetailsLoading] =
        useState(false)

    const [isCreateModalOpen, setIsCreateModalOpen] =
        useState(false)

    const [isLoading, setIsLoading] =
        useState(true)

    const [error, setError] =
        useState<string | null>(null)

    const fetchCardsData = async (): Promise<CardsData> => {
        const [
            cardResponse,
            accounts,
            overviewResponse,
            invoiceResponse,
        ] = await Promise.all([
            getCards(),
            getAccounts(),
            getCardsOverview(),
            getCardInvoices(),
        ])

        const mappedCards = cardResponse.map((card) =>
            mapCard(card, accounts),
        )

        return {
            cards: mappedCards,
            overview: overviewResponse,
            invoices: invoiceResponse,
        }
    }

    useEffect(() => {
        let cancelled = false

        const loadData = async () => {
            try {
                const data = await fetchCardsData()

                if (cancelled) {
                    return
                }

                setCards(data.cards)
                setOverview(data.overview)
                setInvoices(data.invoices)
                setIsLoading(false)
            } catch (error) {
                if (cancelled) {
                    return
                }

                console.error(
                    "Erro ao carregar cartões:",
                    error,
                )

                setError(
                    "Não foi possível carregar os cartões.",
                )

                setIsLoading(false)
            }
        }

        loadData()

        return () => {
            cancelled = true
        }
    }, [])

    const selectedCard =
        cards.find(
            (card) => card.id === selectedCardId,
        ) ?? null

    const selectedInvoiceCard =
        selectedInvoice
            ? cards.find(
                  (card) =>
                      card.id === selectedInvoice.cardId,
              ) ?? null
            : null

    const handleCardSelect = (cardId: number) => {
        setSelectedCardId(cardId)
    }

    const handleBack = () => {
        setSelectedCardId(null)
    }

    const handleEditCard = (card: Card) => {
        console.log("Editar cartão:", card)
    }

    const handleDeactivateCard = (card: Card) => {
        console.log("Desativar cartão:", card)
    }

    const handleViewTransactions = (card: Card) => {
        console.log(
            "Ver transações do cartão:",
            card,
        )
    }

    const handleCreateCard = () => {
        setIsCreateModalOpen(true)
    }

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false)
    }

    const handleCardCreated = async () => {
        try {
            setError(null)

            const data = await fetchCardsData()

            setCards(data.cards)
            setOverview(data.overview)
            setInvoices(data.invoices)
        } catch (error) {
            console.error(
                "Erro ao atualizar cartões:",
                error,
            )

            setError(
                "Não foi possível atualizar os cartões.",
            )
        }
    }

    const handleViewInvoice = async (
        cardId: number,
        invoiceId: number,
    ) => {
        try {
            setIsInvoiceDetailsLoading(true)
            setSelectedInvoice(null)

            const invoice =
                await getCardInvoiceDetails(
                    cardId,
                    invoiceId,
                )

            setSelectedInvoice(invoice)
        } catch (error) {
            console.error(
                "Erro ao carregar detalhes da fatura:",
                error,
            )

            setError(
                "Não foi possível carregar os detalhes da fatura.",
            )
        } finally {
            setIsInvoiceDetailsLoading(false)
        }
    }

    const handleCloseInvoice = () => {
        setSelectedInvoice(null)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex min-h-screen">
                <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">
                    <CardsHeader
                        onCreateCard={handleCreateCard}
                    />

                    {isLoading && (
                        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
                            <p className="text-sm text-slate-500">
                                Carregando cartões...
                            </p>
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {!isLoading &&
                        !error &&
                        overview && (
                            <>
                                <CardsSummary
                                    overview={overview}
                                />

                                <CardsOverview
                                    cards={cards}
                                    onCardSelect={
                                        handleCardSelect
                                    }
                                />

                                <CardsTable
                                    cards={cards}
                                    invoices={invoices}
                                    onEditCard={
                                        handleEditCard
                                    }
                                    onViewInvoice={
                                        handleViewInvoice
                                    }
                                />
                            </>
                        )}
                </section>

                {selectedCard && (
                    <CardDetails
                        card={selectedCard}
                        onBack={handleBack}
                        onEdit={handleEditCard}
                        onDeactivate={
                            handleDeactivateCard
                        }
                        onViewTransactions={
                            handleViewTransactions
                        }
                    />
                )}
            </div>

            {selectedInvoice && (
                <InvoiceDetails
                    invoice={selectedInvoice}
                    isLoading={
                        isInvoiceDetailsLoading
                    }
                    onClose={handleCloseInvoice}
                    cardName={
                        selectedInvoiceCard?.name
                    }
                    lastFourDigits={
                        selectedInvoiceCard?.lastFourDigits
                    }
                />
            )}

            {isCreateModalOpen && (
                <CreateCardModal
                    onClose={
                        handleCloseCreateModal
                    }
                    onCreated={
                        handleCardCreated
                    }
                />
            )}
        </div>
    )
}