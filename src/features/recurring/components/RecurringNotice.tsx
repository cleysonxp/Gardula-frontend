import { CheckCircle2, X } from "lucide-react";

type RecurringNoticeProps = {
    message: string;
    onClose: () => void;
};

export function RecurringNotice({
    message,
    onClose,
}: RecurringNoticeProps) {
    if (!message) {
        return null;
    }

    return (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-600" />

            <p className="min-w-0 flex-1 text-sm font-medium text-emerald-800">
                {message}
            </p>

            <button
                type="button"
                onClick={onClose}
                aria-label="Fechar notificação"
                className="shrink-0 rounded-lg p-1 text-emerald-600 transition hover:bg-emerald-100"
            >
                <X size={17} />
            </button>
        </div>
    );
}
