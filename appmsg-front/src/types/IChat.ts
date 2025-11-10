import { IMensagem } from "./IMessage";
import { User } from "./ISession";

export interface UltimaMensagem {
  conteudo: string;
  dataEnvio: string;
  usuarioId: string;
}

export interface UsuariosChat {
  id: string;
  nome: string;
  email: string;
  dataCriacao: string;
  ultimaMensagem: UltimaMensagem | null;
}

export interface ChatAtual {
  chat: Chat;
  usuario: User;
  usuarioDestino: User;
  mensagens: IMensagem[];
}

export interface Chat {
  id: string;
  participantes: string[];
  tipo: "individual" | "grupo";
  dataCriacao: string;
}
