"use client";

import FormLogin from "@/components/login/FormLogin";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import { TypographyP } from "@/components/typography/TypographyP";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Login = () => {
  return (
    <section className="w-full h-full flex flex-col justify-around">
      <div className="w-full h-full flex items-center justify-center ">
        <Card className="rounded-[50px] w-3xl h-4/6 bg-background p-0 pt-8">
          <div className="flex flex-col justify-center items-center py-8 mt-2">
            <TypographyH2 text="Acesse a sua conta" className="font-bold" />
            <TypographyP
              text="insira suas credenciais para fazer login"
              className="text-muted-foreground mt-3"
            />
          </div>
          <FormLogin />
          <Link
            className="flex bg-primary-foreground border h-full rounded-b-[50px] justify-center items-center hover:bg-primary/10"
            href={"/auth/cadastro"}
          >
            <TypographyP
              text="Criar uma nova conta"
              className="font-bold text-[18px] text-center"
            />
          </Link>
        </Card>
      </div>
    </section>
  );
};

export default Login;
