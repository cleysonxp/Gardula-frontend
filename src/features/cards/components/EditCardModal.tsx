import { useState } from "react"
import { Check, X } from "lucide-react"

import type { Card } from "@/features/cards/types/card.types"

import {
    updateCard,
} from "@/features/cards/services/cardService"

type EditCardModalProps = {
    card: Card
    onClose: () => void
    onUpdated?: () => Promise<void>
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

function getColorValue(color: string) {
    const colorData = cardColors.find((item) =>
        color.includes(item.value),
    )

    return colorData?.value ?? "violet"
}

function getBrandValue(
    brand: Card["brand"],
) {
    switch (brand) {
        case "Visa":
            return 1
        case "Mastercard":
            return 2
        default:
            return 1
    }
}

export function EditCardModal({
    card,
    onClose,
    onUpdated,
}: EditCardModalProps) {
    const [name, setName] =
        useState(card.name)

    const [creditLimit, setCreditLimit] =
        useState(
            new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(card.limit),
        )

    const [closingDay, setClosingDay] =
        useState(
            String(card.closingDay),
        )

    const [dueDay, setDueDay] =
        useState(
            String(card.dueDay),
        )

    const [brand, setBrand] =
        useState(
            String(getBrandValue(card.brand)),
        )

    const [selectedColor, setSelectedColor] =
        useState(
            getColorValue(card.color),
        )

    const [isSubmitting, setIsSubmitting] =
        useState(false)

    const [error, setError] =
        useState<string | null>(null)

    const selectedColorData =
        cardColors.find(
            (color) =>
                color.value === selectedColor,
        )

    function handleCreditLimitChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        let value = event.target.value

        value = value.replace(/\D/g, "")

        if (!value) {
            setCreditLimit("")
            return
        }

        const numericValue =
            Number(value) / 100

        const formattedValue =
            new Intl.NumberFormat(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL",
                },
            ).format(numericValue)

        setCreditLimit(formattedValue)
    }

    function handleDayChange(
        event: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<
            React.SetStateAction<string>
        >,
    ) {
        const value =
            event.target.value
                .replace(/\D/g, "")
                .slice(0, 2)

        setter(value)
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        if (!name.trim()) {
            setError(
                "Informe o nome do cartão.",
            )
            return
        }

        if (!creditLimit) {
            setError(
                "Informe o limite de crédito.",
            )
            return
        }

        if (!closingDay) {
            setError(
                "Informe o dia de fechamento.",
            )
            return
        }

        if (!dueDay) {
            setError(
                "Informe o dia de vencimento.",
            )
            return
        }

        if (!brand) {
            setError(
                "Selecione a bandeira do cartão.",
            )
            return
        }

        const numericClosingDay =
            Number(closingDay)

        const numericDueDay =
            Number(dueDay)

        if (
            numericClosingDay < 1 ||
            numericClosingDay > 31
        ) {
            setError(
                "O dia de fechamento deve estar entre 1 e 31.",
            )
            return
        }

        if (
            numericDueDay < 1 ||
            numericDueDay > 31
        ) {
            setError(
                "O dia de vencimento deve estar entre 1 e 31.",
            )
            return
        }

        try {
            setIsSubmitting(true)
            setError(null)

            const numericCreditLimit =
                Number(
                    creditLimit
                        .replace(/\s/g, "")
                        .replace("R$", "")
                        .replace(/\./g, "")
                        .replace(",", ".")
                        .trim(),
                )

            await updateCard(
                card.id,
                {
                    name: name.trim(),
                    creditLimit:
                        numericCreditLimit,
                    closingDay:
                        numericClosingDay,
                    dueDay:
                        numericDueDay,
                    brand: Number(brand),
                    color: selectedColor,
                },
            )

            if (onUpdated) {
                await onUpdated()
            }

            onClose()
        } catch (error) {
            console.error(
                "Erro ao atualizar cartão:",
                error,
            )

            setError(
                "Não foi possível atualizar o cartão.",
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose()
                }
            }}
        >
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-950">
                            Editar cartão
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Atualize as informações do seu cartão.
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

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 px-6 py-6"
                >
                    <div>
                        <label
                            htmlFor="edit-card-name"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Nome do cartão
                        </label>

                        <input
                            id="edit-card-name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value,
                                )
                            }
                            placeholder="Ex.: Nubank"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="edit-card-credit-limit"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Limite de crédito
                        </label>

                        <input
                            id="edit-card-credit-limit"
                            type="text"
                            inputMode="numeric"
                            value={creditLimit}
                            onChange={
                                handleCreditLimitChange
                            }
                            placeholder="R$ 0,00"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="edit-card-closing-day"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Dia de fechamento
                            </label>

                            <input
                                id="edit-card-closing-day"
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
                                htmlFor="edit-card-due-day"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Dia de vencimento
                            </label>

                            <input
                                id="edit-card-due-day"
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

                    <div>
                        <label
                            htmlFor="edit-card-brand"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Bandeira
                        </label>

                        <select
                            id="edit-card-brand"
                            value={brand}
                            onChange={(event) =>
                                setBrand(
                                    event.target.value,
                                )
                            }
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        >
                            <option
                                value=""
                                disabled
                            >
                                Selecione a bandeira
                            </option>

                            {cardBrands.map(
                                (item) => (
                                    <option
                                        key={
                                            item.value
                                        }
                                        value={
                                            item.value
                                        }
                                    >
                                        {item.label}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium text-slate-700">
                            Cor do cartão
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {cardColors.map(
                                (color) => {
                                    const isSelected =
                                        selectedColor ===
                                        color.value

                                    return (
                                        <button
                                            key={
                                                color.value
                                            }
                                            type="button"
                                            onClick={() =>
                                                setSelectedColor(
                                                    color.value,
                                                )
                                            }
                                            title={
                                                color.name
                                            }
                                            aria-label={`Selecionar cor ${color.name}`}
                                            className={`relative flex h-9 w-9 items-center justify-center rounded-full ${color.className} transition hover:scale-105 ${isSelected ? "ring-2 ring-slate-950 ring-offset-2" : ""}`}
                                        >
                                            {isSelected && (
                                                <Check
                                                    size={
                                                        17
                                                    }
                                                    className="text-white"
                                                />
                                            )}
                                        </button>
                                    )
                                },
                            )}
                        </div>

                        <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
                            <div
                                className={`h-3 w-3 rounded-full ${selectedColorData?.className}`}
                            />

                            <span className="text-xs text-slate-500">
                                Cor selecionada:{" "}
                                <span className="font-medium text-slate-700">
                                    {
                                        selectedColorData?.name
                                    }
                                </span>
                            </span>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={
                                isSubmitting
                            }
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                            className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Salvando..."
                                : "Salvar alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}