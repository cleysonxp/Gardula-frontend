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