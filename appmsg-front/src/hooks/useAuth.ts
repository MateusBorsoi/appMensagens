import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validators/schemas/SchemaCadastro";
import { cadastrarUsuario } from "../service/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useAuth = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState<{
    senha: boolean;
    confirmarSenha: boolean;
  }>({ confirmarSenha: false, senha: false });

  const methodsLogin = useForm<Omit<Credenciais, "confirmaSenha" | "nome">>({
    defaultValues: { email: "", lembrar: false, senha: "" },
  });

  const methodsCadastro = useForm<Omit<Credenciais, "lembrar">>({
    defaultValues: { confirmaSenha: "", email: "", senha: "", nome: "" },
    resolver: zodResolver(registerSchema),
  });

  function onSubmitLogin(data: Omit<Credenciais, "confirmaSenha" | "nome">) {
    console.log(data);
  }

  async function onSubmitCadastro(data: Omit<Credenciais, "lembrar">) {
    try {
      await cadastrarUsuario(data, () => {
        router.push("/auth/login");
      });
    } catch (e) {
      toast.error(`Falha ao cadastrar usuário`);
    }
  }

  return {
    methodsLogin,
    onSubmitLogin,
    showPass,
    setShowPass,
    methodsCadastro,
    onSubmitCadastro,
  };
};

export default useAuth;
