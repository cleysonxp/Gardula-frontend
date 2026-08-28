export type Card = {
    id: number
    name: string
    bank: string
    lastFourDigits: string
    type: "Crédito"
    brand: "Visa" | "Mastercard"
    limit: number
    usedLimit: number
    closingDay: number
    dueDay: number
    account: string
    accountColor: string
    color: string
    status: "Ativo" | "Inativo"
}

export type CardExpense = {
    id: number
    category: string
    value: number
    color: string
}

export type CreateCardRequest = {
    accountId: number
    name: string
    lastFourDigits: string
    creditLimit: number
    closingDay: number
    dueDay: number
    brand: number
    color: string
}

export type CardOverviewResponse = {
    totalCards: number
    totalCreditLimit: number
    totalUsedLimit: number
    totalAvailableLimit: number
}

export type CardResponse = {
    id: number
    accountId: number
    name: string
    lastFourDigits: string
    creditLimit: number
    closingDay: number
    dueDay: number
    brand: number
    color: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export type CreditCardInvoice = {
    id: number
    cardId: number
    startDate: string
    closingDate: string
    dueDate: string
    totalAmount: number
    status: number
}

export type CreditCardInvoiceDetail = {
    id: number
    cardId: number
    startDate: string
    closingDate: string
    dueDate: string
    totalAmount: number
    status: number
    paidAt: string | null
    transactions: CreditCardInvoiceTransaction[]
}

export type CreditCardInvoiceTransaction = {
    id: number
    description: string
    amount: number
    date: string
    installmentNumber: number | null
    totalInstallments: number | null
}