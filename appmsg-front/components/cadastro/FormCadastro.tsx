import useAuth from "@/src/hooks/useAuth";
import { FormProvider } from "react-hook-form";
import TextField from "../hookForm/TextField";
import { Button } from "../ui/button";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const FormCadastro = () => {
  const { methodsCadastro, onSubmitCadastro, setShowPass, showPass } =
    useAuth();
  const { handleSubmit } = methodsCadastro;
  return (
    <form onSubmit={handleSubmit(onSubmitCadastro)}>
      <div className="flex flex-col justify-between h-auto">
        <FormProvider {...methodsCadastro}>
          <div className="flex flex-col pb-10 px-20  justify-between">
            <TextField name="nome" label="Nome" leftIcon={<User size={20} />} />
            <TextField
              name="email"
              label="E-mail"
              leftIcon={<Mail size={20} />}
              className="mt-4"
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
            <TextField
              name="confirmaSenha"
              label="Confirmar senha"
              className="mt-4"
              type={showPass.confirmarSenha ? "text" : "password"}
              leftIcon={<Lock size={20} />}
              rightIcon={
                !showPass.confirmarSenha ? (
                  <Eye
                    className="hover:cursor-pointer"
                    size={20}
                    onClick={() => {
                      setShowPass((prev) => ({
                        confirmarSenha: !prev.confirmarSenha,
                        senha: prev.senha,
                      }));
                    }}
                  />
                ) : (
                  <EyeOff
                    className="hover:cursor-pointer"
                    size={20}
                    onClick={() => {
                      setShowPass((prev) => ({
                        confirmarSenha: !prev.confirmarSenha,
                        senha: prev.senha,
                      }));
                    }}
                  />
                )
              }
            />
            <div className="mt-4 w-full flex flex-col">
              <Button
                type="submit"
                variant={"ghost"}
                className="border border-ring rounded-2xl py-5 mt-8 hover:cursor-pointer mx-2"
              >
                Enviar
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </form>
  );
};

export default FormCadastro;
