import type { Transaction } from "../types/transaction.types"
import { TransactionRow } from "./TransactionRow"

type TransactionTableProps = {
    transactions: Transaction[]
    onSelectTransaction: (transactionId: number) => void
}

export function TransactionTable({
    transactions,
    onSelectTransaction,
}: TransactionTableProps) {
    return (
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
    )
}