import { useState } from "react"

import { CardDetails } from "../features/cards/components/CardDetails"
import { CardsHeader } from "../features/cards/components/CardsHeader"
import { CardsOverview } from "../features/cards/components/CardsOverview"
import { CardsSummary } from "../features/cards/components/CardsSummary"
import { CardsTable } from "../features/cards/components/CardsTable"
import { CreateCardModal } from "../features/cards/components/CreateCardModal"
import { cards } from "../features/cards/data/cards.mock"
import type { Card } from "../features/cards/types/card.types"

export function CardsPage() {
    const [selectedCardId, setSelectedCardId] = useState<number | null>(
        cards[0]?.id ?? null
    )

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const selectedCard =
        cards.find((card) => card.id === selectedCardId) ?? null

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
        console.log("Ver transações do cartão:", card)
    }

    const handleCreateCard = () => {
        setIsCreateModalOpen(true)
    }

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex min-h-screen">
                <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">
                    <CardsHeader
                        onCreateCard={handleCreateCard}
                    />

                    <CardsSummary />

                    <CardsOverview
                        onCardSelect={handleCardSelect}
                    />

                    <CardsTable
                        onEditCard={handleEditCard}
                    />
                </section>

                {selectedCard && (
                    <CardDetails
                        card={selectedCard}
                        onBack={handleBack}
                        onEdit={handleEditCard}
                        onDeactivate={handleDeactivateCard}
                        onViewTransactions={handleViewTransactions}
                    />
                )}
            </div>

            {isCreateModalOpen && (
                <CreateCardModal
                    onClose={handleCloseCreateModal}
                />
            )}
        </div>
    )
}