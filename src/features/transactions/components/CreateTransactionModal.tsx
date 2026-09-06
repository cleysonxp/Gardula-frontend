import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { createTransfer } from "@/features/transactions/services/transferService"
import { getAccounts, type AccountResponse } from "@/features/accounts/services/accountService"
import { getCategories, type CategoryResponse } from "@/features/categories/services/categoryService"

type TransactionType = "income" | "expense" | "transfer"

type CreateTransactionModalProps = {
    isOpen: boolean
    onClose: () => void
}

export function CreateTransactionModal({
    isOpen,
    onClose,
}: CreateTransactionModalProps) {
    const [type, setType] = useState<TransactionType>("income")

    const [accounts, setAccounts] = useState<AccountResponse[]>([])
    const [categories, setCategories] = useState<CategoryResponse[]>([])

    const [accountId, setAccountId] = useState("")
    const [categoryId, setCategoryId] = useState("")

    const [sourceAccountId, setSourceAccountId] = useState("")
    const [destinationAccountId, setDestinationAccountId] = useState("")

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")

    const [isLoadingAccounts, setIsLoadingAccounts] = useState(false)
    const [isLoadingCategories, setIsLoadingCategories] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const isTransfer = type === "transfer"

    const categoryType = type === "income" ? 1 : type === "expense" ? 2 : null

    const filteredCategories = categories.filter(
        (category) =>
            category.isActive &&
            category.type === categoryType
    )

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
            } catch {
                setError("Não foi possível carregar os dados.")
            } finally {
                setIsLoadingAccounts(false)
                setIsLoadingCategories(false)
            }
        }

        loadData()
    }, [isOpen])

    function handleTypeChange(newType: TransactionType) {
        setType(newType)
        setError(null)

        setCategoryId("")

        if (newType !== "transfer") {
            setSourceAccountId("")
            setDestinationAccountId("")
        }

        if (newType === "transfer") {
            setAccountId("")
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

            onClose()
        } catch {
            setError("Não foi possível realizar a transferência.")
        } finally {
            setIsSaving(false)
        }
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

                            {/* Entrada */}
                            <button
                                type="button"
                                onClick={() => handleTypeChange("income")}
                                disabled={isSaving}
                                className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${type === "income" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                            >
                                Entrada
                            </button>

                            {/* Saída */}
                            <button
                                type="button"
                                onClick={() => handleTypeChange("expense")}
                                disabled={isSaving}
                                className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${type === "expense" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                            >
                                Saída
                            </button>

                            {/* Transferência */}
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

                    {/* ================================================== */}
                    {/* FORMULÁRIO DE TRANSFERÊNCIA                       */}
                    {/* ================================================== */}

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
                            {/* ================================================== */}
                            {/* FORMULÁRIO DE ENTRADA / SAÍDA                     */}
                            {/* ================================================== */}

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

                                    {filteredCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* Conta */}
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
                                    A data será configurada na criação da transação.
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
                        onClick={isTransfer ? handleTransferSubmit : undefined}
                        disabled={isSaving || isLoadingAccounts || isLoadingCategories}
                        className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSaving ? "Salvando..." : "Salvar"}
                    </button>

                </div>

            </div>

        </div>
    )
}