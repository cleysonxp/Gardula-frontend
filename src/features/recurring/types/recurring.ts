export type RecurringType = "income" | "expense"

export type RecurringStatus = "active" | "paused"

export type RecurringFrequency = "monthly" | "yearly"

export type RecurringItem = {
    id: number
    description: string
    category: string
    type: RecurringType
    amount: number
    frequency: RecurringFrequency
    nextDueDate: string
    account: string
    accountType: string
    status: RecurringStatus
    icon: string
}