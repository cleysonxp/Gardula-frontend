import { ArrowDownRight, Clock3, TrendingUp } from "lucide-react";

type RecurringSummaryCardProps = {
    title: string;
    amount: number;
    description: string;
    icon: React.ReactNode;
    iconClass: string;
    trend: "positive" | "negative" | "neutral";
    valueType?: "currency" | "number";
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function RecurringSummaryCard({
    title,
    amount,
    description,
    icon,
    iconClass,
    trend,
    valueType = "currency",
}: RecurringSummaryCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">{title}</p>

                    <p className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                        {valueType === "currency"
                            ? currencyFormatter.format(amount)
                            : amount}
                    </p>
                </div>

                <div className={`shrink-0 rounded-xl p-3 ${iconClass}`}>
                    {icon}
                </div>
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                {trend === "positive" && (
                    <TrendingUp size={15} className="text-emerald-500" />
                )}

                {trend === "negative" && (
                    <ArrowDownRight size={15} className="text-rose-500" />
                )}

                {trend === "neutral" && (
                    <Clock3 size={15} className="text-amber-500" />
                )}

                <p className="text-xs text-slate-500">{description}</p>
            </div>
        </article>
    );
}
