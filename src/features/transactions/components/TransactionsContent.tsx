import { useCallback, useEffect, useState } from "react"

import { CreateTransactionModal } from "./CreateTransactionModal"
import { DeleteTransactionModal } from "./DeleteTransactionModal"
import { EditTransactionModal } from "./EditTransactionModal"
import { EditTransferModal } from "./EditTransferModal"
import { MonthPicker } from "./MonthPicker"
import { TransactionDetails } from "./TransactionDetails"
import { TransactionFilters } from "./TransactionFilters"
import { TransactionSummary } from "./TransactionSummary"
import { TransactionTable } from "./TransactionTable"
import { TransactionTabs } from "./TransactionTabs"
import { EditInstallmentModal } from "./EditInstallmentModal"

import {
    deleteInstallmentGroup,
    deleteTransaction,
    getTransactionDetail,
    getTransactions,
} from "../services/transactionService"

import {
    deleteTransfer,
} from "@/features/transactions/services/transferService"

import {
    getCategories,
    type CategoryResponse,
} from "@/features/categories/services/categoryService"

import {
    getAccounts,
    type AccountResponse,
} from "@/features/accounts/services/accountService"

import { getCards } from "@/features/cards/services/cardService"

import type { CardResponse } from "@/features/cards/types/card.types"

import { mapTransactionDetail } from "../mappers/transactionDetailMapper"
import { mapTransactions } from "../mappers/transactionMapper"

import type { Transaction } from "../types/transaction.types"

const getCurrentMonth = () => {
    const now = new Date()

    return `${now.getFullYear()}-${String(
        now.getMonth() + 1,
    ).padStart(2, "0")}`
}

const getMonthRange = (month: string) => {
    const [year, monthNumber] = month.split("-").map(Number)

    const startDate = new Date(
        Date.UTC(
            year,
            monthNumber - 1,
            1,
            0,
            0,
            0,
        ),
    )

    const endDate = new Date(
        Date.UTC(
            year,
            monthNumber,
            0,
            23,
            59,
            59,
        ),
    )

    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    }
}

export function TransactionsContent() {
    const [search, setSearch] = useState("")
    const [selectedMonth, setSelectedMonth] = useState(
        getCurrentMonth(),
    )

    const [selectedCategoryId, setSelectedCategoryId] =
        useState<number | null>(null)

    const [selectedAccountId, setSelectedAccountId] =
        useState<number | null>(null)

    const [selectedCardId, setSelectedCardId] =
        useState<number | null>(null)

    const [selectedType, setSelectedType] =
        useState<number | null>(null)

    const [sortOrder, setSortOrder] =
        useState<"asc" | "desc">("desc")

    const [categories, setCategories] =
        useState<CategoryResponse[]>([])

    const [accounts, setAccounts] =
        useState<AccountResponse[]>([])

    const [cards, setCards] =
        useState<CardResponse[]>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [pageSize] = useState(20)

    const [isCreateModalOpen, setIsCreateModalOpen] =
        useState(false)

    const [selectedTransactionId, setSelectedTransactionId] =
        useState<number | null>(null)

    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null)

    const [transactions, setTransactions] =
        useState<Transaction[]>([])

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingDetail, setIsLoadingDetail] = useState(false)

    const [error, setError] =
        useState<string | null>(null)

    const [detailError, setDetailError] =
        useState<string | null>(null)

    const [summaryRefreshKey, setSummaryRefreshKey] =
        useState(0)

    const [isEditModalOpen, setIsEditModalOpen] =
        useState(false)

    const [editingTransactionId, setEditingTransactionId] =
        useState<number | null>(null)

    const [isEditTransferModalOpen, setIsEditTransferModalOpen] =
        useState(false)

    const [editingTransferId, setEditingTransferId] =
        useState<number | null>(null)

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false)

    const [deletingTransactionId, setDeletingTransactionId] =
        useState<number | string | null>(null)

    const [deletingTransactionDescription, setDeletingTransactionDescription] =
        useState("")

    const [deleteAction, setDeleteAction] =
        useState<((id: number | string) => Promise<void>) | null>(null)

    const [isEditInstallmentModalOpen, setIsEditInstallmentModalOpen] =
        useState(false)

    const [editingInstallmentId, setEditingInstallmentId] =
        useState<number | null>(null)

    const loadFilterOptions = useCallback(async () => {
        try {
            const [
                categoriesResponse,
                accountsResponse,
                cardsResponse,
            ] = await Promise.all([
                getCategories(),
                getAccounts(),
                getCards(),
            ])

            setCategories(
                categoriesResponse.filter(
                    (category) => category.isActive,
                ),
            )

            setAccounts(
                accountsResponse.filter(
                    (account) => account.isActive,
                ),
            )

            setCards(
                cardsResponse.filter(
                    (card) => card.isActive,
                ),
            )
        } catch (error) {
            console.error(
                "Erro ao carregar filtros:",
                error,
            )
        }
    }, [])

    const loadTransactions = useCallback(async () => {
        try {
            const { startDate, endDate } =
                getMonthRange(selectedMonth)

            setIsLoading(true)

            const response = await getTransactions({
                startDate,
                endDate,
                categoryId:
                    selectedCategoryId ?? undefined,
                accountId:
                    selectedAccountId ?? undefined,
                cardId:
                    selectedCardId ?? undefined,
                type:
                    selectedType ?? undefined,
                sortOrder,
                page: currentPage,
                pageSize,
                search:
                    search || undefined,
            })

            setError(null)

            setTransactions(
                mapTransactions(response.items),
            )

            setTotalPages(response.totalPages)
            setTotalItems(response.totalItems)
        } catch {
            setError(
                "Não foi possível carregar as transações.",
            )
        } finally {
            setIsLoading(false)
        }
    }, [
        search,
        selectedMonth,
        selectedCategoryId,
        selectedAccountId,
        selectedCardId,
        selectedType,
        sortOrder,
        currentPage,
        pageSize,
    ])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadFilterOptions()
    }, [loadFilterOptions])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTransactions()
    }, [loadTransactions])

    const handleTransactionCreated = async () => {
        await loadTransactions()

        setSummaryRefreshKey(
            (current) => current + 1,
        )
    }

    const handleTransactionUpdated = async () => {
        await loadTransactions()

        setSummaryRefreshKey(
            (current) => current + 1,
        )
    }

    const handleTransactionDeleted = async () => {
        await loadTransactions()

        setSummaryRefreshKey(
            (current) => current + 1,
        )
    }

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month)
        setCurrentPage(1)

        setSummaryRefreshKey(
            (current) => current + 1,
        )
    }

    const handlePageChange = (page: number) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return
        }

        setCurrentPage(page)
    }

    const handleSelectTransaction = async (
        transactionId: number,
    ) => {
        try {
            setSelectedTransactionId(transactionId)
            setSelectedTransaction(null)
            setIsLoadingDetail(true)
            setDetailError(null)

            const response =
                await getTransactionDetail(
                    transactionId,
                )

            setSelectedTransaction(
                mapTransactionDetail(response),
            )
        } catch (error) {
            console.error(
                "Erro ao carregar detalhes da transação:",
                error,
            )

            setDetailError(
                "Não foi possível carregar os detalhes da transação.",
            )
        } finally {
            setIsLoadingDetail(false)
        }
    }

    const handleCloseDetails = () => {
        setSelectedTransactionId(null)
        setSelectedTransaction(null)
        setDetailError(null)
    }

    const handleEditTransaction = async (
        transactionId: number,
    ) => {
        try {
            const transaction =
                await getTransactionDetail(
                    transactionId,
                )

            if (transaction.transfer) {
                setEditingTransferId(
                    transaction.transfer.id,
                )

                setIsEditTransferModalOpen(true)

                return
            }

            if (transaction.installment) {
                setEditingInstallmentId(transactionId)
                setIsEditInstallmentModalOpen(true)

                return
            }

            setEditingTransactionId(transactionId)
            setIsEditModalOpen(true)
        } catch (error) {
            console.error(
                "Erro ao carregar transação para edição:",
                error,
            )
        }
    }

    const handleDeleteTransaction = async (
        transactionId: number,
    ) => {
        try {
            const transaction =
                await getTransactionDetail(
                    transactionId,
                )

            setDeletingTransactionDescription(
                transaction.description,
            )

            if (transaction.transfer) {
                setDeletingTransactionId(
                    transaction.transfer.id,
                )

                setDeleteAction(
                    () =>
                        async (id) => {
                            await deleteTransfer(
                                Number(id),
                            )
                        },
                )
            } else if (transaction.installment) {
                setDeletingTransactionId(
                    transaction.installment.groupId,
                )

                setDeleteAction(
                    () =>
                        async (groupId) => {
                            await deleteInstallmentGroup(
                                String(groupId),
                            )
                        },
                )
            } else {
                setDeletingTransactionId(
                    transactionId,
                )

                setDeleteAction(
                    () =>
                        async (id) => {
                            await deleteTransaction(
                                Number(id),
                            )
                        },
                )
            }

            setIsDeleteModalOpen(true)
        } catch (error) {
            console.error(
                "Erro ao carregar transação para exclusão:",
                error,
            )
        }
    }

    const { startDate, endDate } =
        getMonthRange(selectedMonth)

    return (
        <>
            <div className="flex min-h-screen">
                <main className="min-w-0 flex-1 px-6 py-7">
                    <header className="mb-7 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Transações
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Acompanhe todas as suas movimentações financeiras
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <MonthPicker
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setIsCreateModalOpen(true)
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                            >
                                <span className="text-lg leading-none">
                                    +
                                </span>

                                Nova transação
                            </button>
                        </div>
                    </header>

                    <TransactionSummary
                        refreshKey={summaryRefreshKey}
                        startDate={startDate}
                        endDate={endDate}
                    />

                    <section className="relative rounded-xl border border-slate-200 bg-white shadow-sm">
                        <TransactionFilters
                            search={search}
                            onSearchChange={(value) => {
                                setSearch(value)
                                setCurrentPage(1)
                            }}
                            categories={categories}
                            accounts={accounts}
                            cards={cards}
                            selectedCategoryId={
                                selectedCategoryId
                            }
                            selectedAccountId={
                                selectedAccountId
                            }
                            selectedCardId={
                                selectedCardId
                            }
                            selectedType={selectedType}
                            onCategoryChange={(value) => {
                                setSelectedCategoryId(value)
                                setCurrentPage(1)
                            }}
                            onAccountChange={(value) => {
                                setSelectedAccountId(value)
                                setCurrentPage(1)
                            }}
                            onCardChange={(value) => {
                                setSelectedCardId(value)
                                setCurrentPage(1)
                            }}
                            onTypeChange={(value) => {
                                setSelectedType(value)
                                setCurrentPage(1)
                            }}
                        />

                        <TransactionTabs
                            selectedType={selectedType}
                            onTypeChange={(value) => {
                                setSelectedType(value)
                                setCurrentPage(1)
                            }}
                            sortOrder={sortOrder}
                            onSortOrderChange={(value) => {
                                setSortOrder(value)
                                setCurrentPage(1)
                            }}
                        />

                        {isLoading && (
                            <div className="px-5 py-10 text-center text-sm text-slate-500">
                                Carregando transações...
                            </div>
                        )}

                        {!isLoading && error && (
                            <div className="px-5 py-10 text-center text-sm text-red-500">
                                {error}
                            </div>
                        )}

                        {!isLoading && !error && (
                            <TransactionTable
                                transactions={transactions}
                                onSelectTransaction={
                                    handleSelectTransaction
                                }
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalItems={totalItems}
                                pageSize={pageSize}
                                onPageChange={
                                    handlePageChange
                                }
                                onEditTransaction={
                                    handleEditTransaction
                                }
                                onDeleteTransaction={
                                    handleDeleteTransaction
                                }
                            />
                        )}
                    </section>
                </main>

                {selectedTransactionId && (
                    <aside className="sticky top-0 hidden h-screen w-[330px] shrink-0 border-l border-slate-200 bg-white xl:block">
                        {isLoadingDetail && (
                            <div className="p-6 text-sm text-slate-500">
                                Carregando detalhes...
                            </div>
                        )}

                        {!isLoadingDetail &&
                            detailError && (
                                <div className="p-6 text-sm text-red-500">
                                    {detailError}
                                </div>
                            )}

                        {!isLoadingDetail &&
                            !detailError &&
                            selectedTransaction && (
                                <TransactionDetails
                                    transaction={selectedTransaction}
                                    onClose={handleCloseDetails}
                                    onEdit={handleEditTransaction}
                                    onDelete={handleDeleteTransaction}
                                />
                            )}
                    </aside>
                )}
            </div>

            <CreateTransactionModal
                isOpen={isCreateModalOpen}
                onClose={() =>
                    setIsCreateModalOpen(false)
                }
                onCreated={
                    handleTransactionCreated
                }
            />

            <EditTransactionModal
                isOpen={isEditModalOpen}
                transactionId={
                    editingTransactionId
                }
                onClose={() => {
                    setIsEditModalOpen(false)
                    setEditingTransactionId(null)
                }}
                onUpdated={
                    handleTransactionUpdated
                }
            />

            <EditTransferModal
                isOpen={
                    isEditTransferModalOpen
                }
                transferId={
                    editingTransferId
                }
                onClose={() => {
                    setIsEditTransferModalOpen(false)
                    setEditingTransferId(null)
                }}
                onUpdated={
                    handleTransactionUpdated
                }
            />

            <EditInstallmentModal
                isOpen={isEditInstallmentModalOpen}
                transactionId={editingInstallmentId}
                onClose={() => {
                    setIsEditInstallmentModalOpen(false)
                    setEditingInstallmentId(null)
                }}
                onUpdated={handleTransactionUpdated}
            />

            <DeleteTransactionModal
                isOpen={isDeleteModalOpen}
                transactionId={
                    deletingTransactionId
                }
                transactionDescription={
                    deletingTransactionDescription
                }
                deleteAction={deleteAction}
                onClose={() => {
                    setIsDeleteModalOpen(false)
                    setDeletingTransactionId(null)
                    setDeletingTransactionDescription("")
                    setDeleteAction(null)
                }}
                onDeleted={
                    handleTransactionDeleted
                }
            />
        </>
    )
}