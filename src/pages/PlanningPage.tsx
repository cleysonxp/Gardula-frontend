import {
    ArrowDownRight,
    // ArrowUpRight,
    CalendarDays,
    ChevronDown,
    MoreVertical,
    PiggyBank,
    Plane,
    Plus,
    ShieldCheck,
    Target,
    TrendingUp,
    WalletCards,
} from "lucide-react"

const categories = [
    {
        name: "Alimentação",
        value: 850,
        percentage: 30.9,
        color: "bg-rose-400",
        icon: "🍴",
    },
    {
        name: "Moradia",
        value: 800,
        percentage: 29.1,
        color: "bg-violet-500",
        icon: "⌂",
    },
    {
        name: "Transporte",
        value: 420,
        percentage: 15.3,
        color: "bg-blue-500",
        icon: "▣",
    },
    {
        name: "Lazer",
        value: 380,
        percentage: 13.8,
        color: "bg-emerald-400",
        icon: "●",
    },
    {
        name: "Outros",
        value: 300,
        percentage: 10.9,
        color: "bg-slate-400",
        icon: "•••",
    },
]

const goals = [
    {
        name: "Reserva de emergência",
        description: "Mais segurança para o futuro.",
        current: 8000,
        target: 10000,
        percentage: 80,
        forecast: "Dez 2026",
        icon: ShieldCheck,
        iconBackground: "bg-emerald-50",
        iconColor: "text-emerald-600",
        progress: "bg-emerald-500",
    },
    {
        name: "Comprar um notebook",
        description: "Para estudos e trabalho.",
        current: 2500,
        target: 5000,
        percentage: 50,
        forecast: "Fev 2027",
        icon: WalletCards,
        iconBackground: "bg-violet-50",
        iconColor: "text-violet-600",
        progress: "bg-violet-500",
    },
    {
        name: "Viagem para o Japão",
        description: "Realizar esse sonho!",
        current: 1200,
        target: 8000,
        percentage: 15,
        forecast: "Out 2027",
        icon: Plane,
        iconBackground: "bg-blue-50",
        iconColor: "text-blue-600",
        progress: "bg-blue-500",
    },
    {
        name: "Entrada do apartamento",
        description: "Meu apê próprio.",
        current: 15000,
        target: 50000,
        percentage: 30,
        forecast: "Dez 2028",
        icon: Target,
        iconBackground: "bg-amber-50",
        iconColor: "text-amber-600",
        progress: "bg-amber-500",
    },
]

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function PlanningPage() {
    const budget = 4000
    const spent = 2750
    const available = budget - spent
    const usagePercentage = (spent / budget) * 100
    const daysRemaining = 10
    const dailyAverage = available / daysRemaining

    return (
        <div className="min-h-screen bg-[#F7F7FC]">
            <div className="flex min-h-screen">
                <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">                    
                        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                                    Planejamento financeiro
                                </h1>
                                <p className="mt-1 text-sm text-slate-500">
                                    Organize seu presente e construa o seu futuro.
                                </p>
                            </div>

                            <button type="button" className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                                <CalendarDays size={18} />
                                Setembro 2026
                                <ChevronDown size={16} />
                            </button>
                        </header>

                        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-7 xl:flex-row xl:items-center">
                                <div className="min-w-0 flex-1">
                                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                                <PiggyBank size={22} />
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-bold text-slate-950">
                                                    Orçamento do mês
                                                </h2>
                                                <p className="text-sm text-slate-500">
                                                    Acompanhe seu limite de gastos e mantenha o controle.
                                                </p>
                                            </div>
                                        </div>

                                        <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-violet-600 transition hover:bg-violet-50">
                                            <Target size={16} />
                                            Definir orçamento
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 border-t border-slate-100 pt-6 sm:grid-cols-3">
                                        <div>
                                            <p className="text-2xl font-bold text-slate-950">
                                                {formatCurrency(budget)}
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-violet-600">
                                                Orçamento
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-2xl font-bold text-slate-950">
                                                {formatCurrency(spent)}
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-rose-500">
                                                Gasto
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-2xl font-bold text-emerald-600">
                                                {formatCurrency(available)}
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-emerald-600">
                                                Disponível
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="mb-2 flex items-center justify-between gap-3">
                                            <span className="text-sm text-slate-500">
                                                {formatCurrency(spent)} de {formatCurrency(budget)}
                                            </span>
                                            <span className="text-sm font-semibold text-slate-700">
                                                {usagePercentage.toFixed(1).replace(".", ",")}%
                                            </span>
                                        </div>

                                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                            <div className="h-full rounded-full bg-violet-600" style={{ width: `${usagePercentage}%` }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4 xl:w-[360px] xl:flex-row">
                                    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#7c3aed ${usagePercentage}%, #e5e7eb 0)` }}>
                                        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                                            <span className="text-2xl font-bold text-slate-950">
                                                {usagePercentage.toFixed(1).replace(".", ",")}%
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                utilizado
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-violet-50 px-5 py-4">
                                        <p className="text-sm font-semibold text-slate-900">
                                            Você ainda tem
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600">
                                            <span className="font-bold text-slate-900">{formatCurrency(available)}</span> disponível para gastar este mês.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="mb-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mb-6 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                            <TrendingUp size={20} />
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-slate-950">
                                                Gastos por categoria
                                            </h2>
                                            <p className="text-sm text-slate-500">
                                                Veja como seu dinheiro está sendo utilizado.
                                            </p>
                                        </div>
                                    </div>

                                    <button type="button" className="text-sm font-medium text-violet-600 hover:text-violet-700">
                                        Ver detalhes
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {categories.map((category) => (
                                        <div key={category.name} className="grid grid-cols-[130px_1fr_90px_55px] items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-xs text-slate-600">
                                                    {category.icon}
                                                </span>
                                                <span className="text-sm text-slate-700">
                                                    {category.name}
                                                </span>
                                            </div>

                                            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                                                <div className={`h-full rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }} />
                                            </div>

                                            <span className="text-right text-sm font-medium text-slate-700">
                                                {formatCurrency(category.value)}
                                            </span>

                                            <span className="text-right text-sm text-slate-500">
                                                {category.percentage.toFixed(1).replace(".", ",")}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                        <TrendingUp size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-slate-950">
                                            Resumo rápido
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Uma visão geral do seu planejamento.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
                                    <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600">
                                            <span className="text-lg font-bold">R$</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">
                                                {formatCurrency(available)}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Disponível para gastar
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600">
                                            <CalendarDays size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">
                                                {daysRemaining} dias
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Restantes no mês
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-600">
                                            <ArrowDownRight size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">
                                                {formatCurrency(dailyAverage)}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Média de gastos por dia
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl bg-rose-50 p-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-rose-600">
                                            <Target size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">
                                                2 de 4
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Objetivos em andamento
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                        <Target size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-slate-950">
                                            Seus objetivos
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Acompanhe suas metas e conquiste seus sonhos.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
                                        <Plus size={17} />
                                        Novo objetivo
                                    </button>

                                    <button type="button" className="text-sm font-medium text-violet-600 hover:text-violet-700">
                                        Ver todos
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                {goals.map((goal) => {
                                    const Icon = goal.icon

                                    return (
                                        <article key={goal.name} className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm">
                                            <div className="mb-4 flex items-start justify-between gap-3">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${goal.iconBackground} ${goal.iconColor}`}>
                                                    <Icon size={19} />
                                                </div>

                                                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-600" aria-label={`Mais opções para ${goal.name}`}>
                                                    <MoreVertical size={17} />
                                                </button>
                                            </div>

                                            <h3 className="text-sm font-bold text-slate-900">
                                                {goal.name}
                                            </h3>

                                            <p className="mt-1 min-h-5 text-xs text-slate-500">
                                                {goal.description}
                                            </p>

                                            <div className="mt-5 flex items-end justify-between gap-2">
                                                <p className="text-sm font-bold text-slate-900">
                                                    {formatCurrency(goal.current)}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    de {formatCurrency(goal.target)}
                                                </p>
                                            </div>

                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                                                    <div className={`h-full rounded-full ${goal.progress}`} style={{ width: `${goal.percentage}%` }} />
                                                </div>

                                                <span className="text-xs font-medium text-slate-600">
                                                    {goal.percentage}%
                                                </span>
                                            </div>

                                            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
                                                <CalendarDays size={14} />
                                                Previsão: {goal.forecast}
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        </section>                    
                </section>
            </div>
        </div>

        // <div className="min-h-screen bg-slate-50">

        // </div>
    )
}
