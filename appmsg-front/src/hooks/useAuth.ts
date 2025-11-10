import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validators/schemas/SchemaCadastro";
import { cadastrarUsuario } from "../service/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store/hooks";
import { LoginSchema } from "../validators/schemas/SchemaLogin";
import { login, logout } from "../store/slices/authSlice";
import { persistor } from "../store/store";

const useAuth = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const [showPass, setShowPass] = useState<{
    senha: boolean;
    confirmarSenha: boolean;
  }>({ confirmarSenha: false, senha: false });

  const methodsLogin = useForm<Omit<Credenciais, "confirmaSenha" | "nome">>({
    defaultValues: { email: "", lembrar: false, senha: "" },
    resolver: zodResolver(LoginSchema),
  });

  const methodsCadastro = useForm<Omit<Credenciais, "lembrar">>({
    defaultValues: { confirmaSenha: "", email: "", senha: "", nome: "" },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmitLogin(
    data: Omit<Credenciais, "confirmaSenha" | "nome">
  ) {
    try {
      await appDispatch(
        login({
          email: data.email,
          lembrar: data.lembrar,
          senha: data.senha,
          async onSuccess() {
            router.push("/");
          },
        })
      );
    } catch (err: any) {
      toast.error("Falha ao realizar login, motivo:" + err.message);
    }
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

  async function logoutUser() {
    try {
      await appDispatch(
        logout(() => {
          persistor.purge();
          router.push("/auth/login");
        })
      );
    } catch (err: any) {
      toast.error("Falha ao realizar login, motivo:" + err.message);
    }
  }

  return {
    logoutUser,
    methodsLogin,
    onSubmitLogin,
    showPass,
    setShowPass,
    methodsCadastro,
    onSubmitCadastro,
  };
};

export default useAuth;
