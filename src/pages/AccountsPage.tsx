import { useCallback, useEffect, useState } from "react"

import { AccountHeader } from "@/features/accounts/components/AccountHeader"
import { AccountSummary } from "@/features/accounts/components/AccountSummary"
import { AccountList } from "@/features/accounts/components/AccountList"
import { RecentTransactions } from "@/features/accounts/components/RecentTransactions"
import { AccountDetails } from "@/features/accounts/components/AccountDetails"
import { CreateAccountModal } from "@/features/accounts/components/CreateAccountModal"
import { DeleteAccountModal } from "@/features/accounts/components/DeleteAccountModal"

import { mapAccountTransaction } from "@/features/accounts/mappers/accountTransactionMapper"

import type {
    Account,
    AccountDetailOverviewResponse,
    AccountOverviewResponse,
} from "@/features/accounts/types/account"

import {
    deleteAccount,
    getAccountDetailOverview,
    getAccountsOverview,
} from "@/features/accounts/services/accountService"

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

function getCurrentMonth() {
    const now = new Date()

    return `${now.getFullYear()}-${String(
        now.getMonth() + 1,
    ).padStart(2, "0")}`
}

function getMonthRange(month: string) {
    const [year, monthNumber] = month.split("-").map(Number)

    const startDate = new Date(
        year,
        monthNumber - 1,
        1,
    )

    const endDate = new Date(
        year,
        monthNumber,
        0,
        23,
        59,
        59,
        999,
    )

    const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const seconds = String(date.getSeconds()).padStart(2, "0")
        const milliseconds = String(date.getMilliseconds()).padStart(3, "0")

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}-03:00`
    }

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
    }
}

function mapAccountType(type: number) {
    if (type === 1) {
        return "Conta corrente"
    }

    if (type === 2) {
        return "Conta poupança"
    }

    if (type === 3) {
        return "Dinheiro em espécie"
    }

    if (type === 4) {
        return "Investimentos"
    }

    return "Outro"
}

function mapAccountColor(color: string) {
    if (color === "blue") {
        return "bg-blue-600"
    }

    if (color === "violet") {
        return "bg-violet-600"
    }

    if (color === "green") {
        return "bg-emerald-600"
    }

    if (color === "orange") {
        return "bg-orange-500"
    }

    if (color === "red") {
        return "bg-red-600"
    }

    if (color === "pink") {
        return "bg-pink-500"
    }

    if (color === "amber") {
        return "bg-amber-500"
    }

    if (color === "slate") {
        return "bg-slate-700"
    }

    return "bg-slate-600"
}

function mapAccountTextColor(color: string) {
    if (color === "blue") {
        return "text-blue-600"
    }

    if (color === "violet") {
        return "text-violet-600"
    }

    if (color === "green") {
        return "text-emerald-600"
    }

    if (color === "orange") {
        return "text-orange-500"
    }

    if (color === "red") {
        return "text-red-600"
    }

    if (color === "pink") {
        return "text-pink-500"
    }

    if (color === "amber") {
        return "text-amber-500"
    }

    if (color === "slate") {
        return "text-slate-700"
    }

    return "text-slate-600"
}

function mapOverviewAccount(
    account: AccountOverviewResponse["accounts"][number],
): Account {
    return {
        id: account.id,
        name: account.name,
        type: mapAccountType(account.type),
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
        color: mapAccountColor(account.color),
        textColor: mapAccountTextColor(account.color),
    }
}

function mapDetailAccount(
    detail: AccountDetailOverviewResponse,
    fallback: Account,
): Account {
    return {
        ...fallback,
        id: detail.account.id,
        name: detail.account.name,
        type: mapAccountType(detail.account.type),
        balance: detail.currentBalance,
        income: detail.summary.totalIncome,
        expenses: detail.summary.totalExpense,
        initial: detail.account.name
            .trim()
            .charAt(0)
            .toUpperCase(),
        icon:
            detail.account.type === 3
                ? "wallet"
                : detail.account.name
                    .trim()
                    .charAt(0)
                    .toUpperCase(),
        color: mapAccountColor(detail.account.color),
        textColor: mapAccountTextColor(detail.account.color),
    }
}

export function AccountsPage() {
    const [selectedAccount, setSelectedAccount] =
        useState<Account | null>(null)

    const [accountDetail, setAccountDetail] =
        useState<AccountDetailOverviewResponse | null>(null)

    const [isDetailLoading, setIsDetailLoading] =
        useState(false)

    const [detailError, setDetailError] =
        useState<string | null>(null)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [selectedMonth, setSelectedMonth] =
        useState(getCurrentMonth())

    const [overview, setOverview] =
        useState<AccountOverviewResponse | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState<string | null>(null)

    const [accountToDelete, setAccountToDelete] =
        useState<Account | null>(null)

    const [isDeleting, setIsDeleting] = useState(false)

    const loadAccountsOverview = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)

            const { startDate, endDate } =
                getMonthRange(selectedMonth)

            const data = await getAccountsOverview(
                startDate,
                endDate,
            )

            setOverview(data)
        } catch (error) {
            console.error("Erro ao carregar contas:", error)

            setError("Não foi possível carregar as contas.")
        } finally {
            setIsLoading(false)
        }
    }, [selectedMonth])

    useEffect(() => {
        let cancelled = false

        async function loadOverview() {
            try {
                setIsLoading(true)
                setError(null)

                const { startDate, endDate } =
                    getMonthRange(selectedMonth)

                const data = await getAccountsOverview(
                    startDate,
                    endDate,
                )

                if (cancelled) {
                    return
                }

                setOverview(data)
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

        loadOverview()

        return () => {
            cancelled = true
        }
    }, [selectedMonth])

    useEffect(() => {
        if (!selectedAccount) {
            setAccountDetail(null)
            setDetailError(null)
            return
        }

        let cancelled = false

        async function loadAccountDetail() {
            try {
                setIsDetailLoading(true)
                setDetailError(null)

                const { startDate, endDate } =
                    getMonthRange(selectedMonth)

                const data = await getAccountDetailOverview(
                    selectedAccount.id,
                    startDate,
                    endDate,
                )

                if (cancelled) {
                    return
                }

                setAccountDetail(data)
            } catch (error) {
                if (cancelled) {
                    return
                }

                console.error(
                    "Erro ao carregar detalhes da conta:",
                    error,
                )

                setAccountDetail(null)
                setDetailError(
                    "Não foi possível carregar os detalhes da conta.",
                )
            } finally {
                if (!cancelled) {
                    setIsDetailLoading(false)
                }
            }
        }

        loadAccountDetail()

        return () => {
            cancelled = true
        }
    }, [selectedAccount, selectedMonth])

    function handleAccountDetails(account: Account) {
        setAccountDetail(null)
        setDetailError(null)
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
        setAccountDetail(null)
        setDetailError(null)
    }

    const recentTransactions =
        overview?.recentTransactions.map(
            mapAccountTransaction,
        ) ?? []

    const detailAccount =
        accountDetail && selectedAccount
            ? mapDetailAccount(
                accountDetail,
                selectedAccount,
            )
            : selectedAccount

    const detailTransactions =
        accountDetail?.transactions.items.map(
            mapAccountTransaction,
        ) ?? []

    return (
        <div className="min-h-screen bg-[#F7F7FC]">
            <div className="flex min-h-screen">
                <section className="min-w-0 flex-1 px-6 py-6 lg:px-7">
                    <AccountHeader
                        selectedMonth={selectedMonth}
                        onMonthChange={setSelectedMonth}
                        onNewAccount={() => setIsCreateModalOpen(true)}
                    />

                    {isLoading && (
                        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
                            <p className="text-sm text-slate-500">
                                Carregando contas...
                            </p>
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

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
                                    mapOverviewAccount,
                                )}
                                onDetails={handleAccountDetails}
                                onDelete={handleAccountDelete}
                            />

                            <RecentTransactions
                                transactions={recentTransactions}
                                formatCurrency={formatCurrency}
                            />
                        </>
                    )}
                </section>

                {selectedAccount && detailAccount && (
                    <AccountDetails
                        account={detailAccount}
                        transactions={detailTransactions}
                        formatCurrency={formatCurrency}
                        onClose={handleCloseDetails}
                    />
                )}
            </div>

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