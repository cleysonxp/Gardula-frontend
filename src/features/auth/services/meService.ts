import { apiClient } from "@/lib/api/apiClient"

export async function getMe() {
    const response = await apiClient("/auth/me")

    if (!response.ok) {
        throw new Error("Não foi possível obter o usuário autenticado.")
    }

    return response.json()
}