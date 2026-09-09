import { ChevronLeft, ChevronRight } from "lucide-react"

type TransactionPaginationProps = {
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
    onPageChange: (page: number) => void
}

export function TransactionPagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
}: TransactionPaginationProps) {
    if (totalItems === 0) {
        return null
    }

    const firstItem = (currentPage - 1) * pageSize + 1
    const lastItem = Math.min(currentPage * pageSize, totalItems)

    const getPages = () => {
        if (totalPages <= 5) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1,
            )
        }

        if (currentPage <= 3) {
            return [1, 2, 3, "...", totalPages]
        }

        if (currentPage >= totalPages - 2) {
            return [1, "...", totalPages - 2, totalPages - 1, totalPages]
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ]
    }

    const pages = getPages()

    return (
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-500">
                Mostrando {firstItem}–{lastItem} de {totalItems} transações
            </span>

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={16} />
                    Anterior
                </button>

                {pages.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 py-2 text-sm text-slate-400"
                            >
                                ...
                            </span>
                        )
                    }

                    return (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page as number)}
                            className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${page === currentPage ? "bg-violet-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                        >
                            {page}
                        </button>
                    )
                })}

                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Próxima
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}