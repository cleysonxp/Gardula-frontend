import { refresh } from "@/features/auth/services/authService"
import {
    clearSession,
    getSession,
    saveSession,
} from "@/features/auth/services/authStorage"

const API_URL = "https://localhost:7133/api"

export async function apiClient(
    path: string,
    options: RequestInit = {},
    isRetry = false
): Promise<Response> {
    const session = getSession()

    const headers = new Headers(options.headers)

    headers.set("Content-Type", "application/json")

    if (session?.accessToken) {
        headers.set(
            "Authorization",
            `Bearer ${session.accessToken}`
        )
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    })

    if (response.status !== 401 || isRetry) {
        return response
    }

    if (!session?.refreshToken) {
        clearSession()
        return response
    }

    try {
        const newSession = await refresh(session.refreshToken)

        saveSession(newSession)

        return apiClient(path, options, true)
    } catch {
        clearSession()

        return response
    }
}