import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
//   CreditCard,
  Ellipsis,
  Filter,
//   Landmark,
  Plus,
  Search,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";

type RecurringType = "Recebimento" | "Pagamento";

type RecurringStatus = "Ativa" | "Pausada";

type RecurringItem = {
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

const initialRecurring: RecurringItem[] = [
  {
    id: 1,
    name: "Salário",
    category: "Renda",
    type: "Recebimento",
    amount: 6500,
    dueDay: 5,
    frequency: "Mensal",
    paymentMethod: "Transferência",
    account: "Conta principal",
    status: "Ativa",
    color: "bg-emerald-100 text-emerald-700",
    initials: "SA",
    startDate: "2026-01-05",
  },
  {
    id: 2,
    name: "Aluguel",
    category: "Moradia",
    type: "Pagamento",
    amount: 1800,
    dueDay: 10,
    frequency: "Mensal",
    paymentMethod: "Pix",
    account: "Conta principal",
    status: "Ativa",
    color: "bg-orange-100 text-orange-700",
    initials: "AL",
    startDate: "2026-01-10",
  },
  {
    id: 3,
    name: "Netflix",
    category: "Assinaturas",
    type: "Pagamento",
    amount: 39.9,
    dueDay: 12,
    frequency: "Mensal",
    paymentMethod: "Cartão de crédito",
    account: "Cartão principal",
    status: "Ativa",
    color: "bg-red-100 text-red-700",
    initials: "NE",
    startDate: "2026-01-12",
  },
  {
    id: 4,
    name: "Internet",
    category: "Serviços",
    type: "Pagamento",
    amount: 119.9,
    dueDay: 15,
    frequency: "Mensal",
    paymentMethod: "Débito automático",
    account: "Conta principal",
    status: "Ativa",
    color: "bg-blue-100 text-blue-700",
    initials: "IN",
    startDate: "2026-01-15",
  },
  {
    id: 5,
    name: "Academia",
    category: "Saúde",
    type: "Pagamento",
    amount: 99.9,
    dueDay: 18,
    frequency: "Mensal",
    paymentMethod: "Cartão de crédito",
    account: "Cartão principal",
    status: "Ativa",
    color: "bg-violet-100 text-violet-700",
    initials: "AC",
    startDate: "2026-01-18",
  },
  {
    id: 6,
    name: "Freelance",
    category: "Renda extra",
    type: "Recebimento",
    amount: 850,
    dueDay: 20,
    frequency: "Mensal",
    paymentMethod: "Transferência",
    account: "Conta principal",
    status: "Ativa",
    color: "bg-cyan-100 text-cyan-700",
    initials: "FR",
    startDate: "2026-02-20",
  },
  {
    id: 7,
    name: "Spotify",
    category: "Assinaturas",
    type: "Pagamento",
    amount: 21.9,
    dueDay: 22,
    frequency: "Mensal",
    paymentMethod: "Cartão de crédito",
    account: "Cartão principal",
    status: "Ativa",
    color: "bg-green-100 text-green-700",
    initials: "SP",
    startDate: "2026-01-22",
  },
  {
    id: 8,
    name: "Seguro do carro",
    category: "Transporte",
    type: "Pagamento",
    amount: 240,
    dueDay: 25,
    frequency: "Mensal",
    paymentMethod: "Débito automático",
    account: "Conta principal",
    status: "Pausada",
    color: "bg-amber-100 text-amber-700",
    initials: "SC",
    startDate: "2026-01-25",
  },
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const formatDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

const getMonthName = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

const getDueDate = (item: RecurringItem, month: Date) => {
  const lastDay = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();

  return new Date(
    month.getFullYear(),
    month.getMonth(),
    Math.min(item.dueDay, lastDay),
  );
};

const isSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export function RecurringPage() {
  const [items, setItems] = useState(initialRecurring);
  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todas");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [notice, setNotice] = useState("");
  const [formName, setFormName] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formDay, setFormDay] = useState("10");
  const [formType, setFormType] = useState<RecurringType>("Pagamento");
  const [formCategory, setFormCategory] = useState("Outros");
  const [formFrequency, setFormFrequency] = useState<
    RecurringItem["frequency"]
  >("Mensal");

  const activeItems = useMemo(
    () => items.filter((item) => item.status === "Ativa"),
    [items],
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "Todas" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "Todos" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [items, search, typeFilter, statusFilter]);

  const monthlyIncome = activeItems
    .filter((item) => item.type === "Recebimento")
    .reduce((total, item) => total + item.amount, 0);

  const monthlyExpenses = activeItems
    .filter((item) => item.type === "Pagamento")
    .reduce((total, item) => total + item.amount, 0);

  const monthlyBalance = monthlyIncome - monthlyExpenses;

  const nextSevenDays = useMemo(() => {
    const today = new Date();
    const start = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      today.getMonth() === currentMonth.getMonth() &&
        today.getFullYear() === currentMonth.getFullYear()
        ? today.getDate()
        : 1,
    );
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    return activeItems.filter((item) => {
      const dueDate = getDueDate(item, currentMonth);
      return dueDate >= start && dueDate < end;
    });
  }, [activeItems, currentMonth]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );
    const offset = firstDay.getDay();
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    ).getDate();

    return [
      ...Array.from({ length: offset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [currentMonth]);

  const getItemsForDay = (day: number) =>
    activeItems.filter((item) =>
      isSameDay(getDueDate(item, currentMonth), new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      )),
    );

  const selectedDayItems = selectedDay
    ? activeItems.filter((item) =>
        isSameDay(getDueDate(item, currentMonth), selectedDay),
      )
    : [];

  const changeMonth = (direction: number) => {
    setCurrentMonth(
      (previous) =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() + direction,
          1,
        ),
    );
    setSelectedDay(null);
  };

  const toggleStatus = (id: number) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Ativa" ? "Pausada" : "Ativa",
            }
          : item,
      ),
    );
    setNotice("Status da recorrência atualizado.");
  };

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(formAmount.replace(",", "."));
    const day = Number(formDay);

    if (!formName.trim() || !Number.isFinite(amount) || amount <= 0) {
      setNotice("Informe uma descrição e um valor válido.");
      return;
    }

    if (!Number.isInteger(day) || day < 1 || day > 31) {
      setNotice("O dia de vencimento deve estar entre 1 e 31.");
      return;
    }

    const colors = [
      "bg-violet-100 text-violet-700",
      "bg-blue-100 text-blue-700",
      "bg-emerald-100 text-emerald-700",
      "bg-orange-100 text-orange-700",
    ];

    const newItem: RecurringItem = {
      id: Date.now(),
      name: formName.trim(),
      category: formCategory,
      type: formType,
      amount,
      dueDay: day,
      frequency: formFrequency,
      paymentMethod: "Não definido",
      account: "Não definida",
      status: "Ativa",
      color: colors[items.length % colors.length],
      initials: formName.trim().slice(0, 2).toUpperCase(),
      startDate: new Date().toISOString().slice(0, 10),
    };

    setItems((previous) => [newItem, ...previous]);
    setSearch("");
    setTypeFilter("Todas");
    setStatusFilter("Todos");
    setShowForm(false);
    setFormName("");
    setFormAmount("");
    setFormDay("10");
    setFormType("Pagamento");
    setFormCategory("Outros");
    setFormFrequency("Mensal");
    setNotice("Recorrência adicionada com sucesso.");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Cabeçalho */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Financeiro</span>
              <span>/</span>
              <span className="text-violet-600">Recorrentes</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Cobranças recorrentes
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Organize seus recebimentos e pagamentos recorrentes.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
          >
            <Plus size={18} />
            Nova recorrência
          </button>
        </header>

        {notice && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-violet-800">
            <span>{notice}</span>
            <button
              onClick={() => setNotice("")}
              className="rounded-lg p-1 hover:bg-violet-100"
              aria-label="Fechar mensagem"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Indicadores */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Recebimentos mensais"
            amount={monthlyIncome}
            description="Entradas recorrentes ativas"
            icon={<ArrowDownLeft size={20} />}
            iconClass="bg-emerald-50 text-emerald-600"
            trend="positive"
          />
          <SummaryCard
            title="Pagamentos mensais"
            amount={monthlyExpenses}
            description="Saídas recorrentes ativas"
            icon={<ArrowUpRight size={20} />}
            iconClass="bg-rose-50 text-rose-600"
            trend="negative"
          />
          <SummaryCard
            title="Saldo recorrente"
            amount={monthlyBalance}
            description="Recebimentos menos pagamentos"
            icon={<Wallet size={20} />}
            iconClass="bg-violet-50 text-violet-600"
            trend={monthlyBalance >= 0 ? "positive" : "negative"}
          />
          <SummaryCard
            title="Próximos 7 dias"
            amount={nextSevenDays.reduce(
              (total, item) => total + item.amount,
              0,
            )}
            description={`${nextSevenDays.length} cobrança(s) prevista(s)`}
            icon={<CalendarDays size={20} />}
            iconClass="bg-amber-50 text-amber-600"
            trend="neutral"
          />
        </section>

        {/* Calendário e vencimentos */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Calendário de cobranças
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Visualize os vencimentos do mês.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                  aria-label="Mês anterior"
                >
                  <ArrowLeft size={16} />
                </button>
                <span className="min-w-[130px] text-center text-sm font-semibold capitalize text-slate-800">
                  {getMonthName(currentMonth)}
                </span>
                <button
                  onClick={() => changeMonth(1)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                  aria-label="Próximo mês"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                (day) => (
                  <div
                    key={day}
                    className="pb-3 text-xs font-semibold text-slate-400"
                  >
                    {day}
                  </div>
                ),
              )}

              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} />;
                }

                const dayItems = getItemsForDay(day);
                const hasIncome = dayItems.some(
                  (item) => item.type === "Recebimento",
                );
                const hasExpense = dayItems.some(
                  (item) => item.type === "Pagamento",
                );
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day,
                );
                const isToday = isSameDay(date, new Date());
                const isSelected = selectedDay
                  ? isSameDay(date, selectedDay)
                  : false;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(date)}
                    className={`relative mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-xl text-sm transition sm:h-11 sm:w-11 ${
                      isSelected
                        ? "bg-violet-600 font-semibold text-white"
                        : isToday
                          ? "border border-violet-300 bg-violet-50 font-semibold text-violet-700"
                          : "text-slate-700 hover:bg-slate-100"
                    }`}
                    aria-label={`${day} de ${getMonthName(currentMonth)}${
                      dayItems.length
                        ? `, ${dayItems.length} cobrança(s)`
                        : ""
                    }`}
                  >
                    {day}
                    {dayItems.length > 0 && (
                      <span className="absolute bottom-1 flex gap-0.5">
                        {hasIncome && (
                          <span
                            className={`h-1 w-1 rounded-full ${
                              isSelected ? "bg-white" : "bg-emerald-500"
                            }`}
                          />
                        )}
                        {hasExpense && (
                          <span
                            className={`h-1 w-1 rounded-full ${
                              isSelected ? "bg-white" : "bg-rose-400"
                            }`}
                          />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Recebimentos
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                Pagamentos
              </span>
              <span className="ml-auto text-slate-400">
                Selecione um dia para ver os detalhes.
              </span>
            </div>

            {selectedDay && (
              <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Vencimentos em {formatDate(selectedDay)}
                  </h3>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="rounded-md p-1 text-slate-500 hover:bg-white"
                    aria-label="Fechar detalhes do dia"
                  >
                    <X size={15} />
                  </button>
                </div>

                {selectedDayItems.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    Nenhuma cobrança ativa neste dia.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedDayItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${item.color}`}
                          >
                            {item.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.type}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 text-sm font-semibold ${
                            item.type === "Recebimento"
                              ? "text-emerald-600"
                              : "text-slate-800"
                          }`}
                        >
                          {item.type === "Recebimento" ? "+" : "−"}
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Próximos vencimentos */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Próximos vencimentos
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Cobranças previstas para os próximos dias.
                </p>
              </div>
              <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                {nextSevenDays.length} previstas
              </span>
            </div>

            {nextSevenDays.length === 0 ? (
              <div className="flex min-h-52 flex-col items-center justify-center text-center">
                <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">
                  <CalendarDays size={23} />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  Nenhuma cobrança nos próximos 7 dias
                </p>
                <p className="mt-1 max-w-xs text-xs text-slate-500">
                  Quando houver vencimentos nesse período, eles aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {nextSevenDays.map((item) => {
                  const dueDate = getDueDate(item, currentMonth);

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-slate-50"
                    >
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                        <span className="text-base font-bold leading-5 text-slate-800">
                          {dueDate.getDate()}
                        </span>
                        <span className="text-[10px] uppercase text-slate-500">
                          {dueDate.toLocaleDateString("pt-BR", {
                            month: "short",
                          }).replace(".", "")}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.category} · {item.type}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p
                          className={`text-sm font-semibold ${
                            item.type === "Recebimento"
                              ? "text-emerald-600"
                              : "text-slate-800"
                          }`}
                        >
                          {item.type === "Recebimento" ? "+" : "−"}
                          {formatCurrency(item.amount)}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {item.status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-violet-50/70 p-4">
              <div className="rounded-lg bg-white p-2 text-violet-600 shadow-sm">
                <CircleHelp size={17} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Dica financeira
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Mantenha suas cobranças recorrentes atualizadas para
                  antecipar seus compromissos e planejar melhor seu orçamento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de recorrências */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Todas as recorrências
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Gerencie seus pagamentos e recebimentos programados.
                </p>
              </div>

              <button
                onClick={() => setShowFilters((previous) => !previous)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  showFilters
                    ? "border-violet-200 bg-violet-50 text-violet-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Filter size={16} />
                Filtros
                <ChevronDown
                  size={15}
                  className={`transition ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por nome ou categoria..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
              >
                <option value="Todas">Todos os tipos</option>
                <option value="Recebimento">Recebimentos</option>
                <option value="Pagamento">Pagamentos</option>
              </select>
            </div>

            {showFilters && (
              <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center">
                <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-slate-600">
                  Status
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-violet-300"
                  >
                    <option value="Todos">Todos os status</option>
                    <option value="Ativa">Ativas</option>
                    <option value="Pausada">Pausadas</option>
                  </select>
                </label>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearch("");
                      setTypeFilter("Todas");
                      setStatusFilter("Todos");
                    }}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-100"
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Descrição
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Categoria
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Valor
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Vencimento
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Frequência
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${item.color}`}
                        >
                          {item.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {item.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`text-sm font-semibold ${
                          item.type === "Recebimento"
                            ? "text-emerald-600"
                            : "text-slate-800"
                        }`}
                      >
                        {formatCurrency(item.amount)}
                      </span>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.type}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />
                        Dia {String(item.dueDay).padStart(2, "0")}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-600">
                        {item.frequency}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                          item.status === "Ativa"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "Ativa"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          title={
                            item.status === "Ativa"
                              ? "Pausar recorrência"
                              : "Ativar recorrência"
                          }
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-700"
                        >
                          {item.status === "Ativa" ? (
                            <Clock3 size={17} />
                          ) : (
                            <Check size={17} />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            setNotice(
                              `${item.name}: edição será conectada ao formulário de recorrência.`,
                            )
                          }
                          title="Editar recorrência"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Ellipsis size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-14 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">
                          <Search size={22} />
                        </div>
                        <p className="text-sm font-semibold text-slate-700">
                          Nenhuma recorrência encontrada
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Tente alterar os filtros ou a busca.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Exibindo{" "}
              <span className="font-semibold text-slate-700">
                {filteredItems.length}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-slate-700">
                {items.length}
              </span>{" "}
              recorrências
            </p>
            <p className="text-xs text-slate-400">
              Valores demonstrativos para visualização.
            </p>
          </div>
        </section>
      </div>

      {/* Modal de nova recorrência */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="recurring-form-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="recurring-form-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Nova recorrência
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Cadastre um recebimento ou pagamento programado.
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Fechar formulário"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tipo de recorrência
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["Pagamento", "Recebimento"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormType(type)}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        formType === type
                          ? "border-violet-300 bg-violet-50 text-violet-700 ring-2 ring-violet-100"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {type === "Pagamento" ? (
                        <ArrowUpRight size={17} />
                      ) : (
                        <ArrowDownRight size={17} />
                      )}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="recurring-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Descrição
                </label>
                <input
                  id="recurring-name"
                  required
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  placeholder="Ex.: Internet, salário, aluguel..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="recurring-amount"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Valor (R$)
                  </label>
                  <input
                    id="recurring-amount"
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formAmount}
                    onChange={(event) => setFormAmount(event.target.value)}
                    placeholder="0,00"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="recurring-day"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Dia de vencimento
                  </label>
                  <input
                    id="recurring-day"
                    required
                    type="number"
                    min="1"
                    max="31"
                    value={formDay}
                    onChange={(event) => setFormDay(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="recurring-category"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Categoria
                  </label>
                  <select
                    id="recurring-category"
                    value={formCategory}
                    onChange={(event) => setFormCategory(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                  >
                    <option>Outros</option>
                    <option>Moradia</option>
                    <option>Assinaturas</option>
                    <option>Serviços</option>
                    <option>Transporte</option>
                    <option>Saúde</option>
                    <option>Renda</option>
                    <option>Renda extra</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="recurring-frequency"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Frequência
                  </label>
                  <select
                    id="recurring-frequency"
                    value={formFrequency}
                    onChange={(event) =>
                      setFormFrequency(
                        event.target.value as RecurringItem["frequency"],
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
                  >
                    <option value="Mensal">Mensal</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Anual">Anual</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  <Plus size={17} />
                  Criar recorrência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  amount: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
  trend: "positive" | "negative" | "neutral";
};

function SummaryCard({
  title,
  amount,
  description,
  icon,
  iconClass,
  trend,
}: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={`shrink-0 rounded-xl p-3 ${iconClass}`}>{icon}</div>
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