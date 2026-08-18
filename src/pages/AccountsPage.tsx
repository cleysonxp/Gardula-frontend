import { useState } from "react"

import { AccountHeader } from "@/features/accounts/components/AccountHeader"
import { AccountSummary } from "@/features/accounts/components/AccountSummary"
import { AccountList } from "@/features/accounts/components/AccountList"
import { RecentTransactions } from "@/features/accounts/components/RecentTransactions"
import { AccountDetails } from "@/features/accounts/components/AccountDetails"
import { CreateAccountModal } from "@/features/accounts/components/CreateAccountModal"

import {
    mockAccounts,
    mockTransactions,
    mockAccountTransactions,
} from "@/features/accounts/data/mockAccounts"

import type { Account } from "@/features/accounts/types/account"

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function AccountsPage() {
    const [selectedAccount, setSelectedAccount] =
        useState<Account | null>(null)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    function handleAccountDetails(account: Account) {
        setSelectedAccount(account)
    }

    function handleAccountDelete(account: Account) {
        console.log("Deletar:", account)
    }

    function handleCloseDetails() {
        setSelectedAccount(null)
    }

    return (
        <div className="min-h-screen bg-[#F7F7FC]">

            <div className="flex min-h-screen">

                {/* Área principal */}
                <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">

                    <AccountHeader
                        onNewAccount={() => setIsCreateModalOpen(true)}
                    />

                    <AccountSummary
                        accounts={mockAccounts}
                        formatCurrency={formatCurrency}
                    />

                    <AccountList
                        accounts={mockAccounts}
                        onDetails={handleAccountDetails}
                        onDelete={handleAccountDelete}
                    />

                    <RecentTransactions
                        transactions={mockTransactions}
                        formatCurrency={formatCurrency}
                    />

                </section>

                {/* Drawer de detalhes */}
                {selectedAccount && (
                    <AccountDetails
                        account={selectedAccount}
                        transactions={mockAccountTransactions}
                        formatCurrency={formatCurrency}
                        onClose={handleCloseDetails}
                    />
                )}

            </div>

            {/* Modal de nova conta */}
            {isCreateModalOpen && (
                <CreateAccountModal
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

        </div>
    )
}