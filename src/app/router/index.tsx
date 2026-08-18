import { createBrowserRouter } from "react-router"
import { LoginPage } from "@/pages/auth/LoginPage"
import { RegisterPage } from "@/pages/auth/RegisterPage"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage"
import { HomePage } from "@/pages/HomePage"
import { AccountsPage } from "@/pages/AccountsPage"
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout"

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/accounts",
            element: <AccountsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
])