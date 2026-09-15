export type AccountOverviewItem = {
    id: number
    name: string
    type: number
    color: string
    isActive: boolean
    currentBalance: number
    income: number
    expense: number
}

export type AccountOverviewTransaction = {
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

export type AccountOverviewResponse = {
    totalBalance: number
    activeAccounts: number
    totalIncome: number
    totalExpense: number
    accounts: AccountOverviewItem[]
    recentTransactions: AccountOverviewTransaction[]
}

// ---------------------------------------------------------------------------

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