import { useState } from "react"

import { CreateTransactionModal } from "./CreateTransactionModal"
import { TransactionDetails } from "./TransactionDetails"
import { TransactionFilters } from "./TransactionFilters"
import { TransactionSummary } from "./TransactionSummary"
import { TransactionTable } from "./TransactionTable"
import { TransactionTabs } from "./TransactionTabs"

import { transactionsMock } from "../data/transactions.mock"

export function TransactionsContent() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [selectedTransactionId, setSelectedTransactionId] = useState<
        number | null
    >(null)

    const selectedTransaction = transactionsMock.find(
        (transaction) =>
            transaction.id === selectedTransactionId
    )

    return (
        <>
            <div className="flex min-h-screen">

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
                            onClick={() =>
                                setIsCreateModalOpen(true)
                            }
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

                    <TransactionSummary />

                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <TransactionFilters />

                        <TransactionTabs />

                        <TransactionTable
                            onSelectTransaction={
                                setSelectedTransactionId
                            }
                        />

                    </section>

                </main>

                {/* Painel de detalhes */}
                {selectedTransaction && (
                    <aside className="hidden w-[330px] shrink-0 border-l border-slate-200 bg-white xl:block">

                        <TransactionDetails
                            transaction={selectedTransaction}
                            onClose={() =>
                                setSelectedTransactionId(null)
                            }
                        />

                    </aside>
                )}

            </div>

            <CreateTransactionModal
                isOpen={isCreateModalOpen}
                onClose={() =>
                    setIsCreateModalOpen(false)
                }
            />
        </>
    )
}