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
    WalletCards,
    PiggyBank,
} from "lucide-react"
import { Link, Outlet, useLocation } from "react-router"
import { useContext } from "react"

import { AuthContext } from "@/features/auth/context/AuthContext"

const menuSections = [
    {
        title: "Menu",
        items: [
            {
                label: "Home",
                icon: Home,
                path: "/",
            },
        ],
    },
    {
        title: "Financeiro",
        items: [
            {
                label: "Contas",
                icon: WalletCards,
                path: "/accounts",
            },
            {
                label: "Cartões",
                icon: CreditCard,
                path: "/cards",
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
        ],
    },
    {
        title: "Planejamento",
        items: [
            {
                label: "Objetivos",
                icon: Goal,
                path: "/goals",
            },
            {
                label: "Orçamento",
                icon: PiggyBank,
                path: "/budget",
            },
        ],
    },
    {
        title: "Patrimônio",
        items: [
            {
                label: "Investimentos",
                icon: BarChart3,
                path: "/investments",
            },
        ],
    },
    {
        title: "Análises",
        items: [
            {
                label: "Relatórios",
                icon: BarChart3,
                path: "/reports",
            },
        ],
    },
]

export function AuthenticatedLayout() {
    const location = useLocation()
    const { logout } = useContext(AuthContext)

    async function handleLogout() {
        await logout()
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">

            {/* Sidebar */}
            <aside
                className="
                    relative
                    flex
                    h-screen
                    w-64
                    shrink-0
                    flex-col
                    overflow-hidden
                    bg-gradient-to-b
                    from-sidebar
                    via-sidebar
                    to-sidebar-secondary
                    text-white
                "
            >

                {/* Logo */}
                <div
                    className="
                        relative
                        z-10
                        flex
                        h-16
                        shrink-0
                        items-center
                        border-b
                        border-white/10
                        px-5
                    "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-violet-500
                                text-sm
                                font-bold
                                shadow-lg
                                shadow-violet-900/30
                            "
                        >
                            G
                        </div>

                        <span className="text-lg font-bold tracking-tight">
                            Gardula
                        </span>
                    </div>
                </div>

                {/* Menu */}
                <div
                    className="
                        relative
                        z-10
                        flex-1
                        min-h-0
                        overflow-y-auto
                        px-3
                        py-4
                        scrollbar-thin
                    "
                >
                    {menuSections.map((section, sectionIndex) => (
                        <div
                            key={section.title}
                            className={
                                sectionIndex > 0
                                    ? "mt-4"
                                    : ""
                            }
                        >
                            <p
                                className="
                                    mb-2
                                    px-3
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-white/40
                                "
                            >
                                {section.title}
                            </p>

                            <nav className="space-y-0.5">
                                {section.items.map((item) => {
                                    const Icon = item.icon

                                    const isActive =
                                        location.pathname === item.path

                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={[
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-violet-500/80 text-white shadow-lg shadow-violet-950/20"
                                                    : "text-white/70 hover:bg-white/10 hover:text-white",
                                            ].join(" ")}
                                        >
                                            <Icon size={17} />

                                            <span>
                                                {item.label}
                                            </span>
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>
                    ))}

                    {/* Configurações */}
                    <div
                        className="
                            mt-4
                            border-t
                            border-white/10
                            pt-4
                        "
                    >
                        <p
                            className="
                                mb-2
                                px-3
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-white/40
                            "
                        >
                            Configurações
                        </p>

                        <Link
                            to="/settings"
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-white/70
                                transition-all
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            <Settings size={17} />

                            <span>
                                Configurações
                            </span>
                        </Link>
                    </div>

                    {/* Logout */}
                    <div
                        className="
                            mt-3
                            border-t
                            border-white/10
                            pt-2
                        "
                    >
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-red-300
                                transition-all
                                hover:bg-red-500/10
                                hover:text-red-200
                            "
                        >
                            <LogOut size={17} />

                            <span>
                                Sair
                            </span>
                        </button>
                    </div>
                </div>

                {/* Perfil */}
                <div
                    className="
                        relative
                        z-10
                        shrink-0
                        border-t
                        border-white/10
                        p-3
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-lg
                            px-2
                            py-1.5
                        "
                    >
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-violet-500/80
                            "
                        >
                            <span className="text-sm font-semibold">
                                G
                            </span>
                        </div>

                        <div className="min-w-0">
                            <p
                                className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-white
                                "
                            >
                                Minha conta
                            </p>

                            <p className="text-[11px] text-white/50">
                                Ver perfil
                            </p>
                        </div>

                        <ChevronRight
                            size={18}
                            className="ml-auto text-white/40"
                        />
                    </div>
                </div>

                {/* Decoração inferior */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-16
                        -left-12
                        h-40
                        w-72
                        rounded-[50%]
                        bg-violet-700/30
                        blur-sm
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-20
                        left-20
                        h-36
                        w-56
                        rounded-[50%]
                        bg-violet-500/20
                    "
                />

            </aside>

            {/* Conteúdo */}
            <main className="relative min-w-0 flex-1 overflow-x-hidden overflow-y-auto">

                {/* Decoração superior */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-72
                        w-96
                        rounded-full
                        bg-violet-100/70
                        blur-3xl
                    "
                />

                <div className="relative min-h-full">
                    <Outlet />
                </div>

            </main>

        </div>
    )
}