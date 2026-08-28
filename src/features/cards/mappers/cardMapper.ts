import type { AccountResponse } from "@/features/accounts/services/accountService"
import type { Card, CardResponse } from "@/features/cards/types/card.types"

function getBrandLabel(brand: number): Card["brand"] {
    switch (brand) {
        case 1:
            return "Visa"

        case 2:
            return "Mastercard"

        default:
            return "Visa"
    }
}

function getColorClasses(color: string) {
    switch (color) {
        case "blue":
            return {
                color: "bg-blue-600",
            }

        case "violet":
            return {
                color: "bg-violet-600",
            }

        case "green":
            return {
                color: "bg-emerald-600",
            }

        case "orange":
            return {
                color: "bg-orange-500",
            }

        case "red":
            return {
                color: "bg-red-600",
            }

        case "pink":
            return {
                color: "bg-pink-500",
            }

        case "amber":
            return {
                color: "bg-amber-500",
            }

        default:
            return {
                color: "bg-slate-700",
            }
    }
}

export function mapCard(
    card: CardResponse,
    accounts: AccountResponse[],
): Card {
    const account = accounts.find(
        (account) => account.id === card.accountId,
    )

    const colorClasses = getColorClasses(card.color)

    return {
        id: card.id,
        name: card.name,
        bank: account?.name ?? "Conta não encontrada",
        lastFourDigits: card.lastFourDigits,
        type: "Crédito",
        brand: getBrandLabel(card.brand),
        limit: card.creditLimit,
        usedLimit: 0,
        closingDay: card.closingDay,
        dueDay: card.dueDay,
        account: account?.name ?? "Conta não encontrada",
        accountColor: account?.color ?? "slate",
        color: colorClasses.color,
        status: card.isActive ? "Ativo" : "Inativo",
    }
}