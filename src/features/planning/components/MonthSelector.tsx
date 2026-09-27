import {
    CalendarDays,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { useState } from "react"

interface MonthSelectorProps {
    year: number
    month: number
    onChange: (year: number, month: number) => void
}

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
]

const shortMonths = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
]

export function MonthSelector({
    year,
    month,
    onChange,
}: MonthSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [displayYear, setDisplayYear] = useState(year)

    const handlePreviousYear = () => {
        setDisplayYear((currentYear) => currentYear - 1)
    }

    const handleNextYear = () => {
        setDisplayYear((currentYear) => currentYear + 1)
    }

    const handleMonthChange = (selectedMonth: number) => {
        onChange(displayYear, selectedMonth)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => {
                    setDisplayYear(year)
                    setIsOpen((current) => !current)
                }}
                className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
                <CalendarDays size={18} />

                {months[month - 1]} {year}

                <ChevronDown
                    size={16}
                    className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-40 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handlePreviousYear}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            aria-label="Ano anterior"
                        >
                            <ChevronLeft size={17} />
                        </button>

                        <span className="text-sm font-bold text-slate-900">
                            {displayYear}
                        </span>

                        <button
                            type="button"
                            onClick={handleNextYear}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            aria-label="Próximo ano"
                        >
                            <ChevronRight size={17} />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {shortMonths.map(
                            (monthName, index) => {
                                const monthNumber = index + 1
                                const isSelected =
                                    displayYear === year &&
                                    monthNumber === month

                                return (
                                    <button
                                        key={monthNumber}
                                        type="button"
                                        onClick={() =>
                                            handleMonthChange(
                                                monthNumber,
                                            )
                                        }
                                        className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                            isSelected
                                                ? "bg-violet-600 text-white"
                                                : "text-slate-600 hover:bg-violet-50 hover:text-violet-600"
                                        }`}
                                    >
                                        {monthName}
                                    </button>
                                )
                            },
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}