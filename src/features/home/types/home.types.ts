export interface HomeOverviewResponse {
    year: number
    month: number
    totalBalance: number
    monthlySummary: TransactionSummaryResponse
    budget: BudgetOverviewResponse
    categorySpending: CategorySpendingResponse[]
    goals: FinancialGoalResponse[]
    cards: CardOverviewResponse
    cardItems: HomeCardResponse[]
    recentTransactions: TransactionListResponse[]
}

export interface TransactionSummaryResponse {
    totalIncome: number
    totalExpense: number
    balance: number
    totalTransactions: number
}

export interface BudgetOverviewResponse {
    amount: number
    spent: number
    available: number
    percentageUsed: number
    isInherited: boolean
}

export interface CategorySpendingResponse {
    categoryId: number
    categoryName: string
    amount: number
    percentage: number
}

export interface FinancialGoalResponse {
    id: number
    name: string
    description: string
    currentAmount: number
    targetAmount: number
    percentage: number
    targetDate: string
    icon: string
    isCompleted: boolean
    createdAt: string
    updatedAt: string
}

export interface CardOverviewResponse {
    totalCards: number
    totalCreditLimit: number
    totalUsedLimit: number
    totalAvailableLimit: number
}

export interface HomeCardResponse {
    id: number
    name: string
    lastFourDigits: string
    creditLimit: number
    usedLimit: number
    availableLimit: number
    invoiceAmount: number | null
    invoiceDueDate: string | null
    invoiceStatus: number | null
}

export interface TransactionListResponse {
    id: number
    description: string
    amount: number
    date: string
    type: number
    typeName: string
    paymentMethod: number
    paymentMethodName: string
    category: TransactionCategoryResponse | null
    account: TransactionAccountResponse | null
    card: TransactionCardResponse | null
    installment: TransactionInstallmentResponse | null
    transfer: TransactionTransferResponse | null
}

export interface TransactionCategoryResponse {
    id: number
    name: string
}

export interface TransactionAccountResponse {
    id: number
    name: string
    color: string
}

export interface TransactionCardResponse {
    id: number
    name: string
    lastFourDigits: string
}

export interface TransactionInstallmentResponse {
    groupId: string
    number: number
    total: number
}

export interface TransactionTransferResponse {
    [key: string]: unknown
}