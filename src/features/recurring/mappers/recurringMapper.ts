
import type { RecurringItem, RecurringType, RecurringStatus } from "../types/RecurringItem"
import type { RecurringTransactionResponse } from "../types/recurring.types"

export function mapRecurringTransaction(
    transaction: RecurringTransactionResponse,
): RecurringItem {
    const type: RecurringType =
        transaction.type === 1 ? "Recebimento" : "Pagamento"

    const status: RecurringStatus =
        transaction.isActive ? "Ativa" : "Pausada"

    const nameParts = transaction.name.trim().split(/\s+/)
    const initials = nameParts
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")

    return {
        id: transaction.id,
        name: transaction.name,
        category: transaction.categoryName,
        type,
        amount: transaction.amount,
        dueDay: transaction.dueDay,
        frequency: "Mensal",
        paymentMethod: getPaymentMethodName(transaction.paymentMethod),
        account: transaction.cardName ?? transaction.accountName ?? "Não definido",
        status,
        color: type === "Recebimento" ? "emerald" : "rose",
        initials,
        startDate: transaction.startDate,
    }
}

function getPaymentMethodName(paymentMethod: number): string {
    const methods: Record<number, string> = {
        1: "Pix",
        2: "Débito",
        3: "Cartão de crédito",
        4: "Dinheiro",
        5: "Boleto",
        6: "Outro",
        7: "Conta",
    }

    return methods[paymentMethod] ?? "Não definido"
}
