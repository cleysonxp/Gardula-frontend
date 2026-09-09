import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type FilterDropdownOption = {
    value: string
    label: string
}

type FilterDropdownProps = {
    options: FilterDropdownOption[]
    value: string
    onChange: (value: string) => void
    onClose: () => void
    searchable?: boolean
    searchPlaceholder?: string
}

export function FilterDropdown({
    options,
    value,
    onChange,
    onClose,
    searchable = false,
    searchPlaceholder = "Pesquisar...",
}: FilterDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [onClose])

    const handleSelect = (optionValue: string) => {
        onChange(optionValue)
        onClose()
    }

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()),
    )

    return (
        <div ref={dropdownRef} className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
            {searchable && (
                <div className="relative mb-1.5">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder={searchPlaceholder}
                        autoFocus
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    />
                </div>
            )}

            <div className="max-h-72 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => {
                        const isSelected = option.value === value

                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${isSelected ? "bg-violet-50 font-medium text-violet-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                            >
                                {option.label}
                            </button>
                        )
                    })
                ) : (
                    <div className="px-3 py-3 text-center text-sm text-slate-400">
                        Nenhuma categoria encontrada.
                    </div>
                )}
            </div>
        </div>
    )
}