export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: string
    refreshTokenExpiresAt: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface RegisterResponse {
    id: number
    name: string
    email: string
    createdAt: string
}

const API_URL = "https://localhost:7133/api"

export async function login(
    data: LoginRequest,
): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error("E-mail ou senha inválidos.")
    }

    return response.json()
}

export async function register(
    data: RegisterRequest,
): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error("Este e-mail já está cadastrado.")
        }

        if (response.status === 400) {
            throw new Error("Os dados informados são inválidos.")
        }

        throw new Error("Não foi possível criar sua conta.")
    }

    return response.json()
}

export async function logout(
    refreshToken: string,
): Promise<void> {
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
    refreshToken: string,
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