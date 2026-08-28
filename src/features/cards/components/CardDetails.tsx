import type { Card } from "../types/card.types"

import { CardActions } from "./CardActions"
import { CardDetailsHeader } from "./CardDetailsHeader"
import { CardExpenses } from "./CardExpenses"
import { CardInfoGrid } from "./CardInfoGrid"
import { CardLimit } from "./CardLimit"
import { CardLinkedAccount } from "./CardLinkedAccount"

type CardDetailsProps = {
    card: Card
    onBack?: () => void
    onEdit?: (card: Card) => void
    onDeactivate?: (card: Card) => void
    onViewTransactions?: (card: Card) => void
}

export function CardDetails({
    card,
    onBack,
    onEdit,
    onDeactivate,
    onViewTransactions,
}: CardDetailsProps) {
    return (
        <aside className="hidden w-[400px] shrink-0 border-l border-slate-200 bg-white xl:block">
            <div className="h-full overflow-y-auto px-6 py-7">
                <CardDetailsHeader
                    card={card}
                    onBack={onBack}
                />

                <CardLimit card={card} />

                <CardInfoGrid card={card} />

                <CardLinkedAccount card={card} />

                <CardExpenses
                    card={card}
                    onViewTransactions={
                        onViewTransactions
                    }
                />

                <CardActions
                    card={card}
                    onEdit={onEdit}
                    onDeactivate={onDeactivate}
                />
            </div>
        </aside>
    )
}