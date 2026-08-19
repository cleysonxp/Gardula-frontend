import {
    ArrowLeft,
    CreditCard,
    MoreVertical,
    Plus,
    Search,
    Wallet,
    Pencil,
    CircleCheck,
    CircleX,
} from "lucide-react"

type Card = {
    id: number
    name: string
    bank: string
    lastFourDigits: string
    type: "Crédito"
    brand: "Visa" | "Mastercard"
    limit: number
    usedLimit: number
    closingDay: number
    dueDay: number
    account: string
    accountColor: string
    color: string
    status: "Ativo" | "Inativo"
}

type CardExpense = {
    id: number
    category: string
    value: number
    color: string
}

const cards: Card[] = [
    {
        id: 1,
        name: "Nubank",
        bank: "Nubank",
        lastFourDigits: "1234",
        type: "Crédito",
        brand: "Mastercard",
        limit: 7500,
        usedLimit: 2250,
        closingDay: 3,
        dueDay: 10,
        account: "Conta principal",
        accountColor: "bg-violet-600",
        color: "bg-violet-600",
        status: "Ativo",
    },
    {
        id: 2,
        name: "Itaú",
        bank: "Itaú",
        lastFourDigits: "5678",
        type: "Crédito",
        brand: "Visa",
        limit: 10000,
        usedLimit: 3600,
        closingDay: 8,
        dueDay: 15,
        account: "Conta salário",
        accountColor: "bg-blue-600",
        color: "bg-blue-600",
        status: "Ativo",
    },
    {
        id: 3,
        name: "Bradesco",
        bank: "Bradesco",
        lastFourDigits: "9012",
        type: "Crédito",
        brand: "Mastercard",
        limit: 6000,
        usedLimit: 1500,
        closingDay: 28,
        dueDay: 5,
        account: "Conta reserva",
        accountColor: "bg-orange-500",
        color: "bg-slate-800",
        status: "Ativo",
    },
]

/*
 * Mock temporário.
 *
 * Futuramente esses dados não ficarão dentro de Card.
 * Eles deverão vir de Transactions agrupadas por categoria.
 */
const cardExpenses: CardExpense[] = [
    {
        id: 1,
        category: "Alimentação",
        value: 850,
        color: "bg-orange-500",
    },
    {
        id: 2,
        category: "Transporte",
        value: 420,
        color: "bg-blue-600",
    },
    {
        id: 3,
        category: "Assinaturas",
        value: 280,
        color: "bg-violet-600",
    },
    {
        id: 4,
        category: "Lazer",
        value: 350,
        color: "bg-pink-500",
    },
    {
        id: 5,
        category: "Outros",
        value: 350,
        color: "bg-slate-400",
    },
]

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function getAvailableLimit(card: Card) {
    return card.limit - card.usedLimit
}

function getUsagePercentage(card: Card) {
    return (card.usedLimit / card.limit) * 100
}

function getBrandLabel(brand: Card["brand"]) {
    return brand === "Visa" ? "VISA" : "MASTERCARD"
}

function formatDay(day: number) {
    return day.toString().padStart(2, "0")
}

export function CardsPage() {
    const selectedCard = cards[0]

    const totalLimit = cards.reduce(
        (total, card) => total + card.limit,
        0
    )

    const totalUsedLimit = cards.reduce(
        (total, card) => total + card.usedLimit,
        0
    )

    const totalAvailableLimit = cards.reduce(
        (total, card) => total + getAvailableLimit(card),
        0
    )

    const activeCards = cards.filter(
        (card) => card.status === "Ativo"
    ).length

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="flex min-h-screen">

                {/* Área principal */}
                <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">

                    {/* Cabeçalho */}
                    <header className="mb-7 flex flex-wrap items-center justify-between gap-4">

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                                Cartões
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Gerencie seus cartões e acompanhe seus limites.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-violet-600
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-violet-700
                            "
                        >
                            <Plus size={18} />
                            Novo cartão
                        </button>

                    </header>

                    {/* Resumo */}
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                        {/* Total de cartões */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-50">
                                    <CreditCard
                                        size={21}
                                        className="text-violet-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Total de cartões
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-slate-950">
                                        {cards.length}
                                    </p>

                                    <p className="mt-2 text-xs text-slate-500">
                                        {activeCards} cartões ativos
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Limite total */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50">
                                    <Wallet
                                        size={21}
                                        className="text-blue-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Limite total
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-slate-950">
                                        {formatCurrency(totalLimit)}
                                    </p>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Todos os cartões
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Limite utilizado */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50">
                                    <CreditCard
                                        size={21}
                                        className="text-orange-500"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Limite utilizado
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-orange-500">
                                        {formatCurrency(totalUsedLimit)}
                                    </p>

                                    <p className="mt-2 text-xs text-slate-500">
                                        {(
                                            (totalUsedLimit / totalLimit) *
                                            100
                                        ).toFixed(1)}
                                        % do limite total
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Limite disponível */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                                    <CircleCheck
                                        size={21}
                                        className="text-emerald-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Limite disponível
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-emerald-600">
                                        {formatCurrency(totalAvailableLimit)}
                                    </p>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Disponível para uso
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Cartões visuais */}
                    <section>

                        <div className="mb-4 flex items-center justify-between">

                            <h2 className="text-lg font-bold text-slate-950">
                                Meus cartões
                            </h2>

                            <button
                                type="button"
                                className="text-sm font-medium text-violet-600 hover:text-violet-700"
                            >
                                Ver todos
                            </button>

                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

                            {cards.map((card) => {

                                const availableLimit =
                                    getAvailableLimit(card)

                                const usagePercentage =
                                    getUsagePercentage(card)

                                return (
                                    <button
                                        key={card.id}
                                        type="button"
                                        className="
                                            overflow-hidden
                                            rounded-2xl
                                            text-left
                                            shadow-sm
                                            transition
                                            hover:-translate-y-0.5
                                            hover:shadow-md
                                        "
                                    >

                                        {/* Cartão */}
                                        <div
                                            className={`
                                                relative
                                                h-[215px]
                                                overflow-hidden
                                                p-6
                                                text-white
                                                ${card.color}
                                            `}
                                        >

                                            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

                                            <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-black/10" />

                                            {/* Cabeçalho */}
                                            <div className="relative flex items-start justify-between">

                                                <div>
                                                    <p className="text-lg font-bold">
                                                        {card.bank}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-white/70">
                                                        {card.type}
                                                    </p>
                                                </div>

                                                <CreditCard
                                                    size={28}
                                                    className="text-white/90"
                                                />

                                            </div>

                                            {/* Número */}
                                            <div className="relative mt-8">

                                                <p className="text-lg font-medium tracking-[0.18em]">
                                                    •••• •••• ••••{" "}
                                                    {card.lastFourDigits}
                                                </p>

                                            </div>

                                            {/* Rodapé */}
                                            <div className="relative mt-6 flex items-end justify-between">

                                                <div>
                                                    <p className="text-[10px] uppercase text-white/60">
                                                        Vencimento
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold">
                                                        {formatDay(card.dueDay)}/08
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-[10px] uppercase text-white/60">
                                                        Limite
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold">
                                                        {formatCurrency(card.limit)}
                                                    </p>
                                                </div>

                                                <p className="text-sm font-bold tracking-wide">
                                                    {getBrandLabel(card.brand)}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Informações */}
                                        <div className="border border-t-0 border-slate-200 bg-white p-5">

                                            <div className="flex items-center justify-between">

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-950">
                                                        {card.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-slate-500">
                                                        {card.account}
                                                    </p>
                                                </div>

                                                <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                                                    {card.status}
                                                </span>

                                            </div>

                                            {/* Utilização */}
                                            <div className="mt-5">

                                                <div className="mb-2 flex items-center justify-between text-xs">

                                                    <span className="text-slate-500">
                                                        Limite utilizado
                                                    </span>

                                                    <span className="font-medium text-slate-700">
                                                        {usagePercentage.toFixed(0)}%
                                                    </span>

                                                </div>

                                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                                                    <div
                                                        className="h-full rounded-full bg-violet-600"
                                                        style={{
                                                            width: `${usagePercentage}%`,
                                                        }}
                                                    />

                                                </div>

                                                <div className="mt-2 flex justify-between">

                                                    <span className="text-xs text-slate-500">
                                                        Utilizado{" "}
                                                        {formatCurrency(
                                                            card.usedLimit
                                                        )}
                                                    </span>

                                                    <span className="text-xs font-medium text-emerald-600">
                                                        {formatCurrency(
                                                            availableLimit
                                                        )}{" "}
                                                        disponível
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    </button>
                                )
                            })}

                        </div>

                    </section>

                    {/* Lista de cartões */}
                    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                            <h2 className="text-lg font-bold text-slate-950">
                                Lista de cartões
                            </h2>

                            <div className="flex gap-2">

                                <button
                                    type="button"
                                    className="
                                        rounded-lg
                                        border
                                        border-slate-200
                                        bg-white
                                        px-4
                                        py-2.5
                                        text-sm
                                        text-slate-700
                                        transition
                                        hover:border-violet-300
                                    "
                                >
                                    Todos os cartões
                                </button>

                                <div className="relative">

                                    <Search
                                        size={17}
                                        className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        type="text"
                                        placeholder="Buscar cartão..."
                                        className="
                                            w-52
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-white
                                            py-2.5
                                            pl-9
                                            pr-3
                                            text-sm
                                            outline-none
                                            placeholder:text-slate-400
                                            focus:border-violet-400
                                            focus:ring-2
                                            focus:ring-violet-100
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[900px] text-sm">

                                <thead>

                                    <tr className="border-b border-slate-100 text-left text-xs text-slate-500">

                                        <th className="px-2 py-3 font-medium">
                                            Cartão
                                        </th>

                                        <th className="px-2 py-3 font-medium">
                                            Conta vinculada
                                        </th>

                                        <th className="px-2 py-3 font-medium">
                                            Limite
                                        </th>

                                        <th className="px-2 py-3 font-medium">
                                            Utilizado
                                        </th>

                                        <th className="px-2 py-3 font-medium">
                                            Disponível
                                        </th>

                                        <th className="px-2 py-3 font-medium">
                                            Vencimento
                                        </th>

                                        <th className="px-2 py-3 font-medium">
                                            Status
                                        </th>

                                        <th className="px-2 py-3 text-right font-medium">
                                            Ações
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {cards.map((card) => {

                                        const availableLimit =
                                            getAvailableLimit(card)

                                        return (
                                            <tr
                                                key={card.id}
                                                className="
                                                    border-b
                                                    border-slate-100
                                                    last:border-0
                                                    transition
                                                    hover:bg-slate-50
                                                "
                                            >

                                                <td className="px-2 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className={`
                                                                flex
                                                                h-10
                                                                w-10
                                                                items-center
                                                                justify-center
                                                                rounded-lg
                                                                text-white
                                                                ${card.color}
                                                            `}
                                                        >
                                                            <CreditCard
                                                                size={19}
                                                            />
                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-slate-800">
                                                                {card.name}
                                                            </p>

                                                            <p className="text-xs text-slate-500">
                                                                ••••{" "}
                                                                {card.lastFourDigits}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="px-2 py-4">

                                                    <div className="flex items-center gap-2">

                                                        <span
                                                            className={`
                                                                h-2.5
                                                                w-2.5
                                                                rounded-full
                                                                ${card.accountColor}
                                                            `}
                                                        />

                                                        <span className="text-slate-600">
                                                            {card.account}
                                                        </span>

                                                    </div>

                                                </td>

                                                <td className="px-2 py-4 font-medium text-slate-700">
                                                    {formatCurrency(card.limit)}
                                                </td>

                                                <td className="px-2 py-4">

                                                    <p className="font-medium text-slate-700">
                                                        {formatCurrency(
                                                            card.usedLimit
                                                        )}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {getUsagePercentage(
                                                            card
                                                        ).toFixed(0)}
                                                        %
                                                    </p>

                                                </td>

                                                <td className="px-2 py-4 font-medium text-emerald-600">
                                                    {formatCurrency(
                                                        availableLimit
                                                    )}
                                                </td>

                                                <td className="px-2 py-4 text-slate-600">
                                                    {formatDay(card.dueDay)}/08
                                                </td>

                                                <td className="px-2 py-4">

                                                    <span
                                                        className={`
                                                            inline-flex
                                                            rounded-full
                                                            px-2.5
                                                            py-1
                                                            text-[11px]
                                                            font-medium
                                                            ${
                                                                card.status ===
                                                                "Ativo"
                                                                    ? "bg-emerald-50 text-emerald-700"
                                                                    : "bg-red-50 text-red-700"
                                                            }
                                                        `}
                                                    >
                                                        {card.status}
                                                    </span>

                                                </td>

                                                <td className="px-2 py-4">

                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            className="
                                                                rounded-lg
                                                                border
                                                                border-slate-200
                                                                p-2
                                                                text-slate-500
                                                                transition
                                                                hover:border-violet-300
                                                                hover:bg-violet-50
                                                                hover:text-violet-600
                                                            "
                                                        >
                                                            <Pencil size={16} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="
                                                                rounded-lg
                                                                border
                                                                border-slate-200
                                                                p-2
                                                                text-slate-500
                                                                transition
                                                                hover:border-slate-300
                                                                hover:bg-slate-50
                                                            "
                                                        >
                                                            <MoreVertical
                                                                size={16}
                                                            />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        )
                                    })}

                                </tbody>

                            </table>

                        </div>

                    </section>

                </section>

                {/* Painel lateral */}
                <aside className="hidden w-[400px] shrink-0 border-l border-slate-200 bg-white xl:block">

                    <div className="h-full overflow-y-auto px-6 py-7">

                        {/* Voltar */}
                        <button
                            type="button"
                            className="
                                mb-10
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-slate-700
                                hover:text-violet-600
                            "
                        >
                            <ArrowLeft size={17} />
                            Voltar
                        </button>

                        {/* Cartão selecionado */}
                        <div
                            className={`
                                relative
                                h-[210px]
                                overflow-hidden
                                rounded-2xl
                                p-6
                                text-white
                                shadow-sm
                                ${selectedCard.color}
                            `}
                        >

                            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

                            <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-black/10" />

                            <div className="relative flex items-start justify-between">

                                <div>

                                    <p className="text-lg font-bold">
                                        {selectedCard.bank}
                                    </p>

                                    <p className="mt-0.5 text-xs text-white/70">
                                        {selectedCard.type}
                                    </p>

                                </div>

                                <CreditCard size={28} />

                            </div>

                            <p className="relative mt-8 text-lg tracking-[0.18em]">
                                •••• •••• ••••{" "}
                                {selectedCard.lastFourDigits}
                            </p>

                            <div className="relative mt-6 flex items-end justify-between">

                                <div>

                                    <p className="text-[10px] uppercase text-white/60">
                                        Vencimento
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {formatDay(selectedCard.dueDay)}/08
                                    </p>

                                </div>

                                <p className="text-sm font-bold">
                                    {getBrandLabel(selectedCard.brand)}
                                </p>

                            </div>

                        </div>

                        {/* Nome / Status */}
                        <div className="mt-5 flex items-center justify-between">

                            <div>

                                <h2 className="font-semibold text-slate-950">
                                    {selectedCard.name}
                                </h2>

                                <p className="text-xs text-slate-500">
                                    {selectedCard.account}
                                </p>

                            </div>

                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">

                                <CircleCheck size={13} />

                                Ativo

                            </span>

                        </div>

                        {/* Limite */}
                        <div className="mt-7 border-t border-slate-200 pt-5">

                            <p className="text-xs text-slate-500">
                                Limite disponível
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-950">
                                {formatCurrency(
                                    getAvailableLimit(selectedCard)
                                )}
                            </p>

                            <div className="mt-4">

                                <div className="mb-2 flex justify-between text-xs">

                                    <span className="text-slate-500">
                                        Utilizado
                                    </span>

                                    <span className="font-medium text-slate-700">
                                        {formatCurrency(
                                            selectedCard.usedLimit
                                        )}
                                    </span>

                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                                    <div
                                        className="h-full rounded-full bg-violet-600"
                                        style={{
                                            width: `${getUsagePercentage(
                                                selectedCard
                                            )}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Informações */}
                        <div className="mt-6 grid grid-cols-2 gap-3">

                            <div className="rounded-lg border border-slate-200 p-4">

                                <p className="text-[11px] text-slate-500">
                                    Limite total
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {formatCurrency(selectedCard.limit)}
                                </p>

                            </div>

                            <div className="rounded-lg border border-slate-200 p-4">

                                <p className="text-[11px] text-slate-500">
                                    Utilizado
                                </p>

                                <p className="mt-1 text-sm font-semibold text-orange-500">
                                    {formatCurrency(
                                        selectedCard.usedLimit
                                    )}
                                </p>

                            </div>

                            <div className="rounded-lg border border-slate-200 p-4">

                                <p className="text-[11px] text-slate-500">
                                    Fechamento
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    Dia {formatDay(selectedCard.closingDay)}
                                </p>

                            </div>

                            <div className="rounded-lg border border-slate-200 p-4">

                                <p className="text-[11px] text-slate-500">
                                    Vencimento
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    Dia {formatDay(selectedCard.dueDay)}
                                </p>

                            </div>

                        </div>

                        {/* Conta vinculada */}
                        <div className="mt-6 rounded-xl border border-slate-200 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">
                                    <Wallet
                                        size={19}
                                        className="text-violet-600"
                                    />
                                </div>

                                <div>

                                    <p className="text-xs text-slate-500">
                                        Conta vinculada
                                    </p>

                                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                                        {selectedCard.account}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ================================================= */}
                        {/* Gastos do cartão */}
                        {/* ================================================= */}

                        <div className="mt-6 border-t border-slate-200 pt-5">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-950">
                                        Gastos do cartão
                                    </h3>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Este mês
                                    </p>
                                </div>

                                <span className="text-sm font-semibold text-slate-800">
                                    {formatCurrency(
                                        selectedCard.usedLimit
                                    )}
                                </span>

                            </div>

                            {/* Categorias */}
                            <div className="mt-4 space-y-3">

                                {cardExpenses.map((expense) => {

                                    const percentage =
                                        (expense.value /
                                            selectedCard.usedLimit) *
                                        100

                                    return (
                                        <div
                                            key={expense.id}
                                            className="space-y-1.5"
                                        >

                                            <div className="flex items-center justify-between">

                                                <div className="flex items-center gap-2">

                                                    <span
                                                        className={`
                                                            h-2.5
                                                            w-2.5
                                                            rounded-full
                                                            ${expense.color}
                                                        `}
                                                    />

                                                    <span className="text-xs text-slate-600">
                                                        {expense.category}
                                                    </span>

                                                </div>

                                                <span className="text-xs font-medium text-slate-700">
                                                    {formatCurrency(
                                                        expense.value
                                                    )}
                                                </span>

                                            </div>

                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                                                <div
                                                    className={`
                                                        h-full
                                                        rounded-full
                                                        ${expense.color}
                                                    `}
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>
                                    )
                                })}

                            </div>

                            {/* Botão */}
                            <button
                                type="button"
                                className="
                                    mt-5
                                    w-full
                                    rounded-lg
                                    border
                                    border-slate-200
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-violet-600
                                    transition
                                    hover:bg-violet-50
                                "
                            >
                                Ver todas as transações
                            </button>

                        </div>

                        {/* Ações */}
                        <div className="mt-6 flex gap-2">

                            <button
                                type="button"
                                className="
                                    flex
                                    flex-1
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-slate-200
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    transition
                                    hover:border-violet-300
                                    hover:bg-violet-50
                                    hover:text-violet-600
                                "
                            >
                                <Pencil size={16} />
                                Editar
                            </button>

                            <button
                                type="button"
                                className="
                                    flex
                                    flex-1
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-red-200
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-red-600
                                    transition
                                    hover:bg-red-50
                                "
                            >
                                <CircleX size={16} />
                                Desativar
                            </button>

                        </div>

                    </div>

                </aside>

            </div>

        </div>
    )
}