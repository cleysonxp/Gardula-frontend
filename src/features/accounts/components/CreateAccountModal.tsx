import { useState } from "react"
import { Check, X } from "lucide-react"

type CreateAccountModalProps = {
    onClose: () => void
}

const accountColors = [
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

export function CreateAccountModal({
    onClose,
}: CreateAccountModalProps) {
    const [selectedColor, setSelectedColor] = useState("violet")
    const [initialBalance, setInitialBalance] = useState("")

    const selectedColorData = accountColors.find(
        (color) => color.value === selectedColor,
    )

    function handleInitialBalanceChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        let value = event.target.value

        // Remove tudo que não for número
        value = value.replace(/\D/g, "")

        if (!value) {
            setInitialBalance("")
            return
        }

        // Converte os últimos dois dígitos em centavos
        const numericValue = Number(value) / 100

        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue)

        setInitialBalance(formattedValue)
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
                            Nova conta
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Adicione uma nova conta ao Gardula.
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
                <form className="space-y-5 px-6 py-6">

                    {/* Nome */}
                    <div>
                        <label
                            htmlFor="account-name"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Nome da conta
                        </label>

                        <input
                            id="account-name"
                            type="text"
                            placeholder="Ex.: Nubank"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    {/* Tipo */}
                    <div>
                        <label
                            htmlFor="account-type"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Tipo da conta
                        </label>

                        <select
                            id="account-type"
                            defaultValue=""
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
                            <option value="" disabled>
                                Selecione o tipo
                            </option>

                            <option value="1">
                                Conta corrente
                            </option>

                            <option value="2">
                                Poupança
                            </option>

                            <option value="3">
                                Dinheiro em espécie
                            </option>

                            <option value="4">
                                Investimento
                            </option>
                        </select>
                    </div>

                    {/* Saldo inicial */}
                    <div>
                        <label
                            htmlFor="initial-balance"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Saldo inicial
                        </label>

                        <input
                            id="initial-balance"
                            type="text"
                            inputMode="numeric"
                            value={initialBalance}
                            onChange={handleInitialBalanceChange}
                            placeholder="R$ 0,00"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    {/* Cor */}
                    <div>
                        <p className="mb-2 text-sm font-medium text-slate-700">
                            Cor da conta
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {accountColors.map((color) => {
                                const isSelected =
                                    selectedColor === color.value

                                return (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() =>
                                            setSelectedColor(color.value)
                                        }
                                        title={color.name}
                                        aria-label={`Selecionar cor ${color.name}`}
                                        className={`relative flex h-9 w-9 items-center justify-center rounded-full ${color.className} transition hover:scale-105
                                            ${isSelected
                                                ? "ring-2 ring-slate-950 ring-offset-2"
                                                : ""
                                            }
                                        `}
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

                        {/* Prévia */}
                        <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">

                            <div
                                className={`h-3 w-3 rounded-full
                                    ${selectedColorData?.className}
                                `}
                            />

                            <span className="text-xs text-slate-500">
                                Cor selecionada:{" "}
                                <span className="font-medium text-slate-700">
                                    {selectedColorData?.name}
                                </span>
                            </span>

                        </div>
                    </div>

                    {/* Ações */}
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
                            Criar conta
                        </button>

                    </div>

                </form>
            </div>
        </div>
    )
}