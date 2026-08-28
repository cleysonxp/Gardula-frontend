import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"

import { getAccounts } from "@/features/accounts/services/accountService"
import type { AccountResponse } from "@/features/accounts/services/accountService"
import { createCard } from "@/features/cards/services/cardService"
import type { CreateCardRequest } from "../types/card.types"

type CreateCardModalProps = {
    onClose: () => void
    onCreated?: () => Promise<void>
}

const cardColors = [
    {
        name: "Roxo",
        value: "violet",
        className: "bg-violet-600",
    },
    {
        name: "Azul",
        value: "blue",
        className: "bg-blue-600",
    },
    {
        name: "Verde",
        value: "green",
        className: "bg-emerald-600",
    },
    {
        name: "Laranja",
        value: "orange",
        className: "bg-orange-500",
    },
    {
        name: "Vermelho",
        value: "red",
        className: "bg-red-600",
    },
    {
        name: "Rosa",
        value: "pink",
        className: "bg-pink-500",
    },
    {
        name: "Âmbar",
        value: "amber",
        className: "bg-amber-500",
    },
    {
        name: "Grafite",
        value: "slate",
        className: "bg-slate-700",
    },
]

const cardBrands = [
    {
        value: 1,
        label: "Visa",
    },
    {
        value: 2,
        label: "Mastercard",
    },
    {
        value: 3,
        label: "Elo",
    },
    {
        value: 4,
        label: "Outra",
    },
]

export function CreateCardModal({
    onClose,
    onCreated,
}: CreateCardModalProps) {
    const [name, setName] = useState("")
    const [accountId, setAccountId] = useState("")
    const [lastFourDigits, setLastFourDigits] = useState("")
    const [creditLimit, setCreditLimit] = useState("")
    const [closingDay, setClosingDay] = useState("")
    const [dueDay, setDueDay] = useState("")
    const [brand, setBrand] = useState("")
    const [selectedColor, setSelectedColor] = useState("violet")

    const [accounts, setAccounts] = useState<AccountResponse[]>([])
    const [isLoadingAccounts, setIsLoadingAccounts] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const selectedColorData = cardColors.find(
        (color) => color.value === selectedColor,
    )

    useEffect(() => {
        async function loadAccounts() {
            try {
                setIsLoadingAccounts(true)
                setError(null)

                const response = await getAccounts()

                setAccounts(response)
            } catch (error) {
                console.error("Erro ao carregar contas:", error)

                setError("Não foi possível carregar as contas.")
            } finally {
                setIsLoadingAccounts(false)
            }
        }

        loadAccounts()
    }, [])

    function handleCreditLimitChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        let value = event.target.value

        value = value.replace(/\D/g, "")

        if (!value) {
            setCreditLimit("")
            return
        }

        const numericValue = Number(value) / 100

        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue)

        setCreditLimit(formattedValue)
    }

    function handleLastFourDigitsChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const value = event.target.value.replace(/\D/g, "").slice(0, 4)

        setLastFourDigits(value)
    }

    function handleDayChange(
        event: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<string>>,
    ) {
        const value = event.target.value.replace(/\D/g, "").slice(0, 2)

        setter(value)
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        if (!name.trim()) {
            setError("Informe o nome do cartão.")
            return
        }

        if (!accountId) {
            setError("Selecione a conta vinculada.")
            return
        }

        if (lastFourDigits.length !== 4) {
            setError("Informe os 4 últimos dígitos do cartão.")
            return
        }

        if (!creditLimit) {
            setError("Informe o limite de crédito.")
            return
        }

        if (!closingDay) {
            setError("Informe o dia de fechamento.")
            return
        }

        if (!dueDay) {
            setError("Informe o dia de vencimento.")
            return
        }

        if (!brand) {
            setError("Selecione a bandeira do cartão.")
            return
        }

        const numericClosingDay = Number(closingDay)
        const numericDueDay = Number(dueDay)

        if (
            numericClosingDay < 1 ||
            numericClosingDay > 31
        ) {
            setError("O dia de fechamento deve estar entre 1 e 31.")
            return
        }

        if (
            numericDueDay < 1 ||
            numericDueDay > 31
        ) {
            setError("O dia de vencimento deve estar entre 1 e 31.")
            return
        }

        try {
            setIsSubmitting(true)
            setError(null)

            const numericCreditLimit = Number(
                creditLimit
                    .replace(/\s/g, "")
                    .replace("R$", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
                    .trim(),
            )

            const request: CreateCardRequest = {
                accountId: Number(accountId),
                name: name.trim(),
                lastFourDigits,
                creditLimit: numericCreditLimit,
                closingDay: numericClosingDay,
                dueDay: numericDueDay,
                brand: Number(brand),
                color: selectedColor,
            }

            await createCard(request)

            if (onCreated) {
                await onCreated()
            }

            onClose()
        } catch (error) {
            console.error("Erro ao criar cartão:", error)

            setError("Não foi possível criar o cartão.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                {/* Cabeçalho */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-950">
                            Novo cartão
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Adicione um novo cartão ao Gardula.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Fechar"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Formulário */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 px-6 py-6"
                >
                    {/* Nome */}
                    <div>
                        <label
                            htmlFor="card-name"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Nome do cartão
                        </label>

                        <input
                            id="card-name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Ex.: Nubank"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    {/* Conta */}
                    <div>
                        <label
                            htmlFor="card-account"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Conta vinculada
                        </label>

                        <select
                            id="card-account"
                            value={accountId}
                            onChange={(event) =>
                                setAccountId(event.target.value)
                            }
                            disabled={isLoadingAccounts}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        >
                            <option value="" disabled>
                                {isLoadingAccounts
                                    ? "Carregando contas..."
                                    : "Selecione a conta"}
                            </option>

                            {accounts.map((account) => (
                                <option
                                    key={account.id}
                                    value={account.id}
                                >
                                    {account.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Últimos 4 dígitos */}
                    <div>
                        <label
                            htmlFor="card-last-four-digits"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Últimos 4 dígitos
                        </label>

                        <input
                            id="card-last-four-digits"
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            value={lastFourDigits}
                            onChange={handleLastFourDigitsChange}
                            placeholder="1234"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    {/* Limite */}
                    <div>
                        <label
                            htmlFor="card-credit-limit"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Limite de crédito
                        </label>

                        <input
                            id="card-credit-limit"
                            type="text"
                            inputMode="numeric"
                            value={creditLimit}
                            onChange={handleCreditLimitChange}
                            placeholder="R$ 0,00"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    {/* Fechamento / Vencimento */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="card-closing-day"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Dia de fechamento
                            </label>

                            <input
                                id="card-closing-day"
                                type="text"
                                inputMode="numeric"
                                maxLength={2}
                                value={closingDay}
                                onChange={(event) =>
                                    handleDayChange(
                                        event,
                                        setClosingDay,
                                    )
                                }
                                placeholder="3"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="card-due-day"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Dia de vencimento
                            </label>

                            <input
                                id="card-due-day"
                                type="text"
                                inputMode="numeric"
                                maxLength={2}
                                value={dueDay}
                                onChange={(event) =>
                                    handleDayChange(
                                        event,
                                        setDueDay,
                                    )
                                }
                                placeholder="10"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>
                    </div>

                    {/* Bandeira */}
                    <div>
                        <label
                            htmlFor="card-brand"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Bandeira
                        </label>

                        <select
                            id="card-brand"
                            value={brand}
                            onChange={(event) =>
                                setBrand(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        >
                            <option value="" disabled>
                                Selecione a bandeira
                            </option>

                            {cardBrands.map((item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cor */}
                    <div>
                        <p className="mb-2 text-sm font-medium text-slate-700">
                            Cor do cartão
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {cardColors.map((color) => {
                                const isSelected =
                                    selectedColor === color.value

                                return (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() =>
                                            setSelectedColor(
                                                color.value,
                                            )
                                        }
                                        title={color.name}
                                        aria-label={`Selecionar cor ${color.name}`}
                                        className={`relative flex h-9 w-9 items-center justify-center rounded-full ${color.className} transition hover:scale-105 ${isSelected ? "ring-2 ring-slate-950 ring-offset-2" : ""}`}
                                    >
                                        {isSelected && (
                                            <Check
                                                size={17}
                                                className="text-white"
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
                            <div
                                className={`h-3 w-3 rounded-full ${selectedColorData?.className}`}
                            />

                            <span className="text-xs text-slate-500">
                                Cor selecionada:{" "}
                                <span className="font-medium text-slate-700">
                                    {selectedColorData?.name}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Erro */}
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Ações */}
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting || isLoadingAccounts}
                            className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Criando..."
                                : "Criar cartão"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}