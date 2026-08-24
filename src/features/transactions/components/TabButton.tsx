export function TabButton({
    label,
    active = false,
}: {
    label: string
    active?: boolean
}) {
    return (
        <button
            type="button"
            className={` relative px-4 py-4 text-sm font-medium transition
                ${active
                    ? "text-violet-600"
                    : "text-slate-500 hover:text-slate-700"
                }
            `}
        >
            {label}

            {active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
            )}
        </button>
    )
}