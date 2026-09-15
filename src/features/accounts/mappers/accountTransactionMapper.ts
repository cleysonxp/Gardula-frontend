import type {
    AccountOverviewTransaction,
    Transaction,
} from "@/features/accounts/types/account"

function getTransactionType(
    transaction: AccountOverviewTransaction,
): "Entrada" | "Saída" {
    if (
        transaction.type === 1 ||
        transaction.typeName.toLowerCase() === "income" ||
        transaction.typeName.toLowerCase() === "entrada"
    ) {
        return "Entrada"
    }

    return "Saída"
}

function getCategoryColor(): string {
    return "bg-slate-400"
}

function formatDate(date: string): string {
    return new Intl.DateTimeFormat("pt-BR").format(
        new Date(date),
    )
}

export function mapAccountTransaction(
    transaction: AccountOverviewTransaction,
): Transaction {
    return {
        id: transaction.id,
        date: formatDate(transaction.date),
        description: transaction.description,
        account: transaction.account?.name ?? "Sem conta",
        category: transaction.category?.name ?? "Sem categoria",
        categoryColor: getCategoryColor(),
        type: getTransactionType(transaction),
        value: transaction.amount,
    }
}