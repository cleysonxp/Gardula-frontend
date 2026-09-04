export type TransactionListResponse = {
    id: number
    description: string
    amount: number
    date: string
    type: number
    typeName: string
    paymentMethod: number
    paymentMethodName: string
    category: {
        id: number
        name: string
    } | null
    account: {
        id: number
        name: string
        color: string
    } | null
    card: {
        id: number
        name: string
        lastFourDigits: string
    } | null
    installment: {
        groupId: string
        number: number
        total: number
    } | null
    transfer: {
        id: number
        sourceAccountId: number
        destinationAccountId: number
    } | null
}

export type TransactionListApiResponse = {
    items: TransactionListResponse[]
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
}