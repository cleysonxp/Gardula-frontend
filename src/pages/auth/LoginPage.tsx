import { AuthLayout } from "@/components/layout/AuthLayout"

export function LoginPage() {
    return (
        <AuthLayout>
            <div>
                <h1 className="text-2xl font-bold">Entrar</h1>
                <p className="mt-2 text-text-muted">
                    Acesse sua conta Finora.
                </p>
            </div>
        </AuthLayout>
    )
}