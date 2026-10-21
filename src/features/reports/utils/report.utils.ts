import {
    Activity,
    BriefcaseBusiness,
    CarFront,
    CircleDollarSign,
    Heart,
    Landmark,
    Utensils,
} from "lucide-react";

export const currency = (value: number) =>
    value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

export const formatCompactCurrency = (value: number) =>
    `R$ ${value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;

export const categoryIcons = {
    Alimentação: Utensils,
    Transporte: CarFront,
    Moradia: Landmark,
    Lazer: Activity,
    Saúde: Heart,
    Trabalho: BriefcaseBusiness,
    Outros: CircleDollarSign,
};

export function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        Alimentação: "bg-rose-100 text-rose-600",
        Transporte: "bg-blue-100 text-blue-600",
        Moradia: "bg-amber-100 text-amber-600",
        Lazer: "bg-sky-100 text-sky-600",
        Saúde: "bg-violet-100 text-violet-600",
        Trabalho: "bg-amber-100 text-amber-700",
        Outros: "bg-slate-100 text-slate-600",
    };

    return colors[category] ?? colors.Outros;
}