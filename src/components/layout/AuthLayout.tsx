import type { ReactNode } from "react"
import { AuthVisual } from "@/features/auth/components/AuthVisual"

interface AuthLayoutProps {
    children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="min-h-screen bg-background">
            <div className="grid min-h-screen lg:grid-cols-2">
                <section className="hidden lg:block">
                    <AuthVisual />
                </section>

                <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-6">
                    {/* Glow superior */}
                    <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-violet-300/20 blur-3xl" />

                    {/* Glow inferior */}
                    <div className="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-violet-400/15 blur-3xl" />

                    {/* Glow central */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl" />

                    <div className="relative z-10 w-full max-w-md">
                        {children}
                    </div>
                </section>
            </div>
        </main>
    )
}