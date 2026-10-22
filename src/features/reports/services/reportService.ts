import { apiClient } from "@/lib/api/apiClient";

import type { ReportResponse } from "@/features/reports/types/report.types";

export async function getReport(
    startDate: string,
    endDate: string,
): Promise<ReportResponse> {
    const params = new URLSearchParams({
        StartDate: startDate,
        EndDate: endDate,
    });

    const response = await apiClient(`/Reports?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to load financial report.");
    }

    return response.json();
}