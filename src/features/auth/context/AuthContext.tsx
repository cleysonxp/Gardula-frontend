import { createContext } from "react"
import type { LoginResponse } from "@/features/auth/services/authService"

export interface AuthContextData {
  session: LoginResponse | null
  isAuthenticated: boolean
  setSession: (session: LoginResponse | null) => void
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({
  session: null,
  isAuthenticated: false,
  setSession: () => {},
  logout: async () => {},
})