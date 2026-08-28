import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

import {
    useEffect,
    useRef,
    useState,
} from "react"

import { AccountCard } from "@/features/accounts/components/AccountCard"

import type { Account } from "@/features/accounts/types/account"

type AccountListProps = {
    accounts: Account[]
    onDetails: (account: Account) => void
    onDelete: (account: Account) => void
}

export function AccountList({
    accounts,
    onDetails,
    onDelete,
}: AccountListProps) {
    const scrollContainerRef =
        useRef<HTMLDivElement | null>(null)

    const [canScrollLeft, setCanScrollLeft] =
        useState(false)

    const [canScrollRight, setCanScrollRight] =
        useState(false)

    const [showAll, setShowAll] =
        useState(false)

    function updateScrollButtons() {
        const container = scrollContainerRef.current

        if (!container) {
            return
        }

        const {
            scrollLeft,
            scrollWidth,
            clientWidth,
        } = container

        setCanScrollLeft(scrollLeft > 5)

        setCanScrollRight(
            scrollLeft + clientWidth < scrollWidth - 5,
        )
    }

    useEffect(() => {
        updateScrollButtons()

        const container = scrollContainerRef.current

        if (!container) {
            return
        }

        container.addEventListener(
            "scroll",
            updateScrollButtons,
            { passive: true },
        )

        window.addEventListener(
            "resize",
            updateScrollButtons,
        )

        return () => {
            container.removeEventListener(
                "scroll",
                updateScrollButtons,
            )

            window.removeEventListener(
                "resize",
                updateScrollButtons,
            )
        }
    }, [accounts.length, showAll])

    function scrollLeft() {
        const container = scrollContainerRef.current

        if (!container) {
            return
        }

        container.scrollBy({
            left: -(container.clientWidth * 0.85),
            behavior: "smooth",
        })
    }

    function scrollRight() {
        const container = scrollContainerRef.current

        if (!container) {
            return
        }

        container.scrollBy({
            left: container.clientWidth * 0.85,
            behavior: "smooth",
        })
    }

    function handleToggleShowAll() {
        setShowAll((current) => !current)
    }

    const hasMoreAccounts = accounts.length > 3

    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-950">
                    Suas contas
                </h2>

                <div className="flex items-center gap-3">
                    {hasMoreAccounts && (
                        <button
                            type="button"
                            onClick={handleToggleShowAll}
                            className="text-sm font-medium text-violet-600 hover:text-violet-700"
                        >
                            {showAll
                                ? "Mostrar menos"
                                : "Ver todos"}
                        </button>
                    )}

                    {!showAll &&
                        (canScrollLeft ||
                            canScrollRight) && (
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={scrollLeft}
                                    disabled={!canScrollLeft}
                                    aria-label="Ver contas anteriores"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-30"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={scrollRight}
                                    disabled={!canScrollRight}
                                    aria-label="Ver próximas contas"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-30"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                </div>
            </div>

            {!showAll ? (
                <div className="relative">
                    {canScrollLeft && (
                        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-[#F7F7FC] to-transparent" />
                    )}

                    {canScrollRight && (
                        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-[#F7F7FC] to-transparent" />
                    )}

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {accounts.map((account) => (
                            <div
                                key={account.id}
                                className="w-[calc((100%-2rem)/3)] min-w-[320px] max-w-[540px] shrink-0 snap-start"
                            >
                                <AccountCard
                                    account={account}
                                    onDetails={onDetails}
                                    onDelete={onDelete}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {accounts.map((account) => (
                        <AccountCard
                            key={account.id}
                            account={account}
                            onDetails={onDetails}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}