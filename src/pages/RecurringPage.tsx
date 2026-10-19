import { useEffect, useMemo, useState } from "react";

import { RecurringCalendar } from "../features/recurring/components/RecurringCalendar";
import { RecurringFormModal } from "../features/recurring/components/RecurringFormModal";
import { RecurringHeader } from "../features/recurring/components/RecurringHeader";
import { RecurringList } from "../features/recurring/components/RecurringList";
import { RecurringNotice } from "../features/recurring/components/RecurringNotice";
import { RecurringSummary } from "../features/recurring/components/RecurringSummary";
import { UpcomingRecurring } from "../features/recurring/components/UpcomingRecurring";

import { getCategories } from "../features/categories/services/categoryService";
import type { CategoryResponse } from "../features/categories/services/categoryService";

import { getAccounts } from "../features/accounts/services/accountService";
import type { AccountResponse } from "../features/accounts/services/accountService";

import { getCards } from "../features/cards/services/cardService";
import type { CardResponse } from "../features/cards/types/card.types";

import {
  createRecurringTransaction,
  getRecurringTransactions,
} from "../features/recurring/services/recurringService";

import { mapRecurringTransaction } from "../features/recurring/mappers/recurringMapper";

import {
  PaymentMethod,
  TransactionType,
} from "../features/recurring/types/recurring.types";

import type {
  CreateRecurringTransactionRequest,
  RecurringTransactionResponse,
} from "../features/recurring/types/recurring.types";

import type {
  RecurringItem,
  RecurringStatus,
  RecurringType,
} from "../features/recurring/types/RecurringItem";

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

const paymentMethods = [
  { id: PaymentMethod.Pix, name: "Pix" },
  { id: PaymentMethod.Debit, name: "Débito" },
  { id: PaymentMethod.CreditCard, name: "Cartão de crédito" },
  { id: PaymentMethod.Cash, name: "Dinheiro" },
  { id: PaymentMethod.BankSlip, name: "Boleto" },
  { id: PaymentMethod.Other, name: "Outro" },
  { id: PaymentMethod.Account, name: "Conta" },
];

export function RecurringPage() {
  const [items, setItems] = useState<RecurringItem[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [cards, setCards] = useState<CardResponse[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [formCategoryId, setFormCategoryId] = useState<number | null>(null);
  const [formPaymentMethod, setFormPaymentMethod] = useState<number>(PaymentMethod.Pix);
  const [formAccountId, setFormAccountId] = useState<number | null>(null);
  const [formCardId, setFormCardId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRecurringTransactions() {
      try {
        setIsLoading(true);
        const response = await getRecurringTransactions();

        if (!cancelled) {
          setItems(response.map(mapRecurringTransaction));
        }
      } catch (error) {
        console.error("Failed to load recurring transactions:", error);

        if (!cancelled) {
          setNotice("Não foi possível carregar as recorrências.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadRecurringTransactions();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const response = await getCategories();

        if (!cancelled) {
          setCategories(response.filter((category) => category.isActive));
        }
      } catch (error) {
        console.error("Failed to load categories:", error);

        if (!cancelled) {
          setNotice("Não foi possível carregar as categorias.");
        }
      } finally {
        if (!cancelled) setIsLoadingCategories(false);
      }
    }

    async function loadAccounts() {
      try {
        const response = await getAccounts();

        if (!cancelled) {
          setAccounts(response.filter((account) => account.isActive));
        }
      } catch (error) {
        console.error("Failed to load accounts:", error);

        if (!cancelled) {
          setNotice("Não foi possível carregar as contas.");
        }
      } finally {
        if (!cancelled) setIsLoadingAccounts(false);
      }
    }

    async function loadCards() {
      try {
        const response = await getCards();

        if (!cancelled) {
          setCards(response.filter((card) => card.isActive));
        }
      } catch (error) {
        console.error("Failed to load cards:", error);

        if (!cancelled) {
          setNotice("Não foi possível carregar os cartões.");
        }
      } finally {
        if (!cancelled) setIsLoadingCards(false);
      }
    }

    loadCategories();
    loadAccounts();
    loadCards();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeItems = useMemo(
    () => items.filter((item) => item.status === "Ativa"),
    [items],
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "Todas" || item.type === typeFilter;
      const matchesStatus = statusFilter === "Todos" || item.status === statusFilter;

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
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      ),
    );

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

  const resetForm = () => {
    setFormName("");
    setFormAmount("");
    setFormDay("10");
    setFormType("Pagamento");
    setFormCategoryId(null);
    setFormPaymentMethod(PaymentMethod.Pix);
    setFormAccountId(null);
    setFormCardId(null);
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(formAmount);
    const day = Number(formDay);

    if (!formName.trim() || !Number.isFinite(amount) || amount <= 0) {
      setNotice("Informe uma descrição e um valor válido.");
      return;
    }

    if (!Number.isInteger(day) || day < 1 || day > 31) {
      setNotice("O dia de vencimento deve estar entre 1 e 31.");
      return;
    }

    const expectedCategoryType =
      formType === "Recebimento"
        ? TransactionType.Income
        : TransactionType.Expense;

    const selectedCategory = categories.find(
      (category) =>
        category.id === formCategoryId &&
        category.isActive &&
        category.type === expectedCategoryType,
    );

    if (!selectedCategory) {
      setNotice("Selecione uma categoria válida para o tipo escolhido.");
      return;
    }

    const isCreditCard = formPaymentMethod === PaymentMethod.CreditCard;

    if (isCreditCard && formType !== "Pagamento") {
      setNotice("Cartão de crédito só pode ser usado em pagamentos.");
      return;
    }

    if (isCreditCard && !cards.some((card) => card.id === formCardId)) {
      setNotice("Selecione um cartão ativo.");
      return;
    }

    if (!isCreditCard && !accounts.some((account) => account.id === formAccountId)) {
      setNotice("Selecione uma conta ativa.");
      return;
    }

    const request: CreateRecurringTransactionRequest = {
      name: formName.trim(),
      type: expectedCategoryType,
      amount,
      categoryId: selectedCategory.id,
      paymentMethod: formPaymentMethod,
      accountId: isCreditCard ? null : formAccountId,
      cardId: isCreditCard ? formCardId : null,
      dueDay: day,
      startDate: new Date().toISOString(),
      endDate: null,
    };

    try {
      setIsSubmitting(true);

      const created: RecurringTransactionResponse =
        await createRecurringTransaction(request);

      setItems((previous) => [
        mapRecurringTransaction(created),
        ...previous,
      ]);

      setSearch("");
      setTypeFilter("Todas");
      setStatusFilter("Todos");
      setShowForm(false);
      resetForm();
      setNotice("Recorrência criada com sucesso.");
    } catch (error) {
      console.error("Failed to create recurring transaction:", error);
      setNotice("Não foi possível criar a recorrência. Verifique os dados e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = (id: number) => {
    setNotice("A alteração de status será integrada na próxima etapa.");
  };

  const handleClearFilters = () => {
    setSearch("");
    setTypeFilter("Todas");
    setStatusFilter("Todos");
  };

  const handleEdit = (item: RecurringItem) => {
    setNotice(`${item.name}: a edição será integrada na próxima etapa.`);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.isActive &&
      category.type ===
      (formType === "Recebimento"
        ? TransactionType.Income
        : TransactionType.Expense),
  );

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
          <span>Financeiro</span>
          <span>/</span>
          <span className="text-violet-600">Recorrentes</span>
        </div>

        <RecurringHeader onCreate={() => setShowForm(true)} />

        <RecurringNotice message={notice} onClose={() => setNotice("")} />

        {isLoading && (
          <p className="text-sm text-slate-500">
            Carregando recorrências...
          </p>
        )}

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
          categoryId={formCategoryId}
          paymentMethod={formPaymentMethod}
          accountId={formAccountId}
          cardId={formCardId}
          categories={filteredCategories}
          accounts={accounts}
          cards={cards.map((card) => ({
            id: card.id,
            name: card.name,
            lastFourDigits: card.lastFourDigits,
            isActive: card.isActive,
          }))}
          paymentMethods={paymentMethods}
          isLoadingCategories={isLoadingCategories}
          isLoadingAccounts={isLoadingAccounts}
          isLoadingCards={isLoadingCards}
          isSubmitting={isSubmitting}
          onNameChange={setFormName}
          onAmountChange={setFormAmount}
          onDueDayChange={setFormDay}
          onTypeChange={(type) => {
            setFormType(type);
            setFormCategoryId(null);

            if (type === "Recebimento" && formPaymentMethod === PaymentMethod.CreditCard) {
              setFormPaymentMethod(PaymentMethod.Pix);
              setFormCardId(null);
            }
          }}
          onCategoryChange={setFormCategoryId}
          onPaymentMethodChange={(method) => {
            setFormPaymentMethod(method);

            if (method === PaymentMethod.CreditCard) {
              setFormAccountId(null);
            } else {
              setFormCardId(null);
            }
          }}
          onAccountChange={setFormAccountId}
          onCardChange={setFormCardId}
          onClose={() => {
            setShowForm(false);
            resetForm();
          }}
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
}