import type { Transaction } from "@/features/transactions/types/transaction.types"
import type { TransactionListResponse } from "@/features/transactions/types/transactionApi.types"

function formatDate(date: string): string {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date))
}

function formatTime(date: string): string {
    return new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date))
}

function mapTransactionType(typeName: string): Transaction["type"] {
    switch (typeName) {
        case "Income":
            return "Entrada"
        case "Expense":
            return "Saída"
        case "Transfer":
            return "Transferência"
        default:
            return "Saída"
    }
}

export function mapTransaction(
    transaction: TransactionListResponse,
): Transaction {
    const accountName = transaction.account?.name ?? transaction.card?.name ?? "—"
    const accountLastFour = transaction.card?.lastFourDigits
    const accountColor = transaction.account?.color

    return {
        id: transaction.id,
        date: formatDate(transaction.date),
        time: formatTime(transaction.date),
        description: transaction.description,
        observation: "",
        category: transaction.category?.name ?? "—",
        account: accountName,
        accountLastFour,
        accountColor,
        type: mapTransactionType(transaction.typeName),
        amount: transaction.amount,
        paymentMethod: transaction.paymentMethodName,
        status: "Concluída",
    }
}

export function mapTransactions(
    transactions: TransactionListResponse[],
): Transaction[] {
    return transactions.map(mapTransaction)
}