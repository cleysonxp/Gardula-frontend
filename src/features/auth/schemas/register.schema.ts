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
      .max(100, "A senha deve ter no máximo 100 caracteres.")
      .regex(
        /[A-Z]/,
        "A senha deve conter pelo menos uma letra maiúscula.",
      )
      .regex(
        /[a-z]/,
        "A senha deve conter pelo menos uma letra minúscula.",
      )
      .regex(
        /[^A-Za-z0-9]/,
        "A senha deve conter pelo menos um caractere especial.",
      ),

    confirmPassword: z
      .string()
      .min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>