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