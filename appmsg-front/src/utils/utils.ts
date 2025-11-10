import { redirect, RedirectType } from "next/navigation";
import { toast } from "react-toastify";
import { deleteCookie } from "../server/actions";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export const sessionExpired = async () => {
  toast.warn("Sua sessão expirou!");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  await deleteCookie("access_token");

  redirect("/auth/login", RedirectType.replace);
};

export function formatarDataMensagem(isoDate: string): string {
  const date = parseISO(isoDate);

  if (isToday(date)) {
    return `Hoje, ${format(date, "HH:mm", { locale: ptBR })}`;
  }

  if (isYesterday(date)) {
    return `Ontem, ${format(date, "HH:mm", { locale: ptBR })}`;
  }

  return format(date, "dd/MM/yyyy, HH:mm", { locale: ptBR });
}
