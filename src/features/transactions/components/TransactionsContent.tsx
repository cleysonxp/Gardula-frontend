import { useEffect, useState } from "react"

import { CreateTransactionModal } from "./CreateTransactionModal"
import { TransactionDetails } from "./TransactionDetails"
import { TransactionFilters } from "./TransactionFilters"
import { TransactionSummary } from "./TransactionSummary"
import { TransactionTable } from "./TransactionTable"
import { TransactionTabs } from "./TransactionTabs"

import { getTransactionDetail, getTransactions } from "../services/transactionService"
import { mapTransactionDetail } from "../mappers/transactionDetailMapper"
import { mapTransactions } from "../mappers/transactionMapper"
import type { Transaction } from "../types/transaction.types"

export function TransactionsContent() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingDetail, setIsLoadingDetail] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [detailError, setDetailError] = useState<string | null>(null)

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                setError(null)

                const response = await getTransactions({
                    page: 1,
                    pageSize: 20,
                })

                setTransactions(mapTransactions(response.items))
            } catch {
                setError("Não foi possível carregar as transações.")
            } finally {
                setIsLoading(false)
            }
        }

        loadTransactions()
    }, [])

    const handleSelectTransaction = async (transactionId: number) => {
        try {
            setSelectedTransactionId(transactionId)
            setSelectedTransaction(null)
            setIsLoadingDetail(true)
            setDetailError(null)

            const response = await getTransactionDetail(transactionId)

            setSelectedTransaction(mapTransactionDetail(response))
        } catch (error) {
            console.error("Erro ao carregar detalhes da transação:", error)
            setDetailError("Não foi possível carregar os detalhes da transação.")
        } finally {
            setIsLoadingDetail(false)
        }
    }

    const handleCloseDetails = () => {
        setSelectedTransactionId(null)
        setSelectedTransaction(null)
        setDetailError(null)
    }

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

                        <button type="button" onClick={() => setIsCreateModalOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
                            <span className="text-lg leading-none">
                                +
                            </span>
                            Nova transação
                        </button>
                    </header>

                    <TransactionSummary />

                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <TransactionFilters />

                        <TransactionTabs />

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
                                onSelectTransaction={handleSelectTransaction}
                            />
                        )}
                    </section>
                </main>

                {selectedTransactionId && (
                    <aside className="hidden w-[330px] shrink-0 border-l border-slate-200 bg-white xl:block">
                        {isLoadingDetail && (
                            <div className="p-6 text-sm text-slate-500">
                                Carregando detalhes...
                            </div>
                        )}

                        {!isLoadingDetail && detailError && (
                            <div className="p-6 text-sm text-red-500">
                                {detailError}
                            </div>
                        )}

                        {!isLoadingDetail && !detailError && selectedTransaction && (
                            <TransactionDetails
                                transaction={selectedTransaction}
                                onClose={handleCloseDetails}
                            />
                        )}
                    </aside>
                )}
            </div>

            <CreateTransactionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </>
    )
}