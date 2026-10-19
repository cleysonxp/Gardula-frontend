import {
    ArrowDownRight,
    CalendarClock,
    TrendingUp,
    Wallet,
} from "lucide-react";

import { RecurringSummaryCard } from "./RecurringSummaryCard";

type RecurringSummaryProps = {
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyBalance: number;
    nextSevenDaysCount: number;
};

export function RecurringSummary({
    monthlyIncome,
    monthlyExpenses,
    monthlyBalance,
    nextSevenDaysCount,
}: RecurringSummaryProps) {
    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <RecurringSummaryCard
                title="Recebimentos mensais"
                amount={monthlyIncome}
                description="Total de recebimentos ativos"
                icon={<TrendingUp size={20} />}
                iconClass="bg-emerald-50 text-emerald-600"
                trend="positive"
            />

            <RecurringSummaryCard
                title="Pagamentos mensais"
                amount={monthlyExpenses}
                description="Total de pagamentos ativos"
                icon={<ArrowDownRight size={20} />}
                iconClass="bg-rose-50 text-rose-600"
                trend="negative"
            />

            <RecurringSummaryCard
                title="Saldo recorrente"
                amount={monthlyBalance}
                description="Recebimentos menos pagamentos"
                icon={<Wallet size={20} />}
                iconClass="bg-blue-50 text-blue-600"
                trend="neutral"
            />

            <RecurringSummaryCard
                title="Próximos 7 dias"
                amount={nextSevenDaysCount}
                description="Recorrências com vencimento próximo"
                icon={<CalendarClock size={20} />}
                iconClass="bg-amber-50 text-amber-600"
                trend="neutral"
                valueType="number"
            />
        </section>
    );
}