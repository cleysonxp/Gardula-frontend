import { z } from "zod"

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres.")
      .max(100, "O nome deve ter no máximo 100 caracteres."),

    email: z
      .string()
      .min(1, "O e-mail é obrigatório.")
      .email("Digite um e-mail válido."),

    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres."),

    confirmPassword: z
      .string()
      .min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>