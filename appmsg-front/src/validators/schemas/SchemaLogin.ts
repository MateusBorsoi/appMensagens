// schemas/register.schema.ts
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório"),
  senha: z.string().min(1, "Senha é obrigatória!"),
  lembrar: z.boolean(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
