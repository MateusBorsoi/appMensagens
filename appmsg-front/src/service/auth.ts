import { toast } from "react-toastify";
import { getOptions } from "../axios/util";
import axios, { AxiosError } from "axios";

const cadastrarUsuario = async (
  usuario: Omit<Credenciais, "confirmaSenha" | "lembrar">,
  onSuccess?: () => void
) => {
  const options = getOptions({
    url: "/usuarios",
    method: "POST",
    data: usuario,
  });

  try {
    const response = await axios.request(options);
    if (response.status === 200 || response.status === 201) {
      toast.success("Usuário cadastrado com sucesso");
      onSuccess && onSuccess();
    }
  } catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err)) {
      toast.error(`Falha ao cadastrar, motivo: ${err.response?.data.erro}`);
      return;
    }
    toast.error(`Falha ao cadastrar usuário`);
  }
};

export { cadastrarUsuario };
