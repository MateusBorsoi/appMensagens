import { Document } from "mongoose";

export interface IMensagem {
  usuarioId: string;
  usuarioNome: string;
  chat: string;
  conteudo: string;
  dataEnvio: Date;
}

export interface IMensagemDocument extends IMensagem, Document {
  _id: string;
}

export interface UsuarioConectado {
  id: string;
  nome: string;
  chat: string;
  socketId: string;
}
