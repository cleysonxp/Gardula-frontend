export type CreateTransferRequest = {
    sourceAccountId: number
    destinationAccountId: number
    amount: number
}

export type TransferResponse = {
    id: number
    sourceAccountId: number
    destinationAccountId: number
    amount: number
    createdAt: string
}