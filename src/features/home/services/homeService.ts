import { apiClient } from "@/lib/api/apiClient"

import type { HomeOverviewResponse } from "@/features/home/types/home.types"

export async function getHomeOverview(
    year: number,
    month: number,
): Promise<HomeOverviewResponse> {
    const response = await apiClient(
        `/Home/overview?year=${year}&month=${month}`,
    )

    if (!response.ok) {
        throw new Error("Failed to load home overview.")
    }

    return response.json()
}