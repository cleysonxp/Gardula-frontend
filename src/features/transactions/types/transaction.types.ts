export type TransactionType = "Entrada" | "Saída"

export type TransactionStatus = "Concluída" | "Pendente"

export type Transaction = {
    id: number
    date: string
    time: string
    description: string
    observation: string
    category: string
    account: string
    accountLastFour?: string
    type: TransactionType
    amount: number
    paymentMethod: string
    status: TransactionStatus
}