import { useEffect, useState } from "react"
import { X } from "lucide-react"

import {
    getTransactionDetail,
    updateInstallment,
} from "../services/transactionService"

import {
    getCategories,
    type CategoryResponse,
} from "@/features/categories/services/categoryService"

type EditInstallmentModalProps = {
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

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function EditInstallmentModal({
    isOpen,
    transactionId,
    onClose,
    onUpdated,
}: EditInstallmentModalProps) {
    const [categories, setCategories] = useState<CategoryResponse[]>([])

    const [categoryId, setCategoryId] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")
    const [totalInstallments, setTotalInstallments] = useState("")

    const [currentInstallment, setCurrentInstallment] = useState(0)
    const [currentTotalInstallments, setCurrentTotalInstallments] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const sortedCategories = [...categories].sort((a, b) => {
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
                    categoriesResponse,
                ] = await Promise.all([
                    getTransactionDetail(transactionId),
                    getCategories(),
                ])

                if (!transactionResponse.installment) {
                    setError(
                        "A transação selecionada não é uma compra parcelada.",
                    )
                    return
                }

                setCategories(
                    categoriesResponse.filter(
                        (category) =>
                            category.isActive &&
                            category.type === 2,
                    ),
                )

                setDescription(
                    transactionResponse.description,
                )

                setAmount(
                    String(
                        transactionResponse.installment.totalAmount,
                    ),
                )

                setDate(
                    formatDateForInput(
                        transactionResponse.installment.firstDate,
                    ),
                )

                setCategoryId(
                    transactionResponse.category
                        ? String(
                            transactionResponse.category.id,
                        )
                        : "",
                )

                setCurrentInstallment(
                    transactionResponse.installment.number,
                )

                setCurrentTotalInstallments(
                    transactionResponse.installment.total,
                )

                setTotalInstallments(
                    String(
                        transactionResponse.installment.total,
                    ),
                )
            } catch {
                setError(
                    "Não foi possível carregar os dados da compra parcelada.",
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [isOpen, transactionId])

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

        const parsedTotalInstallments =
            Number(totalInstallments)

        if (
            !Number.isInteger(parsedTotalInstallments) ||
            parsedTotalInstallments <= 1
        ) {
            setError(
                "Informe uma quantidade de parcelas válida.",
            )
            return
        }

        try {
            setIsSaving(true)
            setError(null)

            await updateInstallment(transactionId, {
                amount: parsedAmount,
                description: description.trim(),
                date: new Date(
                    `${date}T12:00:00`,
                ).toISOString(),
                categoryId: Number(categoryId),
                totalInstallments:
                    parsedTotalInstallments,
            })

            onUpdated?.()
            onClose()
        } catch {
            setError(
                "Não foi possível atualizar a compra parcelada.",
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
                            Editar compra parcelada
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            A alteração será aplicada a todas as parcelas
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
                            Carregando dados da compra...
                        </div>
                    )}

                    {!isLoading && (
                        <>
                            <div className="mb-5 rounded-lg border border-violet-200 bg-violet-50 px-4 py-3">
                                <p className="text-sm font-medium text-violet-800">
                                    Editando a compra inteira
                                </p>

                                <p className="mt-1 text-sm text-violet-700">
                                    Você está editando a parcela{" "}
                                    {currentInstallment} de{" "}
                                    {currentTotalInstallments}. As alterações
                                    serão aplicadas a todas as parcelas.
                                </p>
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
                                    placeholder="Ex.: Notebook"
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
                                    Valor total da compra
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

                                <p className="mt-1.5 text-xs text-slate-400">
                                    Valor atual:{" "}
                                    {formatCurrency(
                                        Number(amount) || 0,
                                    )}
                                </p>
                            </div>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Data da primeira parcela
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

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Número de parcelas
                                </label>

                                <input
                                    type="number"
                                    min="2"
                                    step="1"
                                    value={totalInstallments}
                                    onChange={(event) =>
                                        setTotalInstallments(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isSaving}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-400"
                                />

                                <p className="mt-1.5 text-xs text-slate-400">
                                    Você pode aumentar ou diminuir a quantidade
                                    de parcelas.
                                </p>
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