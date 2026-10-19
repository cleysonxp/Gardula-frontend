
import { useMemo, useState } from "react";

import { RecurringCalendar } from "../features/recurring/components/RecurringCalendar";
import { RecurringFormModal } from "../features/recurring/components/RecurringFormModal";
import { RecurringHeader } from "../features/recurring/components/RecurringHeader";
import { RecurringList } from "../features/recurring/components/RecurringList";
import { RecurringNotice } from "../features/recurring/components/RecurringNotice";
import { RecurringSummary } from "../features/recurring/components/RecurringSummary";
import { UpcomingRecurring } from "../features/recurring/components/UpcomingRecurring";

import type {
  RecurringItem,
  RecurringStatus,
  RecurringType,
} from "../features/recurring/types/RecurringItem";

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
  const [items, setItems] = useState<RecurringItem[]>(initialRecurring);

  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"Todas" | RecurringType>("Todas");
  const [statusFilter, setStatusFilter] = useState<"Todos" | RecurringStatus>("Todos");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [notice, setNotice] = useState("");

  const [formName, setFormName] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formDay, setFormDay] = useState("10");
  const [formType, setFormType] = useState<RecurringType>("Pagamento");
  const [formCategory, setFormCategory] = useState("Outros");

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

  const nextSevenDaysAmount = nextSevenDays.reduce(
    (total, item) => total + item.amount,
    0,
  );

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
      isSameDay(
        getDueDate(item, currentMonth),
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day,
        ),
      ),
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
      frequency: "Mensal",
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
    setNotice("Recorrência adicionada com sucesso.");
  };

  const handleClearFilters = () => {
    setSearch("");
    setTypeFilter("Todas");
    setStatusFilter("Todos");
  };

  const handleEdit = (item: RecurringItem) => {
    setNotice(
      `${item.name}: a edição será implementada na próxima etapa.`,
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
          <span>Financeiro</span>
          <span>/</span>
          <span className="text-violet-600">Recorrentes</span>
        </div>

        <RecurringHeader onCreate={() => setShowForm(true)} />

        <RecurringNotice
          message={notice}
          onClose={() => setNotice("")}
        />

        <RecurringSummary
          monthlyIncome={monthlyIncome}
          monthlyExpenses={monthlyExpenses}
          monthlyBalance={monthlyBalance}
          nextSevenDaysCount={nextSevenDaysAmount}
        />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <RecurringCalendar
            currentMonth={currentMonth}
            activeItems={activeItems}
            selectedDay={selectedDay}
            calendarDays={calendarDays}
            onChangeMonth={changeMonth}
            onSelectDay={setSelectedDay}
            getItemsForDay={getItemsForDay}
            getDueDate={getDueDate}
            getMonthName={getMonthName}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
          />

          <UpcomingRecurring
            items={nextSevenDays}
            currentMonth={currentMonth}
            getDueDate={getDueDate}
            formatCurrency={formatCurrency}
          />
        </section>

        <RecurringList
          items={items}
          filteredItems={filteredItems}
          search={search}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          showFilters={showFilters}
          onSearchChange={setSearch}
          onTypeFilterChange={setTypeFilter}
          onStatusFilterChange={setStatusFilter}
          onToggleFilters={() => setShowFilters((previous) => !previous)}
          onClearFilters={handleClearFilters}
          onToggleStatus={toggleStatus}
          onEdit={handleEdit}
          formatCurrency={formatCurrency}
        />

        <RecurringFormModal
          isOpen={showForm}
          name={formName}
          amount={formAmount}
          dueDay={formDay}
          type={formType}
          category={formCategory}
          onNameChange={setFormName}
          onAmountChange={setFormAmount}
          onDueDayChange={setFormDay}
          onTypeChange={setFormType}
          onCategoryChange={setFormCategory}
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
}
