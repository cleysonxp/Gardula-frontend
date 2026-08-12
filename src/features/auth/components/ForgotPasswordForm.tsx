import { useState } from "react"
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/features/auth/schemas/forgot-password.schema"

async function fakeForgotPassword(data: ForgotPasswordFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log("Recuperação de senha:", data)
}

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  })

  async function handleForgotPassword(data: ForgotPasswordFormData) {
    setRequestError(null)

    try {
      await fakeForgotPassword(data)
      setIsSuccess(true)
    } catch {
      setRequestError(
        "Não foi possível enviar as instruções. Tente novamente.",
      )
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-violet-600 to-violet-800 p-8 text-white shadow-2xl shadow-violet-900/20 sm:p-10">
        <div className="mb-8 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <CheckCircle2 size={28} />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Verifique seu e-mail
          </h1>

          <p className="mx-auto mt-4 text-base leading-7 text-white/70">
            Se existir uma conta associada a esse endereço,
            <br />
            você receberá as instruções para redefinir sua senha.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/80"
          >
            <ArrowLeft size={16} />
            Voltar para o login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-violet-600 to-violet-800 p-8 text-white shadow-2xl shadow-violet-900/20 sm:p-10">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold text-white ring-1 ring-white/20">
          G
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Recupere sua senha
        </h1>

        <p className="mx-auto mt-3 text-base leading-7 text-white/70">
          Digite seu e-mail e enviaremos
          <br />
          as instruções para redefinir sua senha.
        </p>
      </div>

      {requestError && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"
        >
          {requestError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-white/90"
          >
            E-mail
          </Label>

          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />

            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="h-12 rounded-xl border-white/15 bg-violet-900/40 pl-11 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/20"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-200">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="mt-2 h-12 w-full rounded-xl bg-white font-semibold text-violet-700 shadow-lg shadow-black/10 transition-all hover:bg-violet-50 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Enviando..." : "Enviar instruções"}
        </Button>
      </form>

      <div className="mt-7 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/80"
        >
          <ArrowLeft size={16} />
          Voltar para o login
        </Link>
      </div>
    </div>
  )
}