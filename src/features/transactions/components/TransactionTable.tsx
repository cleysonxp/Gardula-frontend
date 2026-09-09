import type { Transaction } from "../types/transaction.types"

import { TransactionRow } from "./TransactionRow"
import { TransactionPagination } from "./TransactionPagination"

type TransactionTableProps = {
    transactions: Transaction[]
    onSelectTransaction: (transactionId: number) => void
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
    onPageChange: (page: number) => void
}

export function TransactionTable({
    transactions,
    onSelectTransaction,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
}: TransactionTableProps) {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                    <thead>
                        <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
                            <th className="px-5 py-4 font-medium">
                                Data
                            </th>

                            <th className="px-3 py-4 font-medium">
                                Descrição
                            </th>

                            <th className="px-3 py-4 font-medium">
                                Categoria
                            </th>

                            <th className="px-3 py-4 font-medium">
                                Conta / Cartão
                            </th>

                            <th className="px-3 py-4 font-medium">
                                Tipo
                            </th>

                            <th className="px-3 py-4 text-right font-medium">
                                Valor
                            </th>

                            <th className="px-5 py-4 text-right font-medium">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => (
                            <TransactionRow
                                key={transaction.id}
                                transaction={transaction}
                                onSelect={() => onSelectTransaction(transaction.id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <TransactionPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </div>
    )
}