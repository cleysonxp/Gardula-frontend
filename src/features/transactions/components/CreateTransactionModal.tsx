import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { createTransfer } from "@/features/transactions/services/transferService"
import { createTransaction } from "@/features/transactions/services/transactionService"
import { getAccounts, type AccountResponse } from "@/features/accounts/services/accountService"
import { getCategories, type CategoryResponse } from "@/features/categories/services/categoryService"
import { apiClient } from "@/lib/api/apiClient"

type TransactionType = "income" | "expense" | "transfer"

type PaymentMethod = 1 | 2 | 3 | 4 | 5 | 6 | 7

type CardResponse = {
    id: number
    name: string
    lastFourDigits: string
    isActive: boolean
}

type CreateTransactionModalProps = {
    isOpen: boolean
    onClose: () => void
    onCreated?: () => void
}

function getTodayInputValue() {
    const today = new Date()
    const offset = today.getTimezoneOffset()
    const localDate = new Date(today.getTime() - offset * 60000)

    return localDate.toISOString().slice(0, 10)
}

export function CreateTransactionModal({
    isOpen,
    onClose,
    onCreated,
}: CreateTransactionModalProps) {
    const [type, setType] = useState<TransactionType>("income")

    const [accounts, setAccounts] = useState<AccountResponse[]>([])
    const [categories, setCategories] = useState<CategoryResponse[]>([])
    const [cards, setCards] = useState<CardResponse[]>([])

    const [accountId, setAccountId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [cardId, setCardId] = useState("")

    const [sourceAccountId, setSourceAccountId] = useState("")
    const [destinationAccountId, setDestinationAccountId] = useState("")

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(7)
    const [isInstallment, setIsInstallment] = useState(false)
    const [totalInstallments, setTotalInstallments] = useState("")

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState(getTodayInputValue())

    const [isLoadingAccounts, setIsLoadingAccounts] = useState(false)
    const [isLoadingCategories, setIsLoadingCategories] = useState(false)
    const [isLoadingCards, setIsLoadingCards] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const isTransfer = type === "transfer"
    const isExpense = type === "expense"
    const isCreditCard = paymentMethod === 3

    const categoryType = type === "income" ? 1 : type === "expense" ? 2 : null

    const filteredCategories = categories.filter(
        (category) =>
            category.isActive &&
            category.type === categoryType
    )

    const sortedCategories = [...filteredCategories].sort((a, b) => {
        const nameA = getCategoryPath(a, categories)
        const nameB = getCategoryPath(b, categories)

        return nameA.localeCompare(nameB, "pt-BR")
    })

    useEffect(() => {
        if (!isOpen) {
            return
        }

        async function loadData() {
            try {
                setError(null)
                setIsLoadingAccounts(true)
                setIsLoadingCategories(true)

                const [accountsResponse, categoriesResponse] = await Promise.all([
                    getAccounts(),
                    getCategories(),
                ])

                setAccounts(
                    accountsResponse.filter((account) => account.isActive)
                )

                setCategories(
                    categoriesResponse.filter((category) => category.isActive)
                )

                setDate(getTodayInputValue())
            } catch {
                setError("Não foi possível carregar os dados.")
            } finally {
                setIsLoadingAccounts(false)
                setIsLoadingCategories(false)
            }
        }

        loadData()
    }, [isOpen])

    useEffect(() => {
        if (!isOpen || !isCreditCard || !isExpense) {
            return
        }

        async function loadCards() {
            try {
                setIsLoadingCards(true)
                setError(null)

                const response = await apiClient("/Cards")

                if (!response.ok) {
                    throw new Error("Failed to load cards.")
                }

                const data = await response.json()

                const cardItems = Array.isArray(data)
                    ? data
                    : data.items ?? []

                setCards(
                    cardItems.filter(
                        (card: CardResponse) => card.isActive
                    )
                )
            } catch {
                setError("Não foi possível carregar os cartões.")
            } finally {
                setIsLoadingCards(false)
            }
        }

        loadCards()
    }, [isOpen, isCreditCard, isExpense])

    function handleTypeChange(newType: TransactionType) {
        setType(newType)
        setError(null)

        setCategoryId("")
        setPaymentMethod(7)
        setCardId("")
        setIsInstallment(false)
        setTotalInstallments("")

        if (newType !== "transfer") {
            setSourceAccountId("")
            setDestinationAccountId("")
        }

        if (newType === "transfer") {
            setAccountId("")
        }
    }

    function handlePaymentMethodChange(
        newPaymentMethod: PaymentMethod
    ) {
        setPaymentMethod(newPaymentMethod)
        setError(null)

        if (newPaymentMethod !== 3) {
            setCardId("")
            setIsInstallment(false)
            setTotalInstallments("")
        }

        if (newPaymentMethod === 3) {
            setAccountId("")
        }
    }

    function handleInstallmentChange(enabled: boolean) {
        setIsInstallment(enabled)
        setError(null)

        if (!enabled) {
            setTotalInstallments("")
        }
    }

    function getCategoryPath(
        category: CategoryResponse,
        categories: CategoryResponse[]
    ): string {
        const parts = [category.name]
        let currentParentId = category.parentCategoryId

        while (currentParentId !== null) {
            const parent = categories.find(
                (item) => item.id === currentParentId
            )

            if (!parent) {
                break
            }

            parts.unshift(parent.name)
            currentParentId = parent.parentCategoryId
        }

        return parts.join(" - ")
    }

    async function handleTransactionSubmit() {
        if (!accountId && !isCreditCard) {
            setError("Selecione uma conta.")
            return
        }

        if (isCreditCard && !cardId) {
            setError("Selecione um cartão.")
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

        let parsedTotalInstallments: number | null = null

        if (isCreditCard && isInstallment) {
            parsedTotalInstallments = Number(totalInstallments)

            if (
                !parsedTotalInstallments ||
                parsedTotalInstallments < 2 ||
                parsedTotalInstallments > 60
            ) {
                setError("Informe uma quantidade de parcelas entre 2 e 60.")
                return
            }
        }

        const transactionType = type === "income" ? 1 : 2

        try {
            setIsSaving(true)
            setError(null)

            await createTransaction({
                accountId: isCreditCard ? null : Number(accountId),
                cardId: isCreditCard ? Number(cardId) : null,
                categoryId: Number(categoryId),
                amount: parsedAmount,
                type: transactionType,
                paymentMethod,
                description: description.trim(),
                date: new Date(`${date}T12:00:00`).toISOString(),
                installmentGroupId: null,
                installmentNumber: null,
                totalInstallments: parsedTotalInstallments,
            })

            setAccountId("")
            setCategoryId("")
            setCardId("")
            setPaymentMethod(7)
            setIsInstallment(false)
            setTotalInstallments("")
            setDescription("")
            setAmount("")
            setDate(getTodayInputValue())

            onCreated?.()
            onClose()
        } catch {
            setError(
                type === "income"
                    ? "Não foi possível criar a entrada."
                    : "Não foi possível criar a saída."
            )
        } finally {
            setIsSaving(false)
        }
    }

    async function handleTransferSubmit() {
        if (!sourceAccountId || !destinationAccountId) {
            setError("Selecione a conta de origem e a conta de destino.")
            return
        }

        if (sourceAccountId === destinationAccountId) {
            setError("A conta de origem e destino devem ser diferentes.")
            return
        }

        const parsedAmount = Number(amount)

        if (!parsedAmount || parsedAmount <= 0) {
            setError("Informe um valor válido para a transferência.")
            return
        }

        try {
            setIsSaving(true)
            setError(null)

            await createTransfer({
                sourceAccountId: Number(sourceAccountId),
                destinationAccountId: Number(destinationAccountId),
                amount: parsedAmount,
            })

            setSourceAccountId("")
            setDestinationAccountId("")
            setAmount("")

            onCreated?.()
            onClose()
        } catch {
            setError("Não foi possível realizar a transferência.")
        } finally {
            setIsSaving(false)
        }
    }

    function handleSubmit() {
        if (isTransfer) {
            handleTransferSubmit()
            return
        }

        handleTransactionSubmit()
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-xl">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Nova transação
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Adicione uma nova movimentação financeira
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

                {/* Conteúdo */}
                <div className="max-h-[75vh] overflow-y-auto px-6 py-6">

                    {/* Tipo */}
                    <div className="mb-6">

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Tipo de transação
                        </label>

                        <div className="grid grid-cols-3 gap-3">

                            <button
                                type="button"
                                onClick={() => handleTypeChange("income")}
                                disabled={isSaving}
                                className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${type === "income" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                            >
                                Entrada
                            </button>

                            <button
                                type="button"
                                onClick={() => handleTypeChange("expense")}
                                disabled={isSaving}
                                className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${type === "expense" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                            >
                                Saída
                            </button>

                            <button
                                type="button"
                                onClick={() => handleTypeChange("transfer")}
                                disabled={isSaving}
                                className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${type === "transfer" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                            >
                                Transferência
                            </button>

                        </div>

                    </div>

                    {isTransfer ? (
                        <>
                            {/* Conta de origem */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Conta de origem
                                </label>

                                <select
                                    value={sourceAccountId}
                                    onChange={(event) => setSourceAccountId(event.target.value)}
                                    disabled={isSaving || isLoadingAccounts}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                >
                                    <option value="">
                                        {isLoadingAccounts ? "Carregando contas..." : "Selecione"}
                                    </option>

                                    {accounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* Conta de destino */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Conta de destino
                                </label>

                                <select
                                    value={destinationAccountId}
                                    onChange={(event) => setDestinationAccountId(event.target.value)}
                                    disabled={isSaving || isLoadingAccounts}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                >
                                    <option value="">
                                        {isLoadingAccounts ? "Carregando contas..." : "Selecione"}
                                    </option>

                                    {accounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* Valor */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Valor
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={amount}
                                    onChange={(event) => setAmount(event.target.value)}
                                    disabled={isSaving}
                                    placeholder="R$ 0,00"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />

                            </div>

                            {/* Data */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Data
                                </label>

                                <input
                                    type="date"
                                    disabled
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-400 outline-none"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    A transferência utiliza a data registrada pelo servidor.
                                </p>

                            </div>

                            {/* Observação */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Observação
                                </label>

                                <textarea
                                    rows={3}
                                    disabled
                                    placeholder="Adicione uma observação..."
                                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-400 outline-none placeholder:text-slate-400"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    A transferência utiliza as descrições padrão do sistema.
                                </p>

                            </div>
                        </>
                    ) : (
                        <>
                            {/* Descrição */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Descrição
                                </label>

                                <input
                                    type="text"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    disabled={isSaving}
                                    placeholder="Ex.: Salário"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />

                            </div>

                            {/* Categoria */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Categoria
                                </label>

                                <select
                                    value={categoryId}
                                    onChange={(event) => setCategoryId(event.target.value)}
                                    disabled={isSaving || isLoadingCategories}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                >
                                    <option value="">
                                        {isLoadingCategories ? "Carregando categorias..." : "Selecione uma categoria"}
                                    </option>

                                    {sortedCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {getCategoryPath(category, categories)}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* Forma de pagamento */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Forma de pagamento
                                </label>

                                <select
                                    value={paymentMethod}
                                    onChange={(event) =>
                                        handlePaymentMethodChange(
                                            Number(event.target.value) as PaymentMethod
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

                            {/* Conta */}
                            {!isCreditCard && (
                                <div className="mb-5">

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Conta
                                    </label>

                                    <select
                                        value={accountId}
                                        onChange={(event) => setAccountId(event.target.value)}
                                        disabled={isSaving || isLoadingAccounts}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                    >
                                        <option value="">
                                            {isLoadingAccounts ? "Carregando contas..." : "Selecione uma conta"}
                                        </option>

                                        {accounts.map((account) => (
                                            <option key={account.id} value={account.id}>
                                                {account.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            )}

                            {/* Cartão */}
                            {isCreditCard && (
                                <>
                                    <div className="mb-5">

                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Cartão
                                        </label>

                                        <select
                                            value={cardId}
                                            onChange={(event) => setCardId(event.target.value)}
                                            disabled={isSaving || isLoadingCards}
                                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                        >
                                            <option value="">
                                                {isLoadingCards ? "Carregando cartões..." : "Selecione um cartão"}
                                            </option>

                                            {cards.map((card) => (
                                                <option key={card.id} value={card.id}>
                                                    {card.name} •••• {card.lastFourDigits}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    {/* Parcelamento */}
                                    <div className="mb-5">

                                        <label className="flex cursor-pointer items-center gap-3">

                                            <input
                                                type="checkbox"
                                                checked={isInstallment}
                                                onChange={(event) =>
                                                    handleInstallmentChange(
                                                        event.target.checked
                                                    )
                                                }
                                                disabled={isSaving}
                                                className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                            />

                                            <span className="text-sm font-medium text-slate-700">
                                                Compra parcelada
                                            </span>

                                        </label>

                                    </div>

                                    {isInstallment && (
                                        <div className="mb-5">

                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Número de parcelas
                                            </label>

                                            <select
                                                value={totalInstallments}
                                                onChange={(event) =>
                                                    setTotalInstallments(
                                                        event.target.value
                                                    )
                                                }
                                                disabled={isSaving}
                                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                            >
                                                <option value="">
                                                    Selecione
                                                </option>

                                                {Array.from(
                                                    { length: 59 },
                                                    (_, index) => index + 2
                                                ).map((installment) => (
                                                    <option
                                                        key={installment}
                                                        value={installment}
                                                    >
                                                        {installment}x
                                                    </option>
                                                ))}
                                            </select>

                                            {amount && totalInstallments && (
                                                <p className="mt-1 text-xs text-slate-400">
                                                    Aproximadamente R$ {(
                                                        Number(amount) /
                                                        Number(totalInstallments)
                                                    ).toFixed(2).replace(".", ",")} por parcela.
                                                </p>
                                            )}

                                        </div>
                                    )}
                                </>
                            )}

                            {/* Valor */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Valor
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={amount}
                                    onChange={(event) => setAmount(event.target.value)}
                                    disabled={isSaving}
                                    placeholder="R$ 0,00"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />

                                {isCreditCard && isInstallment && totalInstallments && amount && (
                                    <p className="mt-1 text-xs text-slate-400">
                                        Compra de R$ {Number(amount).toFixed(2).replace(".", ",")} em {totalInstallments} parcelas.
                                    </p>
                                )}

                            </div>

                            {/* Data */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Data
                                </label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    disabled={isSaving}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />

                            </div>

                            {/* Observação */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Observação
                                </label>

                                <textarea
                                    rows={3}
                                    disabled
                                    placeholder="Adicione uma observação..."
                                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-400 outline-none placeholder:text-slate-400"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    A observação será adicionada posteriormente.
                                </p>

                            </div>
                        </>
                    )}

                    {error && (
                        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                </div>

                {/* Rodapé */}
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
                        disabled={isSaving || isLoadingAccounts || isLoadingCategories || isLoadingCards}
                        className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSaving ? "Salvando..." : "Salvar"}
                    </button>

                </div>

            </div>

        </div>
    )
}