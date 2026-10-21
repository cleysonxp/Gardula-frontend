import { ArrowUpRight, TrendingUp } from "lucide-react";

type SummaryCardProps = {
    title: string;
    value: string;
    description: string;
    icon?: typeof TrendingUp;
    variant: "green" | "blue" | "red";
};

export function SummaryCard({
    title,
    value,
    description,
    icon: Icon = TrendingUp,
    variant,
}: SummaryCardProps) {
    const styles = {
        green: {
            icon: "bg-emerald-50 text-emerald-600",
            value: "text-emerald-600",
            change: "text-emerald-600",
        },
        blue: {
            icon: "bg-blue-50 text-blue-600",
            value: "text-slate-900",
            change: "text-emerald-600",
        },
        red: {
            icon: "bg-rose-50 text-rose-600",
            value: "text-slate-900",
            change: "text-rose-600",
        },
    };

    return (
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-600">{title}</p>
                    <p className={`mt-3 text-2xl font-bold tracking-tight ${styles[variant].value}`}>{value}</p>
                </div>
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${styles[variant].icon}`}>
                    <Icon size={21} />
                </div>
            </div>
            <p className={`mt-3 flex items-center gap-1 text-xs font-medium ${styles[variant].change}`}>
                <ArrowUpRight size={14} />
                {description}
            </p>
        </section>
    );
}