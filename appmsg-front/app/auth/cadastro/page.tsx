"use client";

import FormCadastro from "@/components/cadastro/FormCadastro";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import { TypographyP } from "@/components/typography/TypographyP";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Cadastro = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center p-4">
      <Card className="flex flex-col w-full max-w-3xl rounded-[50px] bg-background overflow-hidden shadow-xl p-0 pt-8">
        <div className="flex flex-col justify-center items-center px-8 pt-12 pb-6">
          <TypographyH2 text="Criar nova conta" className="font-bold" />
          <TypographyP
            text="Insira os dados para criar uma nova conta"
            className="text-muted-foreground mt-3 text-center"
          />
        </div>
        <div className="px-8 pb-8">
          <FormCadastro />
        </div>
        <Link
          className="flex bg-primary-foreground border-t h-20 justify-center items-center hover:bg-primary/10 transition-colors"
          href="/auth/login"
        >
          <TypographyP
            text="Acessar conta já existente"
            className="font-bold text-lg"
          />
        </Link>
      </Card>
    </section>
  );
};

export default Cadastro;
