export type Transaction = {
    id: number;
    date: string;
    description: string;
    category: string;
    type: "Entrada" | "Saída";
    account: string;
    amount: number;
};

export type Period = "3 meses" | "6 meses" | "Este ano" | "Personalizado";

export type CategoryReport = {
    name: string;
    value: number;
    color: string;
};

export type MonthlyReport = {
    month: string;
    income: number;
    expenses: number;
};

export type ReportResponse = {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    totalTransactions: number;
    monthlyEvolution: MonthlyEvolutionResponse[];
    categorySpending: ReportCategorySpendingResponse[];
};

export type MonthlyEvolutionResponse = {
    year: number;
    month: number;
    totalIncome: number;
    totalExpense: number;
};

export type ReportCategorySpendingResponse = {
    categoryId: number;
    categoryName: string;
    amount: number;
    percentage: number;
};