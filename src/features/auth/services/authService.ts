export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
}

const API_URL = "https://localhost:7133/api";

export async function login(
    data: LoginRequest
): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("E-mail ou senha inválidos.");
    }

    return response.json();
}

export async function logout(refreshToken: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refreshToken,
        }),
    })

    if (!response.ok) {
        throw new Error("Não foi possível realizar o logout.")
    }
}

export async function refresh(
    refreshToken: string
): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refreshToken,
        }),
    })

    if (!response.ok) {
        throw new Error("Não foi possível renovar a sessão.")
    }

    return response.json()
}