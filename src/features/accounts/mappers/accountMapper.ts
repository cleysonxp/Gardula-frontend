import type {
    Account,
    AccountOverviewItem,
} from "@/features/accounts/types/account"

function getAccountTypeLabel(type: number): string {
    switch (type) {
        case 1:
            return "Conta corrente"
        case 2:
            return "Conta poupança"
        case 3:
            return "Dinheiro em espécie"
        case 4:
            return "Investimentos"
        default:
            return "Outro"
    }
}

function getColorClasses(color: string) {
    switch (color) {
        case "blue":
            return {
                color: "bg-blue-600",
                textColor: "text-blue-600",
            }

        case "violet":
            return {
                color: "bg-violet-600",
                textColor: "text-violet-600",
            }

        case "emerald":
            return {
                color: "bg-emerald-600",
                textColor: "text-emerald-600",
            }

        default:
            return {
                color: "bg-slate-600",
                textColor: "text-slate-600",
            }
    }
}

export function mapAccount(
    account: AccountOverviewItem
): Account {
    const colorClasses = getColorClasses(account.color)

    const initial = account.name
        .trim()
        .charAt(0)
        .toUpperCase()

    return {
        id: account.id,
        name: account.name,
        type: getAccountTypeLabel(account.type),
        balance: account.currentBalance,
        income: account.income,
        expenses: account.expense,
        initial,
        icon: account.type === 3 ? "wallet" : initial,
        color: colorClasses.color,
        textColor: colorClasses.textColor,
    }
}