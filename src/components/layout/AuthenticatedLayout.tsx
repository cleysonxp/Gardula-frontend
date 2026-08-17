import {
    BarChart3,
    CreditCard,
    Goal,
    Home,
    LogOut,
    Repeat,
    Settings,
    ArrowLeftRight,
    ChevronRight,
} from "lucide-react"
import { Link, Outlet, useLocation } from "react-router"
import { useContext } from "react"

import { AuthContext } from "@/features/auth/context/AuthContext"

const menuItems = [
    {
        label: "Home",
        icon: Home,
        path: "/",
    },
    {
        label: "Contas",
        icon: CreditCard,
        path: "/accounts",
    },
    {
        label: "Transações",
        icon: ArrowLeftRight,
        path: "/transactions",
    },
    {
        label: "Recorrentes",
        icon: Repeat,
        path: "/recurring",
    },
    {
        label: "Objetivos",
        icon: Goal,
        path: "/goals",
    },
    {
        label: "Relatórios",
        icon: BarChart3,
        path: "/reports",
    },
]

export function AuthenticatedLayout() {
    const location = useLocation()
    const { logout } = useContext(AuthContext)

    async function handleLogout() {
        await logout()
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            {/* <aside className="relative flex w-64 shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#171653] via-[#1b1764] to-[#21156d] text-white"> */}
            <aside className="relative flex w-64 shrink-0 flex-col overflow-hidden bg-gradient-to-b from-sidebar via-sidebar to-sidebar-secondary text-white">
            {/* Logo */}
            <div className="relative z-10 flex h-20 items-center border-b border-white/10 px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 text-sm font-bold shadow-lg shadow-violet-900/30">
                        G
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        Gardula
                    </span>
                </div>
            </div>

            {/* Menu */}
            <div className="relative z-10 flex-1 px-4 py-7">
                <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                    Menu
                </p>

                <nav className="space-y-1.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={[
                                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-violet-500/80 text-white shadow-lg shadow-violet-950/20"
                                        : "text-white/70 hover:bg-white/10 hover:text-white",
                                ].join(" ")}
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Configurações */}
                <div className="my-7 border-t border-white/10 pt-7">
                    <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                        Configurações
                    </p>

                    <Link
                        to="/settings"
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
                    >
                        <Settings size={19} />
                        <span>Configurações</span>
                    </Link>
                </div>

                <div className="border-t border-white/10 pt-3"></div>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-300 transition-all hover:bg-red-500/10 hover:text-red-200"
                >
                    <LogOut size={19} />
                    <span>Sair</span>
                </button>
            </div>

            {/* Perfil */}
            <div className="relative z-10 border-t border-white/10 p-4">
                <div className="flex items-center gap-3 rounded-xl px-2 py-2">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/80">
                        <span className="text-sm font-semibold">
                            G
                        </span>
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                            Minha conta
                        </p>

                        <p className="text-xs text-white/50">
                            Ver perfil
                        </p>
                    </div>

                    <ChevronRight
                        size={20}
                        className="ml-auto text-white/40"
                    />

                </div>
            </div>

            {/* Decoração inferior */}
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-72 rounded-[50%] bg-violet-700/30 blur-sm" />
            <div className="pointer-events-none absolute -bottom-20 left-20 h-36 w-56 rounded-[50%] bg-violet-500/20 blur-sm" />
        </aside>

            {/* Conteúdo */ }
    <main className="relative min-w-0 flex-1 overflow-hidden">
        {/* Decoração superior */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-96 rounded-full bg-violet-100/70 blur-3xl" />

        <div className="relative min-h-screen">
            <Outlet />
        </div>
    </main>
        </div >
    )
}