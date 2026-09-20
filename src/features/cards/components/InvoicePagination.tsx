type InvoicePaginationProps = {
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
    onPageChange: (page: number) => void
}

export function InvoicePagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
}: InvoicePaginationProps) {
    if (totalItems === 0) {
        return null
    }

    const firstItem =
        (currentPage - 1) * pageSize + 1

    const lastItem = Math.min(
        currentPage * pageSize,
        totalItems,
    )

    const pages: (number | "...")[] = []

    if (totalPages <= 5) {
        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {
            pages.push(page)
        }
    } else {
        pages.push(1)

        if (currentPage > 3) {
            pages.push("...")
        }

        const startPage = Math.max(
            2,
            currentPage - 1,
        )

        const endPage = Math.min(
            totalPages - 1,
            currentPage + 1,
        )

        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {
            pages.push(page)
        }

        if (currentPage < totalPages - 2) {
            pages.push("...")
        }

        pages.push(totalPages)
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 px-5 py-4">
            <p className="text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-medium text-slate-700">
                    {firstItem}-{lastItem}
                </span>{" "}
                de{" "}
                <span className="font-medium text-slate-700">
                    {totalItems}
                </span>{" "}
                faturas
            </p>

            {totalPages > 1 && (
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() =>
                            onPageChange(
                                currentPage - 1,
                            )
                        }
                        disabled={currentPage === 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-500 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
                        aria-label="Página anterior"
                    >
                        ‹
                    </button>

                    {pages.map(
                        (page, index) =>
                            page === "..." ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="flex h-8 w-8 items-center justify-center text-sm text-slate-400"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() =>
                                        onPageChange(
                                            page,
                                        )
                                    }
                                    className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm transition ${
                                        currentPage ===
                                        page
                                            ? "bg-violet-600 text-white"
                                            : "text-slate-600 hover:bg-slate-50"
                                    }`}
                                >
                                    {page}
                                </button>
                            ),
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            onPageChange(
                                currentPage + 1,
                            )
                        }
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-500 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
                        aria-label="Próxima página"
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    )
}