import { useState } from "react"
import { X } from "lucide-react"

type TransactionType = "income" | "expense" | "transfer"

type CreateTransactionModalProps = {
    isOpen: boolean
    onClose: () => void
}

export function CreateTransactionModal({
    isOpen,
    onClose,
}: CreateTransactionModalProps) {
    const [type, setType] = useState<TransactionType>("income")

    if (!isOpen) {
        return null
    }

    const isTransfer = type === "transfer"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-xl">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Nova transação
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Adicione uma nova movimentação financeira
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Conteúdo */}
                <div className="max-h-[70vh] overflow-y-auto px-6 py-6">

                    {/* Tipo */}
                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Tipo
                        </label>

                        <div className="grid grid-cols-3 gap-3">

                            {/* Entrada */}
                            <button
                                type="button"
                                onClick={() => setType("income")}
                                className={`
                                    rounded-lg
                                    border
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                        type === "income"
                                            ? `
                                                border-violet-600
                                                bg-violet-50
                                                text-violet-700
                                            `
                                            : `
                                                border-slate-200
                                                bg-white
                                                text-slate-600
                                                hover:bg-slate-50
                                            `
                                    }
                                `}
                            >
                                Entrada
                            </button>

                            {/* Saída */}
                            <button
                                type="button"
                                onClick={() => setType("expense")}
                                className={`
                                    rounded-lg
                                    border
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                        type === "expense"
                                            ? `
                                                border-violet-600
                                                bg-violet-50
                                                text-violet-700
                                            `
                                            : `
                                                border-slate-200
                                                bg-white
                                                text-slate-600
                                                hover:bg-slate-50
                                            `
                                    }
                                `}
                            >
                                Saída
                            </button>

                            {/* Transferência */}
                            <button
                                type="button"
                                onClick={() => setType("transfer")}
                                className={`
                                    rounded-lg
                                    border
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                        type === "transfer"
                                            ? `
                                                border-violet-600
                                                bg-violet-50
                                                text-violet-700
                                            `
                                            : `
                                                border-slate-200
                                                bg-white
                                                text-slate-600
                                                hover:bg-slate-50
                                            `
                                    }
                                `}
                            >
                                Transferência
                            </button>

                        </div>

                    </div>

                    {/* ================================================== */}
                    {/* FORMULÁRIO DE TRANSFERÊNCIA                       */}
                    {/* ================================================== */}

                    {isTransfer ? (
                        <>
                            {/* Conta de origem */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Conta de origem
                                </label>

                                <select
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-slate-200
                                        bg-white
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-700
                                        outline-none
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                >
                                    <option value="">
                                        Selecione
                                    </option>

                                    <option value="1">
                                        Nubank Principal
                                    </option>

                                    <option value="2">
                                        Nubank Secundaria
                                    </option>

                                </select>

                            </div>

                            {/* Conta de destino */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Conta de destino
                                </label>

                                <select
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-slate-200
                                        bg-white
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-700
                                        outline-none
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                >
                                    <option value="">
                                        Selecione
                                    </option>

                                    <option value="1">
                                        Nubank Principal
                                    </option>

                                    <option value="2">
                                        Nubank Secundaria
                                    </option>

                                </select>

                            </div>

                            {/* Valor */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Valor
                                </label>

                                <input
                                    type="number"
                                    placeholder="R$ 0,00"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-slate-200
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-900
                                        outline-none
                                        placeholder:text-slate-400
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                />

                            </div>

                            {/* Data */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Data
                                </label>

                                <input
                                    type="date"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-slate-200
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-900
                                        outline-none
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                />

                            </div>

                            {/* Observação */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Observação
                                </label>

                                <textarea
                                    rows={3}
                                    placeholder="Adicione uma observação..."
                                    className="
                                        w-full
                                        resize-none
                                        rounded-lg
                                        border
                                        border-slate-200
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-900
                                        outline-none
                                        placeholder:text-slate-400
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                />

                            </div>
                        </>
                    ) : (
                        <>
                            {/* ================================================== */}
                            {/* FORMULÁRIO DE ENTRADA / SAÍDA                     */}
                            {/* ================================================== */}

                            {/* Descrição */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Descrição
                                </label>

                                <input
                                    type="text"
                                    placeholder="Ex.: Supermercado"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-slate-200
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-900
                                        outline-none
                                        placeholder:text-slate-400
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                />

                            </div>

                            {/* Valor */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Valor
                                </label>

                                <input
                                    type="number"
                                    placeholder="R$ 0,00"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-slate-200
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-900
                                        outline-none
                                        placeholder:text-slate-400
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                />

                            </div>

                            {/* Data e categoria */}
                            <div className="mb-5 grid grid-cols-2 gap-4">

                                {/* Data */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Data
                                    </label>

                                    <input
                                        type="date"
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-slate-200
                                            px-3
                                            py-2.5
                                            text-sm
                                            text-slate-900
                                            outline-none
                                            focus:border-violet-500
                                            focus:ring-1
                                            focus:ring-violet-500
                                        "
                                    />

                                </div>

                                {/* Categoria */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Categoria
                                    </label>

                                    <select
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-sm
                                            text-slate-700
                                            outline-none
                                            focus:border-violet-500
                                            focus:ring-1
                                            focus:ring-violet-500
                                        "
                                    >
                                        <option value="">
                                            Selecione
                                        </option>

                                        <option>
                                            Alimentação
                                        </option>

                                        <option>
                                            Transporte
                                        </option>

                                        <option>
                                            Lazer
                                        </option>

                                        <option>
                                            Saúde
                                        </option>

                                    </select>

                                </div>

                            </div>

                            {/* Conta / Cartão */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Conta / Cartão
                                </label>

                                <select
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-slate-200
                                        bg-white
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-700
                                        outline-none
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                >
                                    <option value="">
                                        Selecione
                                    </option>

                                    <option>
                                        Nubank •••• 1234
                                    </option>

                                    <option>
                                        Itaú •••• 5678
                                    </option>

                                </select>

                            </div>

                            {/* Observação */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Observação
                                </label>

                                <textarea
                                    rows={3}
                                    placeholder="Adicione uma observação..."
                                    className="
                                        w-full
                                        resize-none
                                        rounded-lg
                                        border
                                        border-slate-200
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-slate-900
                                        outline-none
                                        placeholder:text-slate-400
                                        focus:border-violet-500
                                        focus:ring-1
                                        focus:ring-violet-500
                                    "
                                />

                            </div>
                        </>
                    )}

                </div>

                {/* Rodapé */}
                <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg
                            border
                            border-slate-200
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-slate-600
                            transition
                            hover:bg-slate-50
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="
                            rounded-lg
                            bg-violet-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-violet-700
                        "
                    >
                        Salvar
                    </button>

                </div>

            </div>

        </div>
    )
}