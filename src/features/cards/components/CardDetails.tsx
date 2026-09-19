import type { Card } from "../types/card.types"

import { CardActions } from "./CardActions"
import { CardDetailsHeader } from "./CardDetailsHeader"
import { CardInfoGrid } from "./CardInfoGrid"
import { CardLimit } from "./CardLimit"
import { CardLinkedAccount } from "./CardLinkedAccount"

type CardDetailsProps = {
    card: Card
    onBack?: () => void
    onEdit?: (card: Card) => void
    onDeactivate?: (card: Card) => void
}

export function CardDetails({
    card,
    onBack,
    onEdit,
    onDeactivate,
}: CardDetailsProps) {
    return (
        <aside className="sticky top-0 hidden h-screen w-[400px] shrink-0 self-start border-l border-slate-200 bg-white xl:flex xl:flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-7">
                <CardDetailsHeader
                    card={card}
                    onBack={onBack}
                />

                <CardLimit card={card} />

                <CardInfoGrid card={card} />

                <CardLinkedAccount card={card} />
            </div>

            <div className="shrink-0 border-t border-slate-200 px-6 py-5">
                <CardActions
                    card={card}
                    onEdit={onEdit}
                    onDeactivate={onDeactivate}
                />
            </div>
        </aside>
    )
}