import type { Card } from "../types/card.types"
import { CardInfo } from "./CardInfo"
import { CardVisual } from "./CardVisual"

type CardItemProps = {
    card: Card
    onClick?: () => void
}

export function CardItem({ card, onClick }: CardItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full overflow-hidden rounded-2xl text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <CardVisual card={card} />

            <CardInfo card={card} />
        </button>
    )
}