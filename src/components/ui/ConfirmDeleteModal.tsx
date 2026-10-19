import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

type ConfirmDeleteModalProps = {
    isOpen: boolean;
    title?: string;
    description?: string;
    itemName: string;
    isDeleting?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDeleteModal({
    isOpen,
    title = "Excluir recorrência?",
    description = "Tem certeza de que deseja excluir este item? Essa ação não poderá ser desfeita.",
    itemName,
    isDeleting = false,
    onConfirm,
    onCancel,
}: ConfirmDeleteModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isDeleting) {
                onCancel();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, isDeleting, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isDeleting) {
                    onCancel();
                }
            }}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
                className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            >
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                        <AlertTriangle size={24} />
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        aria-label="Fechar confirmação"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <h2
                    id="confirm-delete-title"
                    className="text-xl font-semibold text-slate-900"
                >
                    {title}
                </h2>

                <p
                    id="confirm-delete-description"
                    className="mt-2 text-sm leading-6 text-slate-500"
                >
                    {description}
                </p>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-800">
                        {itemName}
                    </p>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                    Essa ação não poderá ser desfeita.
                </p>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isDeleting ? "Excluindo..." : "Excluir recorrência"}
                    </button>
                </div>
            </div>
        </div>
    );
}