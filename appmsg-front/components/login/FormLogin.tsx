import useAuth from "@/src/hooks/useAuth";
import { FormProvider } from "react-hook-form";
import TextField from "../hookForm/TextField";
import { Button } from "../ui/button";
import CheckBox from "../hookForm/CheckBox";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

const FormLogin = () => {
  const { methodsLogin, onSubmitLogin, setShowPass, showPass } = useAuth();
  const { handleSubmit } = methodsLogin;
  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <div className="flex flex-col justify-between h-full">
        <FormProvider {...methodsLogin}>
          <div className="flex flex-col pb-10 px-20  justify-between">
            <TextField
              name="email"
              label="E-mail"
              leftIcon={<Mail size={20} />}
            />
            <TextField
              name="senha"
              label="Senha"
              className="mt-4"
              type={showPass.senha ? "text" : "password"}
              leftIcon={<Lock size={20} />}
              rightIcon={
                !showPass.senha ? (
                  <Eye
                    className="hover:cursor-pointer"
                    size={20}
                    onClick={() => {
                      setShowPass((prev) => ({
                        confirmarSenha: prev.confirmarSenha,
                        senha: !prev.senha,
                      }));
                    }}
                  />
                ) : (
                  <EyeOff
                    className="hover:cursor-pointer"
                    size={20}
                    onClick={() => {
                      setShowPass((prev) => ({
                        confirmarSenha: prev.confirmarSenha,
                        senha: !prev.senha,
                      }));
                    }}
                  />
                )
              }
            />
            <div className="mt-4 w-full flex flex-col">
              <CheckBox
                name="lembrar"
                label="Continuar conectado"
                className="hover:cursor-pointer"
              />
              <Button
                type="submit"
                variant={"ghost"}
                className="border border-ring rounded-2xl py-5 mt-8 hover:cursor-pointer mx-2"
              >
                Acessar
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </form>
  );
};

export default FormLogin;
