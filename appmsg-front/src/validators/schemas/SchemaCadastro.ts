// schemas/register.schema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

    email: z
      .email("Email inválido")
      .min(1, "Email é obrigatório")
      .toLowerCase(),

    senha: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(100, "Senha deve ter no máximo 100 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
      ),

    confirmaSenha: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.senha === data.confirmaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmaSenha"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
