export type Account = {
    id: number
    name: string
    type: string
    balance: number
    income: number
    expenses: number
    initial: string
    icon: string
    color: string
    textColor: string
}

export type Transaction = {
    id: number
    date: string
    description: string
    account: string
    category: string
    categoryColor: string
    type: "Entrada" | "Saída"
    value: number
}

export type AccountTransaction = {
    date: string
    description: string
    value: number
    type: "Entrada" | "Saída"
}