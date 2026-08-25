import { Wallet } from "lucide-react"

import type { Card } from "../types/card.types"

type CardLinkedAccountProps = {
    card: Card
}

export function CardLinkedAccount({
    card,
}: CardLinkedAccountProps) {
    return (
        <div className="mt-6 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">
                    <Wallet size={19} className="text-violet-600" />
                </div>

                <div>
                    <p className="text-xs text-slate-500">
                        Conta vinculada
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                        {card.account}
                    </p>
                </div>
            </div>
        </div>
    )
}