import type { Transaction } from "@/features/transactions/types/transaction.types"
import type { TransactionDetailResponse } from "@/features/transactions/types/transactionDetailApi.types"

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

export function mapTransactionDetail(
    transaction: TransactionDetailResponse,
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
        transfer: transaction.transfer
            ? {
                sourceAccount: transaction.transfer.sourceAccount,
                destinationAccount: transaction.transfer.destinationAccount,
            }
            : undefined,
    }
}