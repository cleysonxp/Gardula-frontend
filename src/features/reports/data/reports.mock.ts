import type {
    CategoryReport,
    MonthlyReport,
    Transaction,
} from "../types/report.types";

export const initialTransactions: Transaction[] = [
    { id: 1, date: "15/06/2026", description: "Supermercado", category: "Alimentação", type: "Saída", account: "Conta Principal", amount: 152.3 },
    { id: 2, date: "12/06/2026", description: "Salário", category: "Trabalho", type: "Entrada", account: "Conta Principal", amount: 3000 },
    { id: 3, date: "10/06/2026", description: "Academia", category: "Saúde", type: "Saída", account: "Conta Principal", amount: 89.9 },
    { id: 4, date: "08/06/2026", description: "Uber", category: "Transporte", type: "Saída", account: "Conta Principal", amount: 24.5 },
    { id: 5, date: "05/06/2026", description: "Restaurante", category: "Alimentação", type: "Saída", account: "Cartão Principal", amount: 78.4 },
    { id: 6, date: "03/06/2026", description: "Conta de luz", category: "Moradia", type: "Saída", account: "Conta Principal", amount: 210 },
    { id: 7, date: "01/06/2026", description: "Netflix", category: "Lazer", type: "Saída", account: "Cartão Principal", amount: 39.9 },
    { id: 8, date: "28/05/2026", description: "Salário", category: "Trabalho", type: "Entrada", account: "Conta Principal", amount: 3000 },
    { id: 9, date: "24/05/2026", description: "Farmácia", category: "Saúde", type: "Saída", account: "Conta Principal", amount: 65.8 },
    { id: 10, date: "20/05/2026", description: "Combustível", category: "Transporte", type: "Saída", account: "Cartão Principal", amount: 180 },
    { id: 11, date: "16/05/2026", description: "Aluguel", category: "Moradia", type: "Saída", account: "Conta Principal", amount: 1200 },
    { id: 12, date: "10/05/2026", description: "Freelance", category: "Trabalho", type: "Entrada", account: "Conta Principal", amount: 850 },
];

export const monthlyData: MonthlyReport[] = [
    { month: "Jan 2026", income: 4200, expenses: 3100 },
    { month: "Fev 2026", income: 4800, expenses: 3600 },
    { month: "Mar 2026", income: 5000, expenses: 2550 },
    { month: "Abr 2026", income: 4600, expenses: 3300 },
    { month: "Mai 2026", income: 5300, expenses: 3800 },
    { month: "Jun 2026", income: 5000, expenses: 2550 },
];

export const categoryData: CategoryReport[] = [
    { name: "Alimentação", value: 828.75, color: "#F04458" },
    { name: "Transporte", value: 464.1, color: "#F97316" },
    { name: "Moradia", value: 397.8, color: "#FBBF24" },
    { name: "Lazer", value: 308.55, color: "#3B82F6" },
    { name: "Saúde", value: 221.85, color: "#8B5CF6" },
    { name: "Outros", value: 328.95, color: "#CBD5E1" },
];