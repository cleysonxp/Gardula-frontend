import { useContext } from "react"

import { AuthContext } from "@/features/auth/context/AuthContext"

export function HomePage() {
    const { logout } = useContext(AuthContext)

    async function handleLogout() {
        await logout()
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
            <h1 className="text-3xl font-bold text-slate-900">
                Bem-vindo ao Gardula
            </h1>

            <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
            >
                Sair
            </button>
        </main>
    )
}