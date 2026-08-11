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

                <section className="flex items-center justify-center p-6">
                    {children}
                </section>
            </div>
        </main>
    )
}