import { Navigate, Outlet } from "react-router"
import { useContext } from "react"

import { AuthContext } from "@/features/auth/context/AuthContext"

export function ProtectedRoute() {
    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}