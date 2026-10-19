export const TransactionType = {
    Income: 1,
    Expense: 2,
    Transfer: 3,
    CreditCardInvoicePayment: 4,
} as const

export type TransactionType =
    (typeof TransactionType)[keyof typeof TransactionType]

export const PaymentMethod = {
    Pix: 1,
    Debit: 2,
    CreditCard: 3,
    Cash: 4,
    BankSlip: 5,
    Other: 6,
    Account: 7,
} as const

export type PaymentMethod =
    (typeof PaymentMethod)[keyof typeof PaymentMethod]

export type RecurringTransactionResponse = {
    id: number
    name: string
    type: TransactionType
    amount: number
    categoryId: number
    categoryName: string
    paymentMethod: PaymentMethod
    accountId: number | null
    accountName: string | null
    cardId: number | null
    cardName: string | null
    dueDay: number
    startDate: string
    endDate: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export type CreateRecurringTransactionRequest = {
    name: string
    type: TransactionType
    amount: number
    categoryId: number
    paymentMethod: PaymentMethod
    accountId: number | null
    cardId: number | null
    dueDay: number
    startDate: string
    endDate: string | null
}

export type UpdateRecurringTransactionRequest =
    CreateRecurringTransactionRequest