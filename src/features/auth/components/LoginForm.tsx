import { useState } from "react"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-violet-600 to-violet-800 p-8 text-white shadow-2xl shadow-violet-900/20 sm:p-10">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold text-white ring-1 ring-white/20">
          F
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Bem-vindo de volta
        </h1>

        <p className="mx-auto mt-3 text-base leading-7 text-white/70">
          Entre na sua conta para continuar
          <br />
          seu planejamento financeiro.
        </p>
      </div>

      <form className="space-y-5">
        {/* Email */}
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
              className="h-12 rounded-xl border-white/15 bg-violet-900/40 pl-11 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/20"
            />
          </div>
        </div>

        {/* Senha */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-white/90"
            >
              Senha
            </Label>

            <a
              href="/forgot-password"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Esqueceu a senha?
            </a>
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              className="h-12 rounded-xl border-white/15 bg-violet-900/40 pl-11 pr-11 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label={
                showPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Botão */}
        <Button
          type="submit"
          size="lg"
          className="mt-2 h-12 w-full rounded-xl bg-white font-semibold text-violet-700 shadow-lg shadow-black/10 transition-all hover:bg-violet-50 hover:shadow-xl"
        >
          Entrar
        </Button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/15" />

        <span className="text-xs font-medium uppercase tracking-wider text-white/50">
          ou
        </span>

        <div className="h-px flex-1 bg-white/15" />
      </div>

      {/* Cadastro */}
      <div className="text-center">
        <p className="text-sm text-white/60">
          Ainda não possui uma conta?
        </p>

        <a
          href="/register"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-white/80"
        >
          Criar conta
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}