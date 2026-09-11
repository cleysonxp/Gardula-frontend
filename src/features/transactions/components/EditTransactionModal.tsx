import { useEffect, useState } from "react"
import { X } from "lucide-react"

import {
    getTransactionDetail,
    updateTransaction,
} from "../services/transactionService"

import {
    getAccounts,
    type AccountResponse,
} from "@/features/accounts/services/accountService"

import {
    getCategories,
    type CategoryResponse,
} from "@/features/categories/services/categoryService"

import { getCards } from "@/features/cards/services/cardService"

import type { CardResponse } from "@/features/cards/types/card.types"

type TransactionType = "income" | "expense"

type PaymentMethod = 1 | 2 | 3 | 4 | 5 | 6 | 7

type EditTransactionModalProps = {
    isOpen: boolean
    transactionId: number | null
    onClose: () => void
    onUpdated?: () => void
}

function formatDateForInput(date: string) {
    const transactionDate = new Date(date)

    const year = transactionDate.getFullYear()
    const month = String(transactionDate.getMonth() + 1).padStart(2, "0")
    const day = String(transactionDate.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

function getCategoryPath(
    category: CategoryResponse,
    categories: CategoryResponse[],
): string {
    const parts = [category.name]
    let currentParentId = category.parentCategoryId

    while (currentParentId !== null) {
        const parent = categories.find(
            (item) => item.id === currentParentId,
        )

        if (!parent) {
            break
        }

        parts.unshift(parent.name)
        currentParentId = parent.parentCategoryId
    }

    return parts.join(" - ")
}

export function EditTransactionModal({
    isOpen,
    transactionId,
    onClose,
    onUpdated,
}: EditTransactionModalProps) {
    const [type, setType] = useState<TransactionType>("expense")

    const [accounts, setAccounts] = useState<AccountResponse[]>([])
    const [categories, setCategories] = useState<CategoryResponse[]>([])
    const [cards, setCards] = useState<CardResponse[]>([])

    const [accountId, setAccountId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [cardId, setCardId] = useState("")

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(7)

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isLoadingCards, setIsLoadingCards] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const isExpense = type === "expense"
    const isCreditCard = paymentMethod === 3

    const filteredCategories = categories.filter(
        (category) =>
            category.isActive &&
            category.type === (type === "income" ? 1 : 2),
    )

    const sortedCategories = [...filteredCategories].sort((a, b) => {
        const nameA = getCategoryPath(a, categories)
        const nameB = getCategoryPath(b, categories)

        return nameA.localeCompare(nameB, "pt-BR")
    })

    useEffect(() => {
        if (!isOpen || !transactionId) {
            return
        }

        async function loadData() {
            try {
                setIsLoading(true)
                setError(null)

                const [
                    transactionResponse,
                    accountsResponse,
                    categoriesResponse,
                    cardsResponse,
                ] = await Promise.all([
                    getTransactionDetail(transactionId),
                    getAccounts(),
                    getCategories(),
                    getCards(),
                ])

                if (
                    transactionResponse.type === 3 ||
                    transactionResponse.installment
                ) {
                    setError(
                        transactionResponse.type === 3
                            ? "Transferências devem ser editadas pelo fluxo de transferência."
                            : "Compras parceladas devem ser editadas pelo fluxo de parcelas.",
                    )
                    return
                }

                setAccounts(
                    accountsResponse.filter(
                        (account) => account.isActive,
                    ),
                )

                setCategories(
                    categoriesResponse.filter(
                        (category) => category.isActive,
                    ),
                )

                setCards(
                    cardsResponse.filter(
                        (card) => card.isActive,
                    ),
                )

                setType(
                    transactionResponse.type === 1
                        ? "income"
                        : "expense",
                )

                setDescription(transactionResponse.description)
                setAmount(String(transactionResponse.amount))
                setDate(formatDateForInput(transactionResponse.date))
                setPaymentMethod(
                    transactionResponse.paymentMethod as PaymentMethod,
                )

                setCategoryId(
                    transactionResponse.category
                        ? String(transactionResponse.category.id)
                        : "",
                )

                setAccountId(
                    transactionResponse.account
                        ? String(transactionResponse.account.id)
                        : "",
                )

                setCardId(
                    transactionResponse.card
                        ? String(transactionResponse.card.id)
                        : "",
                )
            } catch {
                setError(
                    "Não foi possível carregar os dados da transação.",
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [isOpen, transactionId])

    function handleTypeChange(newType: TransactionType) {
        setType(newType)
        setError(null)
        setCategoryId("")

        if (newType === "income") {
            setPaymentMethod(7)
            setCardId("")
        }
    }

    function handlePaymentMethodChange(
        newPaymentMethod: PaymentMethod,
    ) {
        setPaymentMethod(newPaymentMethod)
        setError(null)

        if (newPaymentMethod !== 3) {
            setCardId("")
        }

        if (newPaymentMethod === 3) {
            setAccountId("")
        }
    }

    async function handleSubmit() {
        if (!transactionId) {
            return
        }

        if (!categoryId) {
            setError("Selecione uma categoria.")
            return
        }

        if (!description.trim()) {
            setError("Informe uma descrição.")
            return
        }

        const parsedAmount = Number(amount)

        if (!parsedAmount || parsedAmount <= 0) {
            setError("Informe um valor válido.")
            return
        }

        if (!date) {
            setError("Informe uma data.")
            return
        }

        if (isCreditCard && !cardId) {
            setError("Selecione um cartão.")
            return
        }

        if (!isCreditCard && !accountId) {
            setError("Selecione uma conta.")
            return
        }

        try {
            setIsSaving(true)
            setError(null)

            await updateTransaction(transactionId, {
                accountId: isCreditCard
                    ? null
                    : Number(accountId),
                cardId: isCreditCard
                    ? Number(cardId)
                    : null,
                categoryId: Number(categoryId),
                amount: parsedAmount,
                type: type === "income" ? 1 : 2,
                paymentMethod,
                description: description.trim(),
                date: new Date(
                    `${date}T12:00:00`,
                ).toISOString(),
            })

            onUpdated?.()
            onClose()
        } catch {
            setError(
                "Não foi possível atualizar a transação.",
            )
        } finally {
            setIsSaving(false)
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-slate-900/50"
                onClick={isSaving ? undefined : onClose}
            />

            <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Editar transação
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Altere os dados da movimentação financeira
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Fechar"
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
                    {isLoading && (
                        <div className="py-10 text-center text-sm text-slate-500">
                            Carregando dados da transação...
                        </div>
                    )}

                    {!isLoading && (
                        <>
                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Tipo de transação
                                </label>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleTypeChange("income")
                                        }
                                        disabled={isSaving}
                                        className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${type === "income" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                                    >
                                        Entrada
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleTypeChange("expense")
                                        }
                                        disabled={isSaving}
                                        className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${type === "expense" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                                    >
                                        Saída
                                    </button>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Descrição
                                </label>

                                <input
                                    type="text"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isSaving}
                                    placeholder="Ex.: Salário"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Categoria
                                </label>

                                <select
                                    value={categoryId}
                                    onChange={(event) =>
                                        setCategoryId(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isSaving}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                >
                                    <option value="">
                                        Selecione uma categoria
                                    </option>

                                    {sortedCategories.map(
                                        (category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {getCategoryPath(
                                                    category,
                                                    categories,
                                                )}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Forma de pagamento
                                </label>

                                <select
                                    value={paymentMethod}
                                    onChange={(event) =>
                                        handlePaymentMethodChange(
                                            Number(
                                                event.target.value,
                                            ) as PaymentMethod,
                                        )
                                    }
                                    disabled={isSaving}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                >
                                    <option value={7}>
                                        Conta
                                    </option>

                                    <option value={1}>
                                        Pix
                                    </option>

                                    <option value={2}>
                                        Débito
                                    </option>

                                    {isExpense && (
                                        <option value={3}>
                                            Cartão de crédito
                                        </option>
                                    )}

                                    <option value={4}>
                                        Dinheiro
                                    </option>

                                    <option value={5}>
                                        Boleto
                                    </option>

                                    <option value={6}>
                                        Outro
                                    </option>
                                </select>
                            </div>

                            {!isCreditCard && (
                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Conta
                                    </label>

                                    <select
                                        value={accountId}
                                        onChange={(event) =>
                                            setAccountId(
                                                event.target.value,
                                            )
                                        }
                                        disabled={isSaving}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                    >
                                        <option value="">
                                            Selecione uma conta
                                        </option>

                                        {accounts.map(
                                            (account) => (
                                                <option
                                                    key={account.id}
                                                    value={account.id}
                                                >
                                                    {account.name}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>
                            )}

                            {isCreditCard && (
                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Cartão
                                    </label>

                                    <select
                                        value={cardId}
                                        onChange={(event) =>
                                            setCardId(
                                                event.target.value,
                                            )
                                        }
                                        disabled={
                                            isSaving ||
                                            isLoadingCards
                                        }
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                    >
                                        <option value="">
                                            Selecione um cartão
                                        </option>

                                        {cards.map((card) => (
                                            <option
                                                key={card.id}
                                                value={card.id}
                                            >
                                                {card.name} ••••{" "}
                                                {card.lastFourDigits}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Valor
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={amount}
                                    onChange={(event) =>
                                        setAmount(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isSaving}
                                    placeholder="R$ 0,00"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Data
                                </label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(event) =>
                                        setDate(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isSaving}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />
                            </div>

                            {error && (
                                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading || isSaving || !!error}
                        className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSaving ? "Salvando..." : "Salvar alterações"}
                    </button>
                </div>
            </div>
        </div>
    )
}