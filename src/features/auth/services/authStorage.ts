import type { LoginResponse } from "./authService"

const AUTH_STORAGE_KEY = "gardula_auth"

export function saveSession(session: LoginResponse) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(session)
  )
}

export function getSession(): LoginResponse | null {
  const storedSession = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!storedSession) {
    return null
  }

  try {
    return JSON.parse(storedSession) as LoginResponse
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}