import { cards } from "../data/cards.mock"
import { CardItem } from "./CardItem"

type CardsOverviewProps = {
    onCardSelect?: (cardId: number) => void
}

export function CardsOverview({ onCardSelect }: CardsOverviewProps) {
    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-950">
                    Meus cartões
                </h2>

                <button
                    type="button"
                    className="text-sm font-medium text-violet-600 hover:text-violet-700"
                >
                    Ver todos
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {cards.map((card) => (
                    <CardItem
                        key={card.id}
                        card={card}
                        onClick={() => onCardSelect?.(card.id)}
                    />
                ))}
            </div>
        </section>
    )
}