import { apiClient } from "@/lib/api/apiClient"

export type CategoryResponse = {
    id: number
    name: string
    type: number
    parentCategoryId: number | null
    userId: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export async function getCategories(): Promise<CategoryResponse[]> {
    const response = await apiClient("/Categories")

    if (!response.ok) {
        throw new Error("Failed to load categories.")
    }

    return response.json()
}