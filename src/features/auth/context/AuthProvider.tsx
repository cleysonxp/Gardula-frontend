import { useState, type ReactNode } from "react"
import type { LoginResponse } from "@/features/auth/services/authService"
import { clearSession, getSession } from "@/features/auth/services/authStorage"
import { AuthContext } from "./AuthContext"
import { logout as logoutApi } from "@/features/auth/services/authService"

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<LoginResponse | null>(
        getSession
    )

    async function logout() {
        if (session?.refreshToken) {
            await logoutApi(session.refreshToken)
        }

        clearSession()
        setSession(null)
    }

    return (
        <AuthContext.Provider
            value={{
                session,
                isAuthenticated: session !== null,
                setSession,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}