import {
    ArrowDown,
    ArrowUp,
    CalendarDays,
    CreditCard,
    DollarSign,
    Edit3,
    FileText,
    List,
    MoreVertical,
    Search,
    Tag,
    Trash2,
    Utensils,
    Wallet,
    X,
} from "lucide-react"

type TransactionType = "Entrada" | "Saída"

type Transaction = {
    id: number
    date: string
    time: string
    description: string
    observation: string
    category: string
    categoryColor: string
    account: string
    accountLastFour?: string
    accountColor: string
    type: TransactionType
    amount: number
    paymentMethod: string
    status: "Concluída" | "Pendente"
}

const transactions: Transaction[] = [
    {
        id: 1,
        date: "19/08/2026",
        time: "12:45",
        description: "iFood",
        observation: "Almoço",
        category: "Alimentação",
        categoryColor: "bg-orange-500",
        account: "Nubank",
        accountLastFour: "1234",
        accountColor: "bg-violet-600",
        type: "Saída",
        amount: 45,
        paymentMethod: "Crédito",
        status: "Concluída",
    },
    {
        id: 2,
        date: "18/08/2026",
        time: "20:15",
        description: "Uber",
        observation: "Viagem",
        category: "Transporte",
        categoryColor: "bg-blue-500",
        account: "Nubank",
        accountLastFour: "1234",
        accountColor: "bg-violet-600",
        type: "Saída",
        amount: 32,
        paymentMethod: "Crédito",
        status: "Concluída",
    },
    {
        id: 3,
        date: "17/08/2026",
        time: "10:30",
        description: "Netflix",
        observation: "Plano padrão",
        category: "Assinaturas",
        categoryColor: "bg-violet-500",
        account: "Nubank",
        accountLastFour: "1234",
        accountColor: "bg-violet-600",
        type: "Saída",
        amount: 50,
        paymentMethod: "Crédito",
        status: "Concluída",
    },
    {
        id: 4,
        date: "16/08/2026",
        time: "09:12",
        description: "Mercado Extra",
        observation: "Compras do mês",
        category: "Alimentação",
        categoryColor: "bg-orange-500",
        account: "Nubank",
        accountLastFour: "1234",
        accountColor: "bg-violet-600",
        type: "Saída",
        amount: 180,
        paymentMethod: "Crédito",
        status: "Concluída",
    },
    {
        id: 5,
        date: "15/08/2026",
        time: "15:40",
        description: "Farmácia São Paulo",
        observation: "Medicamentos",
        category: "Saúde",
        categoryColor: "bg-pink-500",
        account: "Itaú",
        accountLastFour: "5678",
        accountColor: "bg-blue-600",
        type: "Saída",
        amount: 80,
        paymentMethod: "Débito",
        status: "Concluída",
    },
    {
        id: 6,
        date: "15/08/2026",
        time: "09:00",
        description: "Salário",
        observation: "Salário mensal",
        category: "Salário",
        categoryColor: "bg-emerald-500",
        account: "Itaú",
        accountLastFour: "5678",
        accountColor: "bg-blue-600",
        type: "Entrada",
        amount: 4500,
        paymentMethod: "Transferência",
        status: "Concluída",
    },
    {
        id: 7,
        date: "14/08/2026",
        time: "19:22",
        description: "Cinemark",
        observation: "Filme",
        category: "Lazer",
        categoryColor: "bg-pink-500",
        account: "Nubank",
        accountLastFour: "1234",
        accountColor: "bg-violet-600",
        type: "Saída",
        amount: 60,
        paymentMethod: "Crédito",
        status: "Concluída",
    },
    {
        id: 8,
        date: "14/08/2026",
        time: "14:05",
        description: "Transferência recebida",
        observation: "De: Cleyson Soares",
        category: "Transferência",
        categoryColor: "bg-blue-500",
        account: "Itaú",
        accountLastFour: "5678",
        accountColor: "bg-blue-600",
        type: "Entrada",
        amount: 250,
        paymentMethod: "Transferência",
        status: "Concluída",
    },
]

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)

export function TransactionsPage() {
    const selectedTransaction = transactions[0]

    const totalEntries = transactions
        .filter((transaction) => transaction.type === "Entrada")
        .reduce((total, transaction) => total + transaction.amount, 0)

    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "Saída")
        .reduce((total, transaction) => total + transaction.amount, 0)

    const balance = totalEntries - totalExpenses

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            <div className="flex min-h-screen">

                {/* ========================================================= */}
                {/* Conteúdo principal */}
                {/* ========================================================= */}

                <main className="min-w-0 flex-1 px-6 py-7">

                    {/* Cabeçalho */}
                    <header className="mb-7 flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Transações
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Acompanhe todas as suas movimentações financeiras
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
                            <span className="text-lg leading-none">
                                +
                            </span>

                            Nova transação
                        </button>

                    </header>

                    {/* ===================================================== */}
                    {/* Cards de resumo */}
                    {/* ===================================================== */}

                    <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                        <SummaryCard
                            title="Total de entradas"
                            value={formatCurrency(totalEntries)}
                            description="12,5% vs mês anterior"
                            icon={
                                <ArrowDown
                                    size={22}
                                    className="text-emerald-600"
                                />
                            }
                            iconBackground="bg-emerald-50"
                            valueColor="text-emerald-600"
                        />

                        <SummaryCard
                            title="Total de saídas"
                            value={formatCurrency(totalExpenses)}
                            description="8,3% vs mês anterior"
                            icon={
                                <ArrowUp
                                    size={22}
                                    className="text-red-500"
                                />
                            }
                            iconBackground="bg-red-50"
                            valueColor="text-red-500"
                        />

                        <SummaryCard
                            title="Saldo do período"
                            value={formatCurrency(balance)}
                            description="18,6% vs mês anterior"
                            icon={
                                <Wallet
                                    size={21}
                                    className="text-blue-600"
                                />
                            }
                            iconBackground="bg-blue-50"
                            valueColor="text-blue-600"
                        />

                        <SummaryCard
                            title="Total de transações"
                            value={transactions.length.toString()}
                            description="5 vs mês anterior"
                            icon={
                                <List
                                    size={21}
                                    className="text-violet-600"
                                />
                            }
                            iconBackground="bg-violet-50"
                            valueColor="text-slate-900"
                        />

                    </section>

                    {/* ===================================================== */}
                    {/* Área da tabela */}
                    {/* ===================================================== */}

                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        {/* Filtros */}
                        <div className="border-b border-slate-200 p-4">

                            <div className="flex flex-wrap items-center gap-3">

                                <FilterButton
                                    icon={<CalendarDays size={16} />}
                                    label="01/08/2026 - 31/08/2026"
                                />

                                <FilterButton
                                    label="Categoria: Todas"
                                />

                                <FilterButton
                                    label="Conta: Todas"
                                />

                                <FilterButton
                                    label="Cartão: Todos"
                                />

                                <FilterButton
                                    label="Tipo: Todos"
                                />

                                <div className="relative ml-auto">

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
                                        placeholder="Buscar descrição..."
                                        className="
                                            w-52
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            py-2.5
                                            pl-9
                                            pr-3
                                            text-sm
                                            text-slate-900
                                            outline-none
                                            placeholder:text-slate-400
                                            focus:border-violet-500
                                            focus:ring-1
                                            focus:ring-violet-500
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Tabs */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-4">

                            <div className="flex">

                                <TabButton
                                    label="Todas"
                                    active
                                />

                                <TabButton
                                    label="Entradas"
                                />

                                <TabButton
                                    label="Saídas"
                                />

                            </div>

                            <div className="flex items-center gap-3">

                                <span className="text-xs text-slate-400">
                                    Ordenar por:
                                </span>

                                <button
                                    type="button"
                                    className="
                                        text-sm
                                        text-slate-600
                                        transition
                                        hover:text-slate-900
                                    "
                                >
                                    Mais recentes
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
                                        hover:bg-slate-50
                                        hover:text-slate-900
                                    "
                                >
                                    <List size={17} />
                                </button>

                            </div>

                        </div>

                        {/* Tabela */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[950px]">

                                <thead>

                                    <tr className="border-b border-slate-200 text-left text-xs text-slate-500">

                                        <th className="px-5 py-4 font-medium">
                                            Data
                                        </th>

                                        <th className="px-3 py-4 font-medium">
                                            Descrição
                                        </th>

                                        <th className="px-3 py-4 font-medium">
                                            Categoria
                                        </th>

                                        <th className="px-3 py-4 font-medium">
                                            Conta / Cartão
                                        </th>

                                        <th className="px-3 py-4 font-medium">
                                            Tipo
                                        </th>

                                        <th className="px-3 py-4 text-right font-medium">
                                            Valor
                                        </th>

                                        <th className="px-5 py-4 text-right font-medium">
                                            Ações
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {transactions.map((transaction) => (

                                        <TransactionRow
                                            key={transaction.id}
                                            transaction={transaction}
                                            selected={
                                                transaction.id ===
                                                selectedTransaction.id
                                            }
                                        />

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </section>

                </main>

                {/* ========================================================= */}
                {/* Painel de detalhes */}
                {/* ========================================================= */}

                <aside className="hidden w-[330px] shrink-0 border-l border-slate-200 bg-white xl:block">

                    <TransactionDetails
                        transaction={selectedTransaction}
                    />

                </aside>

            </div>

        </div>
    )
}

/* ======================================================================== */
/* Summary Card */
/* ======================================================================== */

function SummaryCard({
    title,
    value,
    description,
    icon,
    iconBackground,
    valueColor,
}: {
    title: string
    value: string
    description: string
    icon: React.ReactNode
    iconBackground: string
    valueColor: string
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <p
                        className={`
                            mt-2
                            text-2xl
                            font-bold
                            ${valueColor}
                        `}
                    >
                        {value}
                    </p>

                    <p className="mt-2 text-xs text-emerald-600">
                        ↗ {description}
                    </p>

                </div>

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        ${iconBackground}
                    `}
                >
                    {icon}
                </div>

            </div>

        </div>
    )
}

/* ======================================================================== */
/* Filter Button */
/* ======================================================================== */

function FilterButton({
    label,
    icon,
}: {
    label: string
    icon?: React.ReactNode
}) {
    return (
        <button
            type="button"
            className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-2.5
                text-sm
                text-slate-700
                shadow-sm
                transition
                hover:border-slate-300
                hover:bg-slate-50
            "
        >
            {icon}

            {label}

            <span className="ml-1 text-slate-400">
                ˅
            </span>
        </button>
    )
}

/* ======================================================================== */
/* Tab Button */
/* ======================================================================== */

function TabButton({
    label,
    active = false,
}: {
    label: string
    active?: boolean
}) {
    return (
        <button
            type="button"
            className={`
                relative
                px-4
                py-4
                text-sm
                font-medium
                transition
                ${
                    active
                        ? "text-violet-600"
                        : "text-slate-500 hover:text-slate-700"
                }
            `}
        >
            {label}

            {active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
            )}
        </button>
    )
}

/* ======================================================================== */
/* Transaction Row */
/* ======================================================================== */

function TransactionRow({
    transaction,
    selected,
}: {
    transaction: Transaction
    selected: boolean
}) {
    const isIncome = transaction.type === "Entrada"

    return (
        <tr
            className={`
                border-b
                border-slate-100
                transition
                ${
                    selected
                        ? "bg-violet-50/60"
                        : "hover:bg-slate-50"
                }
            `}
        >

            {/* Data */}
            <td className="px-5 py-4">

                <p className="text-sm text-slate-700">
                    {transaction.date}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {transaction.time}
                </p>

            </td>

            {/* Descrição */}
            <td className="px-3 py-4">

                <p className="text-sm font-semibold text-slate-900">
                    {transaction.description}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    {transaction.observation}
                </p>

            </td>

            {/* Categoria */}
            <td className="px-3 py-4">

                <div className="flex items-center gap-2">

                    <span
                        className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            text-white
                            ${transaction.categoryColor}
                        `}
                    >
                        <Utensils size={15} />
                    </span>

                    <span className="text-sm text-slate-700">
                        {transaction.category}
                    </span>

                </div>

            </td>

            {/* Conta / Cartão */}
            <td className="px-3 py-4">

                <div className="flex items-center gap-2">

                    <span
                        className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-[10px]
                            font-bold
                            text-white
                            ${transaction.accountColor}
                        `}
                    >
                        {transaction.account === "Nubank"
                            ? "nu"
                            : "Itaú"}
                    </span>

                    <div>

                        <p className="text-sm text-slate-700">
                            {transaction.account}
                        </p>

                        {transaction.accountLastFour && (
                            <p className="text-xs text-slate-400">
                                •••• {transaction.accountLastFour}
                            </p>
                        )}

                    </div>

                </div>

            </td>

            {/* Tipo */}
            <td className="px-3 py-4">

                <span
                    className={`
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        ${
                            isIncome
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                        }
                    `}
                >
                    {isIncome ? (
                        <ArrowDown size={13} />
                    ) : (
                        <ArrowUp size={13} />
                    )}

                    {transaction.type}
                </span>

            </td>

            {/* Valor */}
            <td className="px-3 py-4 text-right">

                <span
                    className={`
                        text-sm
                        font-semibold
                        ${
                            isIncome
                                ? "text-emerald-600"
                                : "text-red-500"
                        }
                    `}
                >
                    {isIncome ? "+ " : "- "}
                    {formatCurrency(transaction.amount)}
                </span>

            </td>

            {/* Ações */}
            <td className="px-5 py-4 text-right">

                <button
                    type="button"
                    className="
                        rounded-lg
                        border
                        border-slate-200
                        p-2
                        text-slate-400
                        transition
                        hover:bg-slate-50
                        hover:text-slate-700
                    "
                >
                    <MoreVertical size={17} />
                </button>

            </td>

        </tr>
    )
}

/* ======================================================================== */
/* Details */
/* ======================================================================== */

function TransactionDetails({
    transaction,
}: {
    transaction: Transaction
}) {
    const isIncome = transaction.type === "Entrada"

    return (
        <div className="h-full overflow-y-auto p-6">

            {/* Cabeçalho */}
            <div className="mb-7 flex items-center justify-between">

                <h2 className="text-lg font-semibold text-slate-900">
                    Detalhes da transação
                </h2>

                <button
                    type="button"
                    className="
                        rounded-lg
                        p-2
                        text-slate-400
                        transition
                        hover:bg-slate-50
                        hover:text-slate-700
                    "
                >
                    <X size={18} />
                </button>

            </div>

            {/* Ícone */}
            <div
                className={`
                    mb-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    ${
                        isIncome
                            ? "bg-emerald-50"
                            : "bg-orange-50"
                    }
                `}
            >
                {isIncome ? (
                    <DollarSign
                        size={25}
                        className="text-emerald-600"
                    />
                ) : (
                    <Utensils
                        size={25}
                        className="text-orange-500"
                    />
                )}
            </div>

            {/* Descrição */}
            <h3 className="text-xl font-semibold text-slate-900">
                {transaction.description}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
                {transaction.observation}
            </p>

            {/* Valor */}
            <p
                className={`
                    mt-4
                    text-2xl
                    font-bold
                    ${
                        isIncome
                            ? "text-emerald-600"
                            : "text-red-500"
                    }
                `}
            >
                {isIncome ? "+ " : "- "}
                {formatCurrency(transaction.amount)}
            </p>

            {/* Status */}
            <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                • {transaction.status}
            </span>

            {/* Divisor */}
            <div className="my-6 border-t border-slate-200" />

            {/* Informações */}
            <div className="space-y-5">

                <DetailItem
                    icon={<CalendarDays size={18} />}
                    label="Data"
                    value={`${transaction.date} - ${transaction.time}`}
                />

                <DetailItem
                    icon={<Tag size={18} />}
                    label="Categoria"
                    value={transaction.category}
                />

                <DetailItem
                    icon={<CreditCard size={18} />}
                    label="Conta / Cartão"
                    value={
                        transaction.accountLastFour
                            ? `${transaction.account} •••• ${transaction.accountLastFour}`
                            : transaction.account
                    }
                />

                <DetailItem
                    icon={
                        isIncome ? (
                            <ArrowDown size={18} />
                        ) : (
                            <ArrowUp size={18} />
                        )
                    }
                    label="Tipo"
                    value={transaction.type}
                />

                <DetailItem
                    icon={<CreditCard size={18} />}
                    label="Método de pagamento"
                    value={transaction.paymentMethod}
                />

                <DetailItem
                    icon={<FileText size={18} />}
                    label="Observação"
                    value={transaction.observation}
                />

            </div>

            {/* Ações */}
            <div className="mt-8 space-y-2">

                <button
                    type="button"
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-200
                        py-3
                        text-sm
                        font-medium
                        text-slate-700
                        transition
                        hover:border-violet-300
                        hover:bg-violet-50
                        hover:text-violet-700
                    "
                >
                    <Edit3 size={16} />
                    Editar
                </button>

                <button
                    type="button"
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-red-200
                        py-3
                        text-sm
                        font-medium
                        text-red-500
                        transition
                        hover:bg-red-50
                    "
                >
                    <Trash2 size={16} />
                    Excluir
                </button>

            </div>

        </div>
    )
}

/* ======================================================================== */
/* Detail Item */
/* ======================================================================== */

function DetailItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-3">

            <div className="mt-0.5 text-slate-400">
                {icon}
            </div>

            <div className="min-w-0">

                <p className="text-xs text-slate-400">
                    {label}
                </p>

                <p className="mt-1 text-sm text-slate-700">
                    {value}
                </p>

            </div>

        </div>
    )
}