export type RecurringType = "Recebimento" | "Pagamento";

export type RecurringStatus = "Ativa" | "Pausada";

export type RecurringItem = {
    id: number;
    name: string;
    category: string;
    type: RecurringType;
    amount: number;
    dueDay: number;
    frequency: "Mensal" | "Semanal" | "Anual";
    paymentMethod: string;
    account: string;
    status: RecurringStatus;
    color: string;
    initials: string;
    startDate: string;
};
