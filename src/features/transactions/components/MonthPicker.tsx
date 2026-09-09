import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

type MonthPickerProps = {
    value: string
    onChange: (value: string) => void
}

const months = [
    { value: "01", label: "Jan" },
    { value: "02", label: "Fev" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Abr" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Ago" },
    { value: "09", label: "Set" },
    { value: "10", label: "Out" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dez" },
]

const formatMonth = (value: string) => {
    const [year, month] = value.split("-").map(Number)

    const date = new Date(year, month - 1, 1)

    return new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric",
    }).format(date)
}

const getCurrentMonth = () => {
    const now = new Date()

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}

export function MonthPicker({ value, onChange }: MonthPickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    const [selectedYear, selectedMonth] = value.split("-").map(Number)

    const currentMonth = getCurrentMonth()

    const handlePreviousYear = () => {
        const year = selectedYear - 1

        onChange(`${year}-${String(selectedMonth).padStart(2, "0")}`)
    }

    const handleNextYear = () => {
        const year = selectedYear + 1

        onChange(`${year}-${String(selectedMonth).padStart(2, "0")}`)
    }

    const handleMonthSelect = (month: string) => {
        onChange(`${selectedYear}-${month}`)
        setIsOpen(false)
    }

    const handleCurrentMonth = () => {
        onChange(currentMonth)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button type="button" onClick={() => setIsOpen((current) => !current)} className="inline-flex min-w-[190px] items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
                <span className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-slate-500" />
                    <span className="capitalize">
                        {formatMonth(value)}
                    </span>
                </span>

                <ChevronRight
                    size={16}
                    className={`text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-[280px] rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <button type="button" onClick={handlePreviousYear} className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                            <ChevronLeft size={18} />
                        </button>

                        <span className="text-sm font-semibold text-slate-800">
                            {selectedYear}
                        </span>

                        <button type="button" onClick={handleNextYear} className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {months.map((month) => {
                            const monthValue = `${selectedYear}-${month.value}`
                            const isSelected = monthValue === value
                            const isCurrent = monthValue === currentMonth

                            return (
                                <button
                                    key={month.value}
                                    type="button"
                                    onClick={() => handleMonthSelect(month.value)}
                                    className={`rounded-lg px-2 py-2.5 text-sm font-medium transition ${isSelected ? "bg-violet-600 text-white" : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"} ${isCurrent && !isSelected ? "ring-1 ring-violet-300" : ""}`}
                                >
                                    {month.label}
                                </button>
                            )
                        })}
                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-3">
                        <button type="button" onClick={handleCurrentMonth} className="w-full rounded-lg px-3 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-50">
                            Este mês
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}