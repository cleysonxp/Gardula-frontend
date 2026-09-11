export type TransactionDetailResponse = {
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
        totalAmount: number
        firstDate: string
    } | null
    transfer: {
        id: number
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
    } | null
    createdAt: string
    updatedAt: string
}