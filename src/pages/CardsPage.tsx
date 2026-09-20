import { useEffect, useState } from "react"
import { CheckCircle2, X } from "lucide-react"

import { getAccounts } from "../features/accounts/services/accountService"

import { CardDetails } from "../features/cards/components/CardDetails"
import { CardsHeader } from "../features/cards/components/CardsHeader"
import { CardsOverview } from "../features/cards/components/CardsOverview"
import { CardsSummary } from "../features/cards/components/CardsSummary"
import { CardsTable } from "../features/cards/components/CardsTable"
import { CreateCardModal } from "../features/cards/components/CreateCardModal"
import { EditCardModal } from "../features/cards/components/EditCardModal"
import { InvoiceDetails } from "../features/cards/components/InvoiceDetails"
import { PayInvoiceModal } from "../features/cards/components/PayInvoiceModal"

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

    const [cardToEdit, setCardToEdit] =
        useState<Card | null>(null)

    const [isPayInvoiceModalOpen, setIsPayInvoiceModalOpen] =
        useState(false)

    const [isLoading, setIsLoading] =
        useState(true)

    const [error, setError] =
        useState<string | null>(null)

    const [successMessage, setSuccessMessage] =
        useState<string | null>(null)

    const fetchCardsData = async () => {
        try {
            setError(null)

            const [
                cardsResponse,
                accountsResponse,
                overviewResponse,
                invoicesResponse,
            ] = await Promise.all([
                getCards(),
                getAccounts(),
                getCardsOverview(),
                getCardInvoices(),
            ])

            const mappedCards = cardsResponse.map(
                (card) =>
                    mapCard(
                        card,
                        accountsResponse,
                    ),
            )

            const data: CardsData = {
                cards: mappedCards,
                overview: overviewResponse,
                invoices: invoicesResponse,
            }

            setCards(data.cards)
            setOverview(data.overview)
            setInvoices(data.invoices)
        } catch (error) {
            console.error(
                "Erro ao carregar cartões:",
                error,
            )

            setError(
                "Não foi possível carregar os cartões.",
            )
        }
    }

    const loadCardsData = async () => {
        try {
            setIsLoading(true)
            await fetchCardsData()
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadCardsData()
    }, [])

    useEffect(() => {
        if (!successMessage) {
            return
        }

        const timeout = window.setTimeout(() => {
            setSuccessMessage(null)
        }, 4000)

        return () => {
            window.clearTimeout(timeout)
        }
    }, [successMessage])

    const handleCardSelect = (cardId: number) => {
        setSelectedInvoice(null)
        setSelectedCardId(cardId)
    }

    const handleCloseCardDetails = () => {
        setSelectedCardId(null)
    }

    const handleViewInvoice = async (
        cardId: number,
        invoiceId: number,
    ) => {
        try {
            setSelectedCardId(null)
            setIsInvoiceDetailsLoading(true)
            setError(null)

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
        setIsInvoiceDetailsLoading(false)
        setIsPayInvoiceModalOpen(false)
    }

    const handlePayInvoice = () => {
        if (!selectedInvoice) {
            return
        }

        setIsPayInvoiceModalOpen(true)
    }

    const handleInvoicePaid = async () => {
        await fetchCardsData()

        if (selectedInvoice) {
            try {
                const updatedInvoice =
                    await getCardInvoiceDetails(
                        selectedInvoice.cardId,
                        selectedInvoice.id,
                    )

                setSelectedInvoice(
                    updatedInvoice,
                )

                setSuccessMessage(
                    "Fatura paga com sucesso.",
                )
            } catch (error) {
                console.error(
                    "Erro ao atualizar detalhes da fatura:",
                    error,
                )

                setSuccessMessage(
                    "Fatura paga com sucesso.",
                )
            }
        }

        setIsPayInvoiceModalOpen(false)
    }

    const handleCardCreated = async () => {
        setIsCreateModalOpen(false)
        await fetchCardsData()
    }

    const handleEditCard = (card: Card) => {
        setCardToEdit(card)
    }

    const handleCardUpdated = async () => {
        setCardToEdit(null)
        await fetchCardsData()
    }

    const selectedCard =
        cards.find(
            (card) =>
                card.id === selectedCardId,
        ) ?? null

    const selectedInvoiceCard =
        selectedInvoice
            ? cards.find(
                (card) =>
                    card.id ===
                    selectedInvoice.cardId,
            ) ?? null
            : null

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm text-slate-500">
                    Carregando cartões...
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {successMessage && (
                <div className="fixed left-1/2 top-4 z-[100] w-[min(680px,calc(100%-32px))] -translate-x-1/2">
                    <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-white px-5 py-4 shadow-xl">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <CheckCircle2 size={24} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-base font-bold text-slate-950">
                                Fatura paga com sucesso!
                            </p>

                            <p className="mt-0.5 text-sm text-slate-500">
                                {successMessage}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setSuccessMessage(null)
                            }
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Fechar aviso"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex min-h-screen">
                <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">
                    <CardsHeader
                        onCreateCard={() =>
                            setIsCreateModalOpen(true)
                        }
                    />

                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {overview && (
                        <CardsSummary
                            overview={overview}
                        />
                    )}

                    <CardsOverview
                        cards={cards}
                        onCardSelect={
                            handleCardSelect
                        }
                    />

                    <CardsTable
                        cards={cards}
                        invoices={invoices}
                        onViewInvoice={
                            handleViewInvoice
                        }
                    />
                </section>

                {selectedCard && (
                    <CardDetails
                        card={selectedCard}
                        onBack={
                            handleCloseCardDetails
                        }
                        onEdit={handleEditCard}
                        onDeactivate={() => {
                            console.log(
                                "Desativar cartão:",
                                selectedCard,
                            )
                        }}
                    />
                )}

                {(selectedInvoice ||
                    isInvoiceDetailsLoading) && (
                        <InvoiceDetails
                            invoice={selectedInvoice}
                            isLoading={
                                isInvoiceDetailsLoading
                            }
                            onClose={
                                handleCloseInvoice
                            }
                            onPay={
                                handlePayInvoice
                            }
                            cardName={
                                selectedInvoiceCard?.name
                            }
                            lastFourDigits={
                                selectedInvoiceCard?.lastFourDigits
                            }
                        />
                    )}
            </div>

            {isCreateModalOpen && (
                <CreateCardModal
                    onClose={() =>
                        setIsCreateModalOpen(
                            false,
                        )
                    }
                    onCreated={
                        handleCardCreated
                    }
                />
            )}

            {cardToEdit && (
                <EditCardModal
                    card={cardToEdit}
                    onClose={() =>
                        setCardToEdit(null)
                    }
                    onUpdated={
                        handleCardUpdated
                    }
                />
            )}

            {isPayInvoiceModalOpen &&
                selectedInvoice && (
                    <PayInvoiceModal
                        invoice={selectedInvoice}
                        cardName={
                            selectedInvoiceCard?.name
                        }
                        lastFourDigits={
                            selectedInvoiceCard?.lastFourDigits
                        }
                        onClose={() =>
                            setIsPayInvoiceModalOpen(
                                false,
                            )
                        }
                        onPaid={
                            handleInvoicePaid
                        }
                    />
                )}
        </div>
    )
}