import { useEffect, useState } from "react"
import { CreditCard, X } from "lucide-react"

import {
    getAccounts,
} from "@/features/accounts/services/accountService"

import type {
    AccountResponse,
} from "@/features/accounts/services/accountService"

import {
    payCardInvoice,
} from "../services/cardService"

import type {
    CreditCardInvoiceDetail,
} from "../types/card.types"

type PayInvoiceModalProps = {
    invoice: CreditCardInvoiceDetail
    cardName?: string
    lastFourDigits?: string
    onClose: () => void
    onPaid: () => Promise<void>
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function PayInvoiceModal({
    invoice,
    cardName,
    lastFourDigits,
    onClose,
    onPaid,
}: PayInvoiceModalProps) {
    const [accounts, setAccounts] =
        useState<AccountResponse[]>([])

    const [accountId, setAccountId] =
        useState("")

    const [paymentMethod, setPaymentMethod] =
        useState("1")

    const [isLoading, setIsLoading] =
        useState(true)

    const [isSubmitting, setIsSubmitting] =
        useState(false)

    const [error, setError] =
        useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function loadAccounts() {
            try {
                setIsLoading(true)
                setError(null)

                const response = await getAccounts()

                if (cancelled) {
                    return
                }

                const activeAccounts =
                    response.filter(
                        (account) =>
                            account.isActive,
                    )

                setAccounts(activeAccounts)

                if (activeAccounts.length > 0) {
                    setAccountId(
                        String(
                            activeAccounts[0].id,
                        ),
                    )
                }
            } catch (error) {
                if (cancelled) {
                    return
                }

                console.error(
                    "Erro ao carregar contas:",
                    error,
                )

                setError(
                    "Não foi possível carregar as contas.",
                )
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        loadAccounts()

        return () => {
            cancelled = true
        }
    }, [])

    async function handleSubmit() {
        if (!accountId) {
            setError(
                "Selecione a conta que será utilizada para o pagamento.",
            )

            return
        }

        try {
            setIsSubmitting(true)
            setError(null)

            await payCardInvoice(
                invoice.cardId,
                invoice.id,
                {
                    accountId: Number(accountId),
                    paymentMethod: Number(
                        paymentMethod,
                    ),
                },
            )

            await onPaid()
        } catch (error) {
            console.error(
                "Erro ao pagar fatura:",
                error,
            )

            setError(
                "Não foi possível realizar o pagamento da fatura.",
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-950">
                            Pagar fatura
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {cardName ?? "Cartão"}
                            {lastFourDigits &&
                                ` •••• ${lastFourDigits}`}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-50"
                        aria-label="Fechar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <div className="rounded-xl bg-slate-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                <CreditCard size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Total da fatura
                                </p>

                                <p className="mt-0.5 text-lg font-bold text-slate-950">
                                    {formatCurrency(
                                        invoice.totalAmount,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label
                            htmlFor="payment-account"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Conta para pagamento
                        </label>

                        <select
                            id="payment-account"
                            value={accountId}
                            onChange={(event) =>
                                setAccountId(
                                    event.target.value,
                                )
                            }
                            disabled={
                                isLoading ||
                                isSubmitting
                            }
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50 disabled:text-slate-400"
                        >
                            <option value="">
                                {isLoading
                                    ? "Carregando contas..."
                                    : "Selecione uma conta"}
                            </option>

                            {accounts.map(
                                (account) => (
                                    <option
                                        key={
                                            account.id
                                        }
                                        value={
                                            account.id
                                        }
                                    >
                                        {account.name}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>

                    <div className="mt-5">
                        <label
                            htmlFor="payment-method"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Forma de pagamento
                        </label>

                        <select
                            id="payment-method"
                            value={paymentMethod}
                            onChange={(event) =>
                                setPaymentMethod(
                                    event.target.value,
                                )
                            }
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50 disabled:text-slate-400"
                        >
                            <option value="1">
                                Conta
                            </option>

                            <option value="2">
                                Pix
                            </option>
                        </select>
                    </div>

                    {error && (
                        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-5">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={
                            isLoading ||
                            isSubmitting ||
                            accounts.length === 0 ||
                            !accountId
                        }
                        className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Pagando..."
                            : "Pagar fatura"}
                    </button>
                </div>
            </div>
        </div>
    )
}