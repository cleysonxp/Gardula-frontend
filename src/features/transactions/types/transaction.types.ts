export type TransactionType = "Entrada" | "Saída" | "Transferência"

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
    accountColor?: string
    type: TransactionType
    amount: number
    paymentMethod: string
    status: TransactionStatus
    transfer?: {
        sourceAccount: {
            id: number
            name: string
            color: string
        }
        destinationAccount: {
            id: number
            name: string
            color: string
        }
    }
}