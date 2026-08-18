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
    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-950">
                    Suas contas
                </h2>
            </div>

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
        </section>
    )
}