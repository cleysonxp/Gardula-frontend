import { useEffect, useState } from "react"

import { AccountHeader } from "@/features/accounts/components/AccountHeader"
import { AccountSummary } from "@/features/accounts/components/AccountSummary"
import { AccountList } from "@/features/accounts/components/AccountList"
import { RecentTransactions } from "@/features/accounts/components/RecentTransactions"
import { AccountDetails } from "@/features/accounts/components/AccountDetails"
import { CreateAccountModal } from "@/features/accounts/components/CreateAccountModal"
import { DeleteAccountModal } from "@/features/accounts/components/DeleteAccountModal"

import {
    mockTransactions,
    mockAccountTransactions,
} from "@/features/accounts/data/mockAccounts"

import type {
    Account,
    AccountOverviewResponse,
} from "@/features/accounts/types/account"

import {
    deleteAccount,
    getAccountsOverview
} from "@/features/accounts/services/accountService"

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

    const [overview, setOverview] =
        useState<AccountOverviewResponse | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState<string | null>(null)

    const [accountToDelete, setAccountToDelete] =
        useState<Account | null>(null)

    const [isDeleting, setIsDeleting] = useState(false)

    async function loadAccountsOverview() {
        try {
            setIsLoading(true)
            setError(null)

            const data = await getAccountsOverview()

            setOverview(data)
        } catch (error) {
            console.error("Erro ao carregar contas:", error)

            setError("Não foi possível carregar as contas.")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        let cancelled = false

        async function loadInitialOverview() {
            try {
                const data = await getAccountsOverview()

                if (cancelled) {
                    return
                }

                setOverview(data)
                setError(null)
            } catch (error) {
                if (cancelled) {
                    return
                }

                console.error("Erro ao carregar contas:", error)

                setError("Não foi possível carregar as contas.")
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        loadInitialOverview()

        return () => {
            cancelled = true
        }
    }, [])

    function handleAccountDetails(account: Account) {
        setSelectedAccount(account)
    }

    function handleAccountDelete(account: Account) {
        setAccountToDelete(account)
    }

    async function handleConfirmDelete() {
        if (!accountToDelete) {
            return
        }

        try {
            setIsDeleting(true)
            setError(null)

            await deleteAccount(accountToDelete.id)

            setAccountToDelete(null)

            await loadAccountsOverview()
        } catch (error) {
            console.error("Erro ao excluir conta:", error)

            setError("Não foi possível excluir a conta.")
        } finally {
            setIsDeleting(false)
        }
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

                    {/* Loading */}
                    {isLoading && (
                        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
                            <p className="text-sm text-slate-500">
                                Carregando contas...
                            </p>
                        </div>
                    )}

                    {/* Erro */}
                    {!isLoading && error && (
                        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Dados reais */}
                    {!isLoading && !error && overview && (
                        <>
                            <AccountSummary
                                totalBalance={overview.totalBalance}
                                activeAccounts={overview.activeAccounts}
                                totalIncome={overview.totalIncome}
                                totalExpense={overview.totalExpense}
                                formatCurrency={formatCurrency}
                            />

                            <AccountList
                                accounts={overview.accounts.map(
                                    (account) => ({
                                        id: account.id,
                                        name: account.name,
                                        type:
                                            account.type === 1
                                                ? "Conta corrente"
                                                : account.type === 2
                                                    ? "Conta poupança"
                                                    : account.type === 3
                                                        ? "Dinheiro em espécie"
                                                        : account.type === 4
                                                            ? "Investimentos"
                                                            : "Outro",
                                        balance: account.currentBalance,
                                        income: account.income,
                                        expenses: account.expense,
                                        initial: account.name
                                            .trim()
                                            .charAt(0)
                                            .toUpperCase(),
                                        icon:
                                            account.type === 3
                                                ? "wallet"
                                                : account.name
                                                    .trim()
                                                    .charAt(0)
                                                    .toUpperCase(),
                                        color:
                                            account.color === "blue"
                                                ? "bg-blue-600"
                                                : account.color === "violet"
                                                    ? "bg-violet-600"
                                                    : account.color === "green"
                                                        ? "bg-emerald-600"
                                                        : account.color === "orange"
                                                            ? "bg-orange-500"
                                                            : account.color === "red"
                                                                ? "bg-red-600"
                                                                : account.color === "pink"
                                                                    ? "bg-pink-500"
                                                                    : account.color === "amber"
                                                                        ? "bg-amber-500"
                                                                        : account.color === "slate"
                                                                            ? "bg-slate-700"
                                                                            : "bg-slate-600",
                                        textColor:
                                            account.color === "blue"
                                                ? "text-blue-600"
                                                : account.color === "violet"
                                                    ? "text-violet-600"
                                                    : account.color === "green"
                                                        ? "text-emerald-600"
                                                        : account.color === "orange"
                                                            ? "text-orange-500"
                                                            : account.color === "red"
                                                                ? "text-red-600"
                                                                : account.color === "pink"
                                                                    ? "text-pink-500"
                                                                    : account.color === "amber"
                                                                        ? "text-amber-500"
                                                                        : account.color === "slate"
                                                                            ? "text-slate-700"
                                                                            : "text-slate-600",
                                    }),
                                )}
                                onDetails={handleAccountDetails}
                                onDelete={handleAccountDelete}
                            />
                        </>
                    )}

                    {/* Transactions continuam mockadas por enquanto */}
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
                    onCreated={loadAccountsOverview}
                />
            )}

            {accountToDelete && (
                <DeleteAccountModal
                    accountName={accountToDelete.name}
                    isDeleting={isDeleting}
                    onClose={() => setAccountToDelete(null)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>

    )
}