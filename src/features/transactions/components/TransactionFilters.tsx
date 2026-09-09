import { useCallback, useState } from "react"
import {Search } from "lucide-react"

import { FilterButton } from "./FilterButton"
import { FilterDropdown } from "./FilterDropdown"

type FilterOption = {
    id: number
    name: string
}

type TransactionFiltersProps = {
    search: string
    onSearchChange: (value: string) => void
    categories: FilterOption[]
    accounts: FilterOption[]
    cards: FilterOption[]
    selectedCategoryId: number | null
    selectedAccountId: number | null
    selectedCardId: number | null
    selectedType: number | null
    onCategoryChange: (value: number | null) => void
    onAccountChange: (value: number | null) => void
    onCardChange: (value: number | null) => void
    onTypeChange: (value: number | null) => void
}

export function TransactionFilters({
    search,
    onSearchChange,
    categories,
    accounts,
    cards,
    selectedCategoryId,
    selectedAccountId,
    selectedCardId,
    selectedType,
    onCategoryChange,
    onAccountChange,
    onCardChange,
    onTypeChange,
}: TransactionFiltersProps) {
    const [openFilter, setOpenFilter] = useState<string | null>(null)

    const closeDropdown = useCallback(() => {
        setOpenFilter(null)
    }, [])

    const categoryOptions = [
        { value: "", label: "Todas" },
        ...categories.map((category) => ({
            value: String(category.id),
            label: category.name,
        })),
    ]

    const accountOptions = [
        { value: "", label: "Todas" },
        ...accounts.map((account) => ({
            value: String(account.id),
            label: account.name,
        })),
    ]

    const cardOptions = [
        { value: "", label: "Todos" },
        ...cards.map((card) => ({
            value: String(card.id),
            label: card.name,
        })),
    ]

    const typeOptions = [
        { value: "", label: "Todos" },
        { value: "1", label: "Entradas" },
        { value: "2", label: "Saídas" },
        { value: "3", label: "Transferências" },
        { value: "4", label: "Pagamento de fatura" },
    ]

    const selectedCategory = categories.find(
        (category) => category.id === selectedCategoryId,
    )

    const selectedAccount = accounts.find(
        (account) => account.id === selectedAccountId,
    )

    const selectedCard = cards.find(
        (card) => card.id === selectedCardId,
    )

    const selectedTypeLabel =
        typeOptions.find(
            (option) => option.value === String(selectedType ?? ""),
        )?.label ?? "Todos"

    return (
        <div className="border-b border-slate-200 p-4">
            <div className="flex flex-wrap items-center gap-3">               

                <div className="relative">
                    <FilterButton
                        label={`Categoria: ${selectedCategory?.name ?? "Todas"}`}
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "category" ? null : "category",
                            )
                        }
                    />

                    {openFilter === "category" && (
                        <FilterDropdown
                            options={categoryOptions}
                            value={selectedCategoryId ? String(selectedCategoryId) : ""}
                            onChange={(value) =>
                                onCategoryChange(value ? Number(value) : null)
                            }
                            onClose={closeDropdown}
                            searchable
                            searchPlaceholder="Pesquisar categoria..."
                        />
                    )}
                </div>

                <div className="relative">
                    <FilterButton
                        label={`Conta: ${selectedAccount?.name ?? "Todas"}`}
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "account" ? null : "account",
                            )
                        }
                    />

                    {openFilter === "account" && (
                        <FilterDropdown
                            options={accountOptions}
                            value={selectedAccountId ? String(selectedAccountId) : ""}
                            onChange={(value) =>
                                onAccountChange(value ? Number(value) : null)
                            }
                            onClose={closeDropdown}
                        />
                    )}
                </div>

                <div className="relative">
                    <FilterButton
                        label={`Cartão: ${selectedCard?.name ?? "Todos"}`}
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "card" ? null : "card",
                            )
                        }
                    />

                    {openFilter === "card" && (
                        <FilterDropdown
                            options={cardOptions}
                            value={selectedCardId ? String(selectedCardId) : ""}
                            onChange={(value) =>
                                onCardChange(value ? Number(value) : null)
                            }
                            onClose={closeDropdown}
                        />
                    )}
                </div>

                <div className="relative">
                    <FilterButton
                        label={`Tipo: ${selectedTypeLabel}`}
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "type" ? null : "type",
                            )
                        }
                    />

                    {openFilter === "type" && (
                        <FilterDropdown
                            options={typeOptions}
                            value={selectedType ? String(selectedType) : ""}
                            onChange={(value) =>
                                onTypeChange(value ? Number(value) : null)
                            }
                            onClose={closeDropdown}
                        />
                    )}
                </div>

                <div className="relative ml-auto">
                    <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Buscar descrição..."
                        className="w-52 rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    />
                </div>
            </div>
        </div>
    )
}