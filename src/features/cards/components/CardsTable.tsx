import { useMemo, useState } from "react"

import { cards } from "../data/cards.mock"
import type { Card } from "../types/card.types"
import { CardTableRow } from "./CardTableRow"
import { CardsTableFilters } from "./CardsTableFilters"

type CardsTableProps = {
    onEditCard?: (card: Card) => void
    onMoreCard?: (card: Card) => void
}

export function CardsTable({
    onEditCard,
    onMoreCard,
}: CardsTableProps) {
    const [search, setSearch] = useState("")

    const filteredCards = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        if (!normalizedSearch) {
            return cards
        }

        return cards.filter((card) =>
            card.name.toLowerCase().includes(normalizedSearch)
        )
    }, [search])

    return (
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-950">
                    Lista de cartões
                </h2>

                <CardsTableFilters
                    search={search}
                    onSearchChange={setSearch}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
                            <th className="px-2 py-3 font-medium">
                                Cartão
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Conta vinculada
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Limite
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Utilizado
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Disponível
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Vencimento
                            </th>

                            <th className="px-2 py-3 font-medium">
                                Status
                            </th>

                            <th className="px-2 py-3 text-right font-medium">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCards.map((card) => (
                            <CardTableRow
                                key={card.id}
                                card={card}
                                onEdit={onEditCard}
                                onMore={onMoreCard}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}